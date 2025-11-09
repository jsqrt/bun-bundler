import { Effect, Context, Layer } from 'effect';
import path from 'path';
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
	readonly optimization?: {
		jpeg?: any;
		png?: any;
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
		Effect.forEach(files, (filePath) =>
			Effect.gen(
				function* (_) {
					const image = sharp(filePath);
					const extname = path.extname(filePath);
					if (extname === '.webp') return;

					const pos = filePath.lastIndexOf('.');
					const fileName = path.basename(filePath.substr(0, pos < 0 ? filePath.length : pos));
					const dirName = path.dirname(filePath);

					const fileTemplate = this.config.fileTemplate || '${name}.webp';
					const dist = path.join(dirName, fileTemplate.replace('${name}', fileName));

					const metadata = yield* _(
						Effect.tryPromise({
							try: () => image.metadata(),
							catch: (error) => new ImageProcessorError('Failed to read image metadata', error),
						}),
					);

					let img = image;
					if (this.config.resize) {
						img = img.resize(this.config.resize.x, this.config.resize.y);
					}
					img = this.reduceColors(img);

					yield* _(
						Effect.tryPromise({
							try: () =>
								img
									.webp({
										...(this.config.optimization?.[extname] || {}),
									})
									.toFile(dist),
							catch: (error) => new ImageProcessorError('Failed to process image', error),
						}),
					);
				}.bind(this),
			),
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
					fileTemplate: config.fileTemplate ?? '${name}.webp',
					optimization: config.optimization ?? {
						jpeg: {
							loseless: true,
							nearLossless: true,
							quality: 95,
							effort: 5,
						},
						png: {
							loseless: true,
							nearLossless: true,
							quality: 95,
							effort: 5,
						},
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
