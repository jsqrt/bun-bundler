/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import jsdom from 'jsdom';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { Reporter } from './reporter';
import { getFilesList } from '../utils.mjs';

let unknownIconCounter = 0;

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();

/**
 * The SpriteBuilder class is responsible for generating a SVG sprite file from a set of icons.
 *
 * It collects the icon data from HTML files in a source directory, generates the SVG sprite, and writes the sprite to a distribution directory.
 *
 * The class has the following methods:
 * - `setConfig`: Sets the configuration options for the sprite builder, including the source HTML directory, distribution directory, and debug mode.
 * - `generateSprite`: Generates the SVG sprite HTML from the collected icon data.
 * - `collectIconData`: Collects the icon data (viewBox and paths) from the HTML files in the source directory.
 * - `setupEvents`: Sets up event listeners for JSDOM errors during the sprite building process.
 * - `build`: Orchestrates the sprite building process by setting the configuration, collecting the icon data, generating the sprite, and writing the sprite to the distribution directory.
 */
export class SpriteBuilder extends Reporter {
	/**
	 * Sets the configuration options for the SpriteBuilder class, including the source HTML directory, distribution directory, and debug mode.
	 *
	 * @param {Object} config - The configuration options.
	 * @param {string} config.entry - The path to the HTML files contains the icons.
	 * @param {string} config.dist - The path to the distribution directory where the generated sprite file will be written.
	 * @param {boolean} config.debug - Enables debug mode, which logs additional information during the sprite building process.
	 * @param {boolean} config.spriteIconSelector - Define selector of the sprite icon.
	 */
	setConfig({ entry, dist, debug, spriteIconSelector, additionalIcons, root }) {
		if (!dist) {
			this.errThrow('Sprite building: dist directory not provided');
		}

		this.config = {
			debug,
			dist: path.resolve(dist),
			spriteIconSelector: spriteIconSelector || 'svg',
			entry: entry || root || [],
			additionalIcons,
		};
	}

	/**
	 * Generates the SVG sprite HTML from the collected icon data.
	 *
	 * The generated sprite HTML includes a `<defs>` section with `<symbol>` elements for each icon, and a set of `<use>` elements to reference the icons.
	 *
	 * @param {Object} icons - An object containing the icon data, where the keys are the icon names and the values are objects with `viewBox` and `paths` properties.
	 * @returns {string} The generated SVG sprite HTML.
	 */
	generateSprite(icons) {
		const spriteHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<defs>
					<style>
						.sprite-symbol-usage {display: none;}
						.sprite-symbol-usage:target {display: inline;}
					</style>
					${Object.entries(icons)
						.map(([iconName, iconContent]) => {
							return `
							<symbol viewBox="${iconContent.viewBox || '0 0 18 18'}" id="${iconName}">${iconContent.paths}</symbol>
						`;
						})
						.join('')}

				</defs>
				${Object.entries(icons)
					.map(([iconName]) => {
						return `<use id="${iconName}-usage" xlink:href="#${iconName}" class="sprite-symbol-usage" />`;
					})
					.join('')}
			</svg>
		`;

		return spriteHTML;
	}

	replaceAndCollectIcons({ document, isHTML, isSVG, basename }) {
		let icons = {};
		const pageIcons = document.querySelectorAll(isSVG ? 'svg' : this.config.spriteIconSelector);

		pageIcons.forEach((svgWrap) => {
			const svgNode = svgWrap.tagName === 'svg' ? svgWrap : svgWrap.querySelector('svg');
			let iconName = svgWrap.dataset.spriteIcon || basename;

			if (!svgNode) return;

			if (!iconName) {
				unknownIconCounter += 1;
				iconName = `icon-${unknownIconCounter}`;
			}

			const viewBox = svgNode.getAttribute('viewBox');

			const HTMLUseChunk = `
					<svg viewBox="${viewBox}">
						<use xlink:href="images/sprite/sprite.svg#${iconName}"></use>
					</svg>
				`;

			icons[iconName] = {
				viewBox: svgNode.getAttribute('viewBox') || '0 0 18 18',
				paths: svgNode.innerHTML,
			};

			if (isHTML) {
				svgNode.outerHTML = HTMLUseChunk;
			}
		});

		return icons;
	}

	collectIconData(fileUrl) {
		const extname = path.extname(fileUrl);
		const basename = path.parse(fileUrl).name;

		const isHTML = extname === '.html';
		const isSVG = extname === '.svg';

		const fileContent = readFileSync(fileUrl, 'utf8');
		let htmlContent = fileContent;

		if (!isHTML) {
			htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>${fileContent}</body></html>`;
		}

		const DOM = new JSDOM(htmlContent, { virtualConsole });
		const document = DOM.window.document;
		const newDocument = '<!DOCTYPE html>'.concat(document.documentElement.outerHTML);
		const icons = this.replaceAndCollectIcons({ document, basename, isHTML, isSVG });

		if (isHTML) writeFileSync(fileUrl, newDocument);

		return icons;
	}

	/**
	 * Sets up event listeners for the sprite building process.
	 *
	 * This function sets up an event listener for 'jsdomError' events, which are emitted by the JSDOM library used in the `collectIconData` function. The function filters out errors related to parsing CSS stylesheets, and logs other errors to the error log if the `isDebug` flag is set. It also logs a warning message for any 'jsdomError' events.
	 *
	 * @param {boolean} isDebug - A flag indicating whether debug mode is enabled.
	 */
	setupEvents(isDebug) {
		virtualConsole.on('jsdomError', (err) => {
			if (err.message.includes('Could not parse CSS stylesheet')) return;
			if (isDebug) this.errLog(err);
			this.warn('sprite building: jsdom error');
		});
	}

	/**
	 * Builds a sprite from the HTML files in the specified source directory.
	 *
	 * This function reads all HTML files in the source directory, extracts the SVG icons from them, and generates a sprite SVG file in the specified distribution directory. It also collects metadata about the extracted icons, such as their viewBox and path data.
	 *
	 * @param {Object} cfg - The configuration object for the sprite building process.
	 * @param {string} cfg.entry - The directory containing the HTML files to process, or HTML files array.
	 * @param {string} cfg.src - The source directory containing the HTML files.
	 * @param {string} cfg.dist - The distribution directory where the generated sprite SVG file will be written.
	 * @param {boolean} cfg.debug - A flag indicating whether debug mode is enabled.
	 * @param {boolean} cfg.spriteIconSelector - Define the selector of the sprite icons.
	 * @returns {Object} - An object containing the metadata for the extracted icons, keyed by their names.
	 */
	start(cfg = {}) {
		if (!cfg) this.errThrow('Sprite building: no config provided');

		this.setConfig(cfg);
		this.setupEvents(this.config.debug);
		this.debugLog('Sprite building');

		const icons = {};

		const filesToProcess = getFilesList(this.config.entry).concat(getFilesList(this.config.additionalIcons));

		const filteredFilessToProcess = filesToProcess.filter(
			(filePath) => filePath.endsWith('.html') || filePath.endsWith('.svg'),
		);

		if (!filesToProcess.length)
			this.errThrow('Sprite building: Entry prop - directory/HTML files is not provided');

		filteredFilessToProcess.forEach((file) => {
			Object.assign(icons, this.collectIconData(file));
		});

		const spriteHTML = this.generateSprite(icons);

		const distDir = path.dirname(this.config.dist);
		const distFileName = path.basename(this.config.dist);

		if (!existsSync(distDir)) {
			mkdirSync(distDir, { recursive: true });
		}

		writeFileSync(path.join(distDir, distFileName), spriteHTML);
	}

	build = this.start;
}

export default SpriteBuilder;
