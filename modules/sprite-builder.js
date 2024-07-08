/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import jsdom from 'jsdom';
import fs from 'fs';
import path from 'path';
import { Reporter } from './reporter';

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
 * - `collectIconsData`: Collects the icon data (viewBox and paths) from the HTML files in the source directory.
 * - `setupEvents`: Sets up event listeners for JSDOM errors during the sprite building process.
 * - `build`: Orchestrates the sprite building process by setting the configuration, collecting the icon data, generating the sprite, and writing the sprite to the distribution directory.
 */
export class SpriteBuilder extends Reporter {
	/**
	 * Sets the configuration options for the SpriteBuilder class, including the source HTML directory, distribution directory, and debug mode.
	 *
	 * @param {Object} config - The configuration options.
	 * @param {string} config.htmlDir - The path to the directory containing the HTML files with the icons.
	 * @param {string} config.dist - The path to the distribution directory where the generated sprite file will be written.
	 * @param {boolean} config.debug - Enables debug mode, which logs additional information during the sprite building process.
	 */
	setConfig({ htmlDir, dist, debug }) {
		this.config = {
			debug,
			src: path.resolve(htmlDir),
			dist,
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

	/**
	 * Collects the icon data from the HTML files in the specified directory.
	 *
	 * This function reads the HTML files in the `srcDir` directory, extracts the SVG icons marked with the `data-sprite-icon` attribute, and returns an object containing the icon names and their corresponding SVG data.
	 *
	 * @param {string} srcDir - The path to the directory containing the HTML files with the icons.
	 * @returns {Object} An object containing the icon data, where the keys are the icon names and the values are objects with `viewBox` and `paths` properties.
	 */
	collectIconsData(srcDir) {
		let icons = {};

		fs.readdirSync(srcDir)
			.filter((fileName) => fileName.endsWith('.html'))
			.forEach((page) => {
				const pageContent = fs.readFileSync(path.resolve(srcDir, page), 'utf8');
				const DOM = new JSDOM(pageContent, { virtualConsole });
				const document = DOM.window.document;
				const pageSvg = document.querySelectorAll('[data-sprite-icon]');

				pageSvg.forEach((svgWrap) => {
					const iconName = svgWrap.dataset.spriteIcon;
					const svg = svgWrap.querySelector('svg');

					if (!svg || !iconName) return;

					const HTMLUseChunk = `
					<svg>
						<use xlink:href="images/sprite/sprite.svg#${iconName}"></use>
					</svg>
				`;

					icons[iconName] = {
						viewBox: svg.getAttribute('viewBox'),
						paths: svg.innerHTML,
					};

					svgWrap.innerHTML = HTMLUseChunk;
				});

				const newDocument = '<!DOCTYPE html>'.concat(document.documentElement.outerHTML);

				fs.writeFileSync(path.resolve(srcDir, page), newDocument);
			});

		return icons;
	}

	/**
	 * Sets up event listeners for the sprite building process.
	 *
	 * This function sets up an event listener for 'jsdomError' events, which are emitted by the JSDOM library used in the `collectIconsData` function. The function filters out errors related to parsing CSS stylesheets, and logs other errors to the error log if the `isDebug` flag is set. It also logs a warning message for any 'jsdomError' events.
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
	 * @param {string} cfg.htmlDir - The directory containing the HTML files to process.
	 * @param {string} cfg.src - The source directory containing the HTML files.
	 * @param {string} cfg.dist - The distribution directory where the generated sprite SVG file will be written.
	 * @param {boolean} cfg.debug - A flag indicating whether debug mode is enabled.
	 * @returns {Object} - An object containing the metadata for the extracted icons, keyed by their names.
	 */
	build(cfg) {
		if (!fs.existsSync(cfg.htmlDir)) {
			this.errLog(`Sprite building: htmlDir ${cfg.htmlDir} doesn't exist`);
			return;
		}

		this.setConfig(cfg);
		this.setupEvents(this.config.debug);
		this.debugLog('Sprite building');

		const icons = this.collectIconsData(this.config.src);
		const spriteHTML = this.generateSprite(icons);

		if (!fs.existsSync(this.config.dist)) {
			fs.mkdirSync(this.config.dist, { recursive: true });
		}

		fs.writeFileSync(this.config.dist.concat('sprite.svg'), spriteHTML);
	}
}

export default SpriteBuilder;
