import path from 'path';
import sharp from 'sharp';
import { Reporter } from './reporter';
import { getDirFiles } from '../utils.mjs';

export class ImageProcessor extends Reporter {
	setConfig(cfg = {}) {
		if (!cfg.root) this.errThrow('Server entry is not defined');

		this.config = {
			debug: false,
			root: cfg.root,
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

	onServerStarted() {}

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

	collectFiles(root) {
		const files = getDirFiles(root, true).filter((filePath) => {
			return this.config.fileTypes.includes(path.extname(filePath));
		});
		return files;
	}

	process(cfg) {
		try {
			this.setConfig(cfg);
			this.debugLog('Img processing');
			this.filesToProcess = this.collectFiles(this.config.root);
			this.sharpProcessing(this.filesToProcess);
			return null;
		} catch (err) {
			this.errLog('ImgOptimization error:', err);
			return null;
		}
	}

	stopServer() {
		this.server?.close();
	}
}

export default ImageProcessor;
