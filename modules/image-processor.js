import path from 'path';
import sharp from 'sharp';
import { Reporter } from './reporter';
import { getDirFiles } from '../utils.mjs';
import chalk from 'chalk';

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
			resize: null, // { x: N, y: N } or null
			fileTypes: ['.png', '.jpg', '.jpeg', '.avif', '.webp'],
			fileTemplate: '${name}.webp', // template for output file name
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

	reduceColors(img) {
		if (!this.config.reduceColors) return img;
		return img.colorspace('rgb16').toColorspace('srgb');
	}

	sharpProcessing(files) {
		files.forEach((filePath) => {
			const image = sharp(filePath);
			const extname = path.extname(filePath);
			if (extname === '.webp') return;

			let pos = filePath.lastIndexOf('.');
			const fileName = path.basename(filePath.substr(0, pos < 0 ? filePath.length : pos));
			const dirName = path.dirname(filePath);

			const fileTemplate = this.config.fileTemplate || '${name}.webp';
			const dist = path.join(dirName, fileTemplate.replace('${name}', fileName));

			image.metadata().then((metadata) => {
				let img = image;
				if (this.config.resize) img = img.resize(this.config.resize.x, this.config.resize.y);
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
			this.log(`${chalk.reset(`| ➕ Image optimization... `)}`);

			this.debugLog('Img processing');
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
