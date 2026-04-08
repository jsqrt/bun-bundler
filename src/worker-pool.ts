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

	constructor(
		workerUrl: string | URL,
		size = Math.max(2, Math.floor(os.cpus().length / 2)),
	) {
		for (let i = 0; i < size; i++) {
			const w = new Worker(workerUrl, { type: 'module' });
			this.workers.push(w);
			this.idle.push(w);
		}
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
	}

	get pending() {
		return this.queue.length + this.active;
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
