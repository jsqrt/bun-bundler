import path from 'path';
import sharp from 'sharp';
import { Reporter } from './reporter';
import { getDirFiles } from '../utils.mjs';
import { runtimeMessages } from '../stdout/runtime-messages';

export class ImageProcessor extends Reporter {
	setConfig(cfg = {}) {
		if (!cfg) this.errThrow('Sprite building: no config provided');
		// cfg.root - old parameter
		if (!cfg.root && !cfg.entry) this.errThrow('Image source entry is not defined');
		if (!cfg.entry) cfg.entry = cfg.root;

		this.config = {
			debug: false,
			entry: cfg.entry,
			reduceColors: false,
			resize: { x: 1, y: 1 },
			fileTypes: ['.png', '.jpg', '.jpeg', '.avif'],
			optimization: {
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
			...cfg,
		};
	}

	resize(img, metadata) {
		if (this.config.resize.x === 1 && this.config.resize.y === 1) return img;
		const { x, y } = this.config.resize;
		return img.resize(Math.round(metadata.width * x), Math.round(metadata.height * y));
	}

	reduceColors(img) {
		if (!this.config.reduceColors) return img;
		return img.colorspace('rgb16').toColorspace('srgb');
	}

	sharpProcessing(files) {
		files.forEach((filePath) => {
			const image = sharp(filePath);
			const extname = path.extname(filePath);
			const dist = filePath.replace(extname, '.webp');

			image.metadata().then((metadata) => {
				let img = image;
				img = this.resize(img, metadata);
				img = this.reduceColors(img);
				img
					.webp({
						...(this.config.optimization?.[extname] || {}),
					})
					.toFile(dist);
			});
		});
	}

	collectFiles(entry) {
		const files = getDirFiles(entry, true);

		if (files instanceof Error) {
			this.errLog("ImageProcessor: Seems like entry path doesn't exist. Check images entry directory.");
			this.errThrow(files.message);
		}

		const filteredFiles = files.filter((filePath) => {
			return this.config.fileTypes.includes(path.extname(filePath));
		});
		return filteredFiles;
	}

	start(cfg) {
		try {
			this.setConfig(cfg);
			this.log(runtimeMessages['image-processing-start']);
			this.filesToProcess = this.collectFiles(this.config.entry);
			this.sharpProcessing(this.filesToProcess);
			return null;
		} catch (err) {
			this.errLog('ImageProcessor:');
			this.errLog(err.message);
			return null;
		}
	}

	process = this.start;
}

export default ImageProcessor;
