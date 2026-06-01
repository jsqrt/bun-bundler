import os from 'os';

export interface WorkerTask {
	[key: string]: any;
}

export interface WorkerResult {
	ok: boolean;
	error?: string;
	[key: string]: any;
}

export class WorkerPool<T extends WorkerTask = WorkerTask, R extends WorkerResult = WorkerResult> {
	private queue: { task: T; resolve: (result: R) => void; reject: (error: Error) => void }[] = [];
	private idle: Worker[] = [];
	private workers: Worker[] = [];
	private active = 0;
	private drainResolvers: (() => void)[] = [];
	private readyPromise: Promise<void>;

	constructor(
		workerUrl: string | URL,
		size = Math.max(2, Math.floor(os.cpus().length / 2)),
		readyTimeoutMs = 30_000,
	) {
		const readyPromises: Promise<void>[] = [];

		for (let i = 0; i < size; i++) {
			const w = new Worker(workerUrl, { type: 'module' });
			this.workers.push(w);

			readyPromises.push(
				new Promise<void>((resolve, reject) => {
					// Guard against a worker that never signals readiness (failed import,
					// crash on load, or a saturated machine) — without this the whole
					// pool, and the build, hangs forever waiting on ready().
					const timer = setTimeout(() => {
						cleanup();
						reject(new Error(`Worker failed to become ready within ${readyTimeoutMs}ms`));
					}, readyTimeoutMs);

					const onReady = (event: MessageEvent) => {
						if (event.data?.type === 'ready') {
							cleanup();
							this.idle.push(w);
							this.next();
							resolve();
						}
					};
					const onError = (event: ErrorEvent) => {
						cleanup();
						reject(new Error(event.message || 'Worker failed during initialization'));
					};
					const cleanup = () => {
						clearTimeout(timer);
						w.removeEventListener('message', onReady);
						w.removeEventListener('error', onError);
					};

					w.addEventListener('message', onReady);
					w.addEventListener('error', onError);
				}),
			);
		}

		// allSettled (not all) so that *every* worker's rejection is consumed —
		// with Promise.all only the first rejection is handled and the rest
		// surface as unhandled promise rejections that crash the process.
		// If any worker fails to initialize, tear the whole pool down so its
		// workers don't linger as orphaned processes holding file handles.
		this.readyPromise = Promise.allSettled(readyPromises).then((results) => {
			const failure = results.find((r): r is PromiseRejectedResult => r.status === 'rejected');
			if (failure) {
				this.terminate();
				throw failure.reason;
			}
		});
	}

	ready(): Promise<void> {
		return this.readyPromise;
	}

	run(task: T): Promise<R> {
		return new Promise((resolve, reject) => {
			this.queue.push({ task, resolve, reject });
			this.next();
		});
	}

	drain(): Promise<void> {
		if (this.queue.length === 0 && this.active === 0) return Promise.resolve();
		return new Promise((resolve) => this.drainResolvers.push(resolve));
	}

	terminate() {
		for (const w of this.workers) w.terminate();
		this.workers = [];
		this.idle = [];
		this.active = 0;

		// Reject any queued tasks so their promises don't hang forever
		const pending = this.queue.splice(0);
		for (const { reject } of pending) {
			reject(new Error('Worker pool terminated'));
		}

		this.drainResolvers.splice(0).forEach((r) => r());
	}

	get pending() {
		return this.queue.length + this.active;
	}

	get size() {
		return this.workers.length;
	}

	get activeCount() {
		return this.active;
	}

	get idleCount() {
		return this.idle.length;
	}

	private next() {
		if (!this.queue.length || !this.idle.length) {
			if (this.queue.length === 0 && this.active === 0) {
				this.drainResolvers.splice(0).forEach((r) => r());
			}
			return;
		}

		const worker = this.idle.pop()!;
		const { task, resolve, reject } = this.queue.shift()!;
		this.active++;

		worker.onmessage = (event: MessageEvent<R>) => {
			this.active--;
			this.idle.push(worker);

			if (event.data.ok === false) {
				reject(new Error(event.data.error || 'Worker task failed'));
			} else {
				resolve(event.data);
			}

			this.next();
		};

		worker.onerror = (event) => {
			this.active--;
			this.idle.push(worker);
			reject(new Error(event.message || 'Worker error'));
			this.next();
		};

		worker.postMessage(task);
	}
}
