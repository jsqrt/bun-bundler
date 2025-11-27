import { Effect, Context, Layer } from 'effect';
import path from 'path';
import fs from 'fs';
import type { Reporter } from './reporter';
import { ReporterService } from './reporter';
import { getDirFiles } from './utils';
import sharp from 'sharp';

export interface ImageProcessorConfig {
	readonly entry: string;
	readonly debug?: boolean;
	readonly reduceColors?: boolean;
	readonly resize?: { x: number; y: number } | null;
	readonly fileTypes?: string[];
	readonly fileTemplate?: string;
	readonly outputFormat?: 'webp' | 'png' | 'jpeg' | 'avif'; // новий параметр
	readonly optimization?: {
		jpeg?: any;
		png?: any;
		webp?: any;
		avif?: any;
	};
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

	private reduceColors(img: any): any {
		if (!this.config.reduceColors) return img;
		return img.colorspace('rgb16').toColorspace('srgb');
	}

	private sharpProcessing = (files: string[]) =>
		Effect.forEach(
			files,
			(filePath) =>
				Effect.gen(
					function* (_) {
						if (!fs.existsSync(filePath)) {
							yield* _(this.reporter.debugLog(`Image file no longer exists, skipping: ${filePath}`));
							return;
						}

						const image = sharp(filePath);
						const extname = path.extname(filePath);
						const outputFormat = this.config.outputFormat || 'webp';

						// Skip if already in target format
						if (extname === `.${outputFormat}`) return;

						const pos = filePath.lastIndexOf('.');
						const fileName = path.basename(filePath.substr(0, pos < 0 ? filePath.length : pos));
						const dirName = path.dirname(filePath);

						const fileTemplate = this.config.fileTemplate || `\${name}.${outputFormat}`;
						const dist = path.join(dirName, fileTemplate.replace('${name}', fileName));

						let img = image;
						if (this.config.resize) {
							img = img.resize(this.config.resize.x, this.config.resize.y);
						}
						img = this.reduceColors(img);

						const formatOptions = this.config.optimization?.[outputFormat] || {};

						yield* _(
							Effect.tryPromise({
								try: () => img[outputFormat](formatOptions).toFile(dist),
								catch: (error) => new ImageProcessorError('Failed to process image', error),
							}),
						);
					}.bind(this),
				),
			{ concurrency: 'unbounded' }, // Process all images in parallel
		);

	private collectFiles = (entry: string) =>
		Effect.gen(
			function* (_) {
				const files = yield* _(getDirFiles(entry, true));

				const filteredFiles = files.filter((filePath) =>
					this.config.fileTypes.includes(path.extname(filePath)),
				);

				return filteredFiles;
			}.bind(this),
		);

	process = (config: ImageProcessorConfig): Effect.Effect<void, ImageProcessorError> =>
		Effect.gen(
			function* (_) {
				const self = this;

				if (!config.entry) {
					return yield* _(Effect.fail(new ImageProcessorError('Image source entry is not defined')));
				}

				self.config = {
					entry: config.entry,
					debug: config.debug ?? false,
					reduceColors: config.reduceColors ?? false,
					resize: config.resize ?? null,
					fileTypes: config.fileTypes ?? ['.png', '.jpg', '.jpeg', '.avif', '.webp'],
					fileTemplate: config.fileTemplate ?? `\${name}.${config.outputFormat ?? 'webp'}`,
					outputFormat: config.outputFormat ?? 'webp',
					optimization: config.optimization ?? {
						jpeg: { quality: 95 },
						png: { quality: 95, compressionLevel: 9 },
						webp: { lossless: true, nearLossless: true, quality: 95, effort: 5 },
						avif: { quality: 80 },
					},
				};

				const spinner = self.reporter.spinner('Optimizing images');
				spinner.start();

				const filesToProcess = yield* _(
					Effect.catchAll(self.collectFiles(self.config.entry), (error) =>
						Effect.gen(function* (_) {
							yield* _(
								self.reporter.errLog(
									"ImageProcessor: Seems like entry path doesn't exist. Check images entry directory.",
								),
							);
							return yield* _(Effect.fail(new ImageProcessorError('Failed to collect files', error)));
						}),
					),
				);

				yield* _(self.sharpProcessing(filesToProcess));

				spinner.succeed('Images optimized');
			}.bind(this),
		);
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
