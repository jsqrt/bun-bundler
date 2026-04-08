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
import { loadImageCache, saveImageCache, hashFile } from './image-cache';

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
	readonly concurrency?: number;
	readonly keepOriginals?: boolean;
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

	private processWithWorkers = (files: string[], spinner: any) =>
		Effect.gen(
			function* (_: any) {
				const useCache = this.config.useCache;
				const cacheDir = this.config.cacheDir;

				const cache = useCache ? yield* _(loadImageCache(cacheDir)) : { version: '', files: {} };
				const nextCache = { version: cache.version, files: { ...cache.files } };

				const outputFormat = this.config.outputFormat;
				const formatOptions = this.config.optimization?.[outputFormat] || {};

				const workerUrl = new URL('./image-worker.ts', import.meta.url).href;
				const poolSize = this.config.concurrency || Math.max(2, Math.floor(os.cpus().length / 2));
				const pool = new WorkerPool<ImageWorkerTask, ImageWorkerResult>(workerUrl, poolSize);

				let processed = 0;
				let skipped = 0;
				const total = files.length;
				const tasks: Promise<void>[] = [];
				const filesToRemove: string[] = [];

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

					if (useCache) {
						const fileHash = yield* _(hashFile(filePath));
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

					const task = pool
						.run({
							src: filePath,
							dist,
							outputFormat,
							formatOptions,
							resize: this.config.resize,
							scale: this.config.scale,
							reduceColors: this.config.reduceColors,
						})
						.then(() => {
							if (!this.config.keepOriginals && filePath !== dist) {
								filesToRemove.push(filePath);
							}
							processed++;
							spinner.text = `Optimizing images ${processed}/${total}`;
						})
						.catch((err) => {
							processed++;
							spinner.text = `Optimizing images ${processed}/${total}`;
							Effect.runSync(
								this.reporter.warn(`Skipping problematic image: ${path.basename(filePath)} - ${err.message}`),
							);
						});

					tasks.push(task);
				}

				yield* _(
					Effect.tryPromise({
						try: () => Promise.all(tasks),
						catch: (error) => new ImageProcessorError('Worker pool processing failed', error),
					}),
				);

				yield* _(
					Effect.tryPromise({
						try: () => pool.drain(),
						catch: (error) => new ImageProcessorError('Worker pool drain failed', error),
					}),
				);

				pool.terminate();

				for (const file of filesToRemove) {
					yield* _(Effect.tryPromise({
						try: () => this.unlinkWithRetry(file),
						catch: () => new ImageProcessorError(`Failed to remove original: ${file}`),
					}));
				}

				if (useCache) {
					yield* _(saveImageCache(cacheDir, nextCache));
				}

				yield* _(this.reporter.debugLog(`Processed: ${processed - skipped}, Skipped (cached): ${skipped}`));
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
					useCache: config.useCache ?? true,
					concurrency: config.concurrency ?? 0,
					keepOriginals: config.keepOriginals ?? false,
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
