import path from 'path';
import sharp from 'sharp';
import { Reporter } from './reporter';
import { getFilesList } from '../utils.mjs';

/**
 * The `ImageProcessor` class is responsible for processing and optimizing images in the production build.
 * It uses the `sharp` library to perform various image processing tasks, such as resizing, reducing colors, and converting to WebP format.
 *
 * The class has the following main methods:
 *
 * - `setConfig(cfg)`: Sets the configuration options for the image processing, such as the root directory, file types to process, and optimization settings.
 * - `resize(img, metadata)`: Resizes the image based on the configured resize factors.
 * - `reduceColors(img)`: Reduces the number of colors in the image if the `reduceColors` option is enabled.
 * - `sharpProcessing(files)`: Processes the given image files using the `sharp` library, applying the configured optimizations.
 * - `collectFiles(root)`: Collects all the image files in the configured root directory that match the allowed file types.
 * - `process(cfg)`: Processes the images in the configured root directory, applying the configured optimizations.
 *
 * The `ImageProcessor` class extends the `Reporter` class, which provides logging and error handling functionality.
 */

export class ImageProcessor extends Reporter {
	/**
	 * Sets the configuration options for the ImageProcessor class.
	 *
	 * @param {Object} cfg - The configuration object.
	 * @param {string} cfg.root - The root directory for image processing.
	 * @param {boolean} [cfg.debug=false] - Whether to enable debug logging.
	 * @param {boolean} [cfg.reduceColors=false] - Whether to reduce the number of colors in the images.
	 * @param {Object} [cfg.resize] - The resize factors for the images.
	 * @param {number} [cfg.resize.x=1] - The horizontal resize factor.
	 * @param {number} [cfg.resize.y=1] - The vertical resize factor.
	 * @param {string[]} [cfg.fileTypes=['.png', '.jpg', '.jpeg', '.avif']] - The allowed file types for image processing.
	 * @param {Object} [cfg.optimization] - The optimization settings for different file types.
	 */
	setConfig(cfg = {}) {
		// cfg.root - old parameter
		if (!cfg) this.errThrow('Sprite building: no config provided');

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

	/**
	 * Resizes the image based on the configuration settings.
	 *
	 * @param {sharp.Sharp} img - The image to be resized.
	 * @param {sharp.Metadata} metadata - The metadata of the image.
	 * @returns {sharp.Sharp} The resized image.
	 */
	resize(img, metadata) {
		if (this.config.resize.x === 1 && this.config.resize.y === 1) return img;
		const { x, y } = this.config.resize;
		return img.resize(Math.round(metadata.width * x), Math.round(metadata.height * y));
	}

	/**
	 * Reduces the number of colors in the image if the `reduceColors` configuration option is enabled.
	 *
	 * @param {sharp.Sharp} img - The image to be processed.
	 * @returns {sharp.Sharp} The image with reduced colors.
	 */
	reduceColors(img) {
		if (!this.config.reduceColors) return img;
		return img.colorspace('rgb16').toColorspace('srgb');
	}

	/**
	 * Processes a collection of image files using the Sharp library.
	 *
	 * This method iterates through the provided list of image file paths, loads each image using Sharp, applies the configured image processing options (resizing and color reduction), and saves the processed image as a WebP file.
	 *
	 * @param {string[]} files - An array of file paths for the images to be processed.
	 * @returns {void}
	 */
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

	/**
	 * Collects a list of file paths that match the configured file types.
	 *
	 * @param {string} entry - The entry directory to search for files.
	 * @returns {string[]} An array of file paths that match the configured file types.
	 */
	collectFiles(entry) {
		const files = getFilesList(entry, true).filter((filePath) => {
			return this.config.fileTypes.includes(path.extname(filePath));
		});
		return files;
	}

	/**
	 * Processes a collection of image files using the configured image processing options.
	 *
	 * This method sets the configuration, collects the files to process, and then applies the configured image processing options (resizing and color reduction) to each file, saving the processed image as a WebP file.
	 *
	 * @param {object} cfg - The configuration object to use for processing the images.
	 * @returns {null} This method does not return a value.
	 */
	start(cfg) {
		try {
			this.setConfig(cfg);
			this.debugLog('Img processing');
			this.filesToProcess = this.collectFiles(this.config.entry);
			this.sharpProcessing(this.filesToProcess);
			return null;
		} catch (err) {
			this.errLog('ImgOptimization error:', err);
			return null;
		}
	}

	process = this.start;
}

export default ImageProcessor;
