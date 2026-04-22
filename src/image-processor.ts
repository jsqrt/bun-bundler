import { Effect, Context, Layer } from 'effect';
import path from 'path';
import fs from 'fs';
import os from 'os';
import type { Reporter } from './reporter';
import { ReporterService } from './reporter';
import { getDirFiles } from './utils';
import { HIDDEN_FILE_PREFIX } from './constants';
import { WorkerPool } from './worker-pool';
import type { ImageWorkerTask, ImageWorkerResult } from './image-worker';
import { loadImageCache, saveImageCache, hashFile, hashConfig } from './image-cache';
import { onCleanup } from './cleanup';

const WORKER_THRESHOLD = 4;

export interface ImageProcessorConfig {
	readonly entry: string;
	readonly debug?: boolean;
	readonly reduceColors?: boolean;
	readonly resize?: { x: number; y: number } | null;
	readonly scale?: number;
	readonly fileTypes?: string[];
	readonly fileTemplate?: string;
	readonly outputFormat?: 'webp' | 'png' | 'jpeg' | 'avif';
	readonly optimization?: {
		jpeg?: any;
		png?: any;
		webp?: any;
		avif?: any;
	};
	readonly cacheDir?: string;
	readonly useCache?: boolean;
	readonly cache?: boolean;
	readonly concurrency?: number;
	readonly keepOriginals?: boolean;
	readonly performance?: boolean;
}

export class ImageProcessorError {
	readonly _tag = 'ImageProcessorError';
	constructor(readonly message: string, readonly originalError?: unknown) {}
}

export interface ImageProcessor {
	readonly process: (config: ImageProcessorConfig) => Effect.Effect<void, ImageProcessorError>;
}

export class ImageProcessorService extends Context.Tag('ImageProcessorService')<
	ImageProcessorService,
	ImageProcessor
>() {}

class ImageProcessorImpl {
	private config!: Required<ImageProcessorConfig>;
	private activePool: WorkerPool<ImageWorkerTask, ImageWorkerResult> | null = null;
	private unregisterCleanup: (() => void) | null = null;

	constructor(private reporter: Reporter) {}

	private async unlinkWithRetry(filePath: string, retries = 5, delay = 200): Promise<void> {
		for (let i = 0; i < retries; i++) {
			try {
				fs.unlinkSync(filePath);
				return;
			} catch {
				if (i === retries - 1) throw new Error(`Failed to unlink ${filePath}`);
				await new Promise((r) => setTimeout(r, delay));
			}
		}
	}

	private validateFile(filePath: string): { valid: boolean; reason?: string } {
		if (!fs.existsSync(filePath)) return { valid: false, reason: 'not found' };

		try {
			const stats = fs.statSync(filePath);
			if (stats.size === 0) return { valid: false, reason: 'empty file' };

			const extname = path.extname(filePath).toLowerCase();
			if (extname === '.svg') {
				const content = fs.readFileSync(filePath, 'utf-8').trim();
				if (!content || !content.includes('<svg')) return { valid: false, reason: 'invalid SVG' };
			}
		} catch {
			return { valid: false, reason: 'inaccessible' };
		}

		return { valid: true };
	}

	private buildDistPath(filePath: string): string {
		const outputFormat = this.config.outputFormat;
		const pos = filePath.lastIndexOf('.');
		const fileName = path.basename(filePath.substr(0, pos < 0 ? filePath.length : pos));
		const dirName = path.dirname(filePath);
		const fileTemplate = this.config.fileTemplate || `\${name}.${outputFormat}`;
		return path.join(dirName, fileTemplate.replace('${name}', fileName));
	}

	private processInline = async (task: ImageWorkerTask): Promise<void> => {
		const sharp = (await import('sharp')).default;
		const fsPromises = (await import('fs/promises')).default;

		await fsPromises.mkdir(path.dirname(task.dist), { recursive: true });

		const extname = path.extname(task.src).toLowerCase();
		const sharpOptions: any = extname === '.svg' && task.scale ? { density: task.scale * 72 } : {};

		let img = sharp(task.src, sharpOptions);

		if (task.resize) {
			img = img.resize(task.resize.x, task.resize.y);
		}

		if (task.reduceColors) {
			img = (img as any).colorspace('rgb16').toColorspace('srgb');
		}

		img = img.rotate();
		await (img as any).toFormat(task.outputFormat, task.formatOptions || {}).toFile(task.dist);
	};

	private processWithWorkers = (files: string[], spinner: any) =>
		Effect.gen(
			function* (_: any) {
				const useCache = this.config.cache;
				const cacheDir = this.config.cacheDir;

				// Hash includes optimization settings — changing format/quality/resize invalidates cache
				const configFingerprint = useCache ? hashConfig({
					outputFormat: this.config.outputFormat,
					optimization: this.config.optimization,
					resize: this.config.resize,
					scale: this.config.scale,
					reduceColors: this.config.reduceColors,
					fileTemplate: this.config.fileTemplate,
				}) : '';

				const cache = useCache ? yield* _(loadImageCache(cacheDir, configFingerprint)) : { version: '', configHash: '', files: {} };
				const nextCache = { version: cache.version, configHash: configFingerprint, files: { ...cache.files } };

				const outputFormat = this.config.outputFormat;
				const formatOptions = this.config.optimization?.[outputFormat] || {};

				let processed = 0;
				let skipped = 0;
				const total = files.length;
				const filesToRemove: string[] = [];

				interface PendingTask {
					filePath: string;
					dist: string;
					task: ImageWorkerTask;
				}
				const pendingTasks: PendingTask[] = [];

				// Step 1: validate and filter (fast, sync)
				const validFiles: string[] = [];
				for (const filePath of files) {
					const validation = this.validateFile(filePath);
					if (!validation.valid) {
						Effect.runSync(this.reporter.warn(`Skipping ${validation.reason}: ${path.basename(filePath)}`));
						processed++;
						spinner.text = `Optimizing images ${processed}/${total}`;
						continue;
					}

					const extname = path.extname(filePath).toLowerCase();
					if (extname === `.${outputFormat}`) {
						processed++;
						skipped++;
						spinner.text = `Optimizing images ${processed}/${total}`;
						continue;
					}

					validFiles.push(filePath);
				}

				// Step 2: pre-create worker pool so workers start loading sharp
				// while we hash files — overlaps worker init with hashing
				const cpuCount = os.cpus().length;
				const workerUrl = new URL('./image-worker.ts', import.meta.url).href;
				const maxPoolSize = this.config.concurrency
					|| (this.config.performance ? Math.max(2, cpuCount - 2) : Math.max(2, Math.floor(cpuCount / 2)));
				const poolSize = Math.min(maxPoolSize, validFiles.length);
				const useWorkers = validFiles.length >= WORKER_THRESHOLD;
				const pool = useWorkers
					? new WorkerPool<ImageWorkerTask, ImageWorkerResult>(workerUrl, poolSize)
					: null;

				if (pool) {
					this.activePool = pool;
					this.unregisterCleanup = onCleanup(() => {
						pool.terminate();
						this.activePool = null;
					});
				}

				yield* _(this.reporter.debugLog(
					`[ImageProcessor] CPU cores: ${cpuCount} | Workers: ${poolSize} | Mode: ${useWorkers ? 'worker pool' : 'inline'}`,
				));

				// Step 3: parallel hashing (runs while workers warm up)
				let hashMap = new Map<string, string>();
				if (useCache && validFiles.length > 0) {
					const hashEffects = validFiles.map((filePath) =>
						Effect.map(hashFile(filePath), (hash): [string, string] => [filePath, hash]),
					);
					const results = yield* _(Effect.all(hashEffects, { concurrency: 16 }));
					hashMap = new Map(results);
				}

				// Step 4: build pending tasks using pre-computed hashes
				for (const filePath of validFiles) {
					if (useCache) {
						const fileHash = hashMap.get(filePath) || '';
						const rel = path.relative(this.config.entry, filePath);
						const prevHash = cache.files[rel];
						nextCache.files[rel] = fileHash;

						const dist = this.buildDistPath(filePath);
						if (prevHash === fileHash && fs.existsSync(dist)) {
							if (!this.config.keepOriginals && filePath !== dist) {
								filesToRemove.push(filePath);
							}
							processed++;
							skipped++;
							spinner.text = `Optimizing images ${processed}/${total}`;
							continue;
						}
					}

					const dist = this.buildDistPath(filePath);
					pendingTasks.push({
						filePath,
						dist,
						task: {
							src: filePath,
							dist,
							outputFormat,
							formatOptions,
							resize: this.config.resize,
							scale: this.config.scale,
							reduceColors: this.config.reduceColors,
						},
					});
				}

				// Step 5: wait for workers to be ready, then dispatch
				if (pool && pendingTasks.length >= WORKER_THRESHOLD) {
					yield* _(
						Effect.ensuring(
							Effect.gen(function* (_: any) {
								yield* _(
									Effect.tryPromise({
										try: () => pool.ready(),
										catch: (error) => new ImageProcessorError('Worker pool initialization failed', error),
									}),
								);

								yield* _(this.reporter.debugLog(
									`[ImageProcessor] Pool ready — ${pool.size} workers initialized | Tasks to process: ${pendingTasks.length}`,
								));

								const promises = pendingTasks.map(({ filePath, dist, task }) =>
									pool.run(task)
										.then(() => {
											if (!this.config.keepOriginals && filePath !== dist) {
												filesToRemove.push(filePath);
											}
											processed++;
											spinner.text = `Optimizing images ${processed}/${total} (active workers: ${pool.activeCount}, idle: ${pool.idleCount})`;
										})
										.catch((err) => {
											processed++;
											spinner.text = `Optimizing images ${processed}/${total}`;
											Effect.runSync(
												this.reporter.warn(`Skipping problematic image: ${path.basename(filePath)} - ${err.message}`),
											);
										}),
								);

								yield* _(
									Effect.tryPromise({
										try: () => Promise.all(promises),
										catch: (error) => new ImageProcessorError('Worker pool processing failed', error),
									}),
								);
							}.bind(this)),
							Effect.sync(() => {
								pool.terminate();
								this.unregisterCleanup?.();
								this.unregisterCleanup = null;
								this.activePool = null;
							}),
						),
					);
				} else {
					pool?.terminate();
					this.unregisterCleanup?.();
					this.unregisterCleanup = null;
					this.activePool = null;
					for (const { filePath, dist, task } of pendingTasks) {
						yield* _(
							Effect.tryPromise({
								try: async () => {
									await this.processInline(task);
									if (!this.config.keepOriginals && filePath !== dist) {
										filesToRemove.push(filePath);
									}
									processed++;
									spinner.text = `Optimizing images ${processed}/${total}`;
								},
								catch: () => new ImageProcessorError(`Failed to process ${filePath}`),
							}).pipe(
								Effect.catchAll((err) =>
									Effect.sync(() => {
										processed++;
										spinner.text = `Optimizing images ${processed}/${total}`;
										Effect.runSync(
											this.reporter.warn(`Skipping problematic image: ${path.basename(filePath)} - ${err.message}`),
										);
									}),
								),
							),
						);
					}
				}

				for (const file of filesToRemove) {
					yield* _(Effect.tryPromise({
						try: () => this.unlinkWithRetry(file),
						catch: () => new ImageProcessorError(`Failed to remove original: ${file}`),
					}).pipe(
						Effect.catchAll((err) =>
							this.reporter.warn(`Could not remove original: ${path.basename(file)} - ${err.message}`),
						),
					));
				}

				if (useCache) {
					yield* _(saveImageCache(cacheDir, nextCache));
				}

				yield* _(this.reporter.debugLog(
					`[ImageProcessor] Done — Processed: ${processed - skipped}, Skipped (cached): ${skipped}, Total: ${total}`,
				));
			}.bind(this),
		);

	private collectFiles = (entry: string) =>
		Effect.gen(
			function* (_: any) {
				const files = yield* _(getDirFiles(entry, true));

				const filteredFiles = files.filter((filePath: string) => {
					const fileName = path.basename(filePath);
					return !fileName.startsWith(HIDDEN_FILE_PREFIX) && this.config.fileTypes.includes(path.extname(filePath));
				});

				return filteredFiles;
			}.bind(this),
		);

	process = (config: ImageProcessorConfig): Effect.Effect<void, ImageProcessorError> =>
		Effect.gen(
			function* (_: any) {
				const self = this;

				if (!config.entry) {
					return yield* _(Effect.fail(new ImageProcessorError('Image source entry is not defined')));
				}

				self.config = {
					entry: config.entry,
					debug: config.debug ?? false,
					reduceColors: config.reduceColors ?? false,
					resize: config.resize ?? null,
					scale: config.scale ?? 1,
					fileTypes: config.fileTypes ?? ['.png', '.jpg', '.jpeg'],
					fileTemplate: config.fileTemplate ?? `\${name}.${config.outputFormat ?? 'webp'}`,
					outputFormat: config.outputFormat ?? 'webp',
					optimization: config.optimization ?? {
						jpeg: { quality: 95 },
						png: { quality: 95, compressionLevel: 9 },
						webp: { lossless: true, nearLossless: true, quality: 95, effort: 5 },
						avif: { quality: 80 },
					},
					cacheDir: config.cacheDir ?? './.cache',
					useCache: config.cache ?? config.useCache ?? true,
					cache: config.cache ?? config.useCache ?? true,
					concurrency: config.concurrency ?? 0,
					keepOriginals: config.keepOriginals ?? false,
					performance: config.performance ?? false,
				};

				const spinner = self.reporter.spinner('Optimizing images...');
				spinner.start();

				const filesToProcess = yield* _(
					Effect.catchAll(self.collectFiles(self.config.entry), (error) =>
						Effect.gen(function* (_: any) {
							spinner.fail('Failed to collect image files');
							yield* _(
								self.reporter.errLog(
									"ImageProcessor: Seems like entry path doesn't exist. Check images entry directory.",
								),
							);
							return yield* _(Effect.fail(new ImageProcessorError('Failed to collect files', error)));
						}),
					),
				);

				spinner.text = `Optimizing images 0/${filesToProcess.length}`;

				yield* _(
					Effect.catchAll(self.processWithWorkers(filesToProcess, spinner), (error) => {
						spinner.fail('Image optimization failed');
						return Effect.fail(
							error instanceof ImageProcessorError
								? error
								: new ImageProcessorError('Image processing failed', error),
						);
					}),
				);
				spinner.succeed('Images optimized');
			}.bind(this),
		) as Effect.Effect<void, ImageProcessorError>;
}
export const makeImageProcessor = (reporter: Reporter): ImageProcessor => {
	const impl = new ImageProcessorImpl(reporter);
	return {
		process: impl.process,
	};
};

export const ImageProcessorLive = Layer.effect(
	ImageProcessorService,
	Effect.map(ReporterService, makeImageProcessor),
);
