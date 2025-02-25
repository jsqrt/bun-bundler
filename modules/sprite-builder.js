/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import jsdom from 'jsdom';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { Reporter } from './reporter';
import { generateHash, getFilesList } from '../utils.mjs';
import { constants } from './constants';
import chalk from 'chalk';

let unknownIconCounter = 0;

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();

export class SpriteBuilder extends Reporter {
	setConfig({ htmlDir, entry = htmlDir, dist, debug, spriteIconSelector, additionalIcons, root }) {
		//htmlDir - legacy prop
		if (!path.resolve(dist)) {
			this.errThrow('Sprite building: dist directory not provided');
		}

		if (!spriteIconSelector) {
			this.warn(`Warning: SpriteBuilder: ${chalk.underline('spriteIconSelector')} is not provided!`);
		}

		// if dist is directory
		const distExtname = path.extname(dist);
		const distFormatted = distExtname !== '.svg' ? path.resolve(dist, 'sprite.svg') : dist;
		const distRelative = path.relative(entry, distFormatted);

		this.config = {
			debug,
			dist: distFormatted,
			distRelative,
			spriteIconSelector: spriteIconSelector || 'svg',
			entry: entry || root || [],
			additionalIcons,
		};
	}

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
			let iconName =
				svgWrap.closest(this.config.spriteIconSelector)?.dataset.spriteIcon ||
				svgWrap.closest('[data-sprite-icon]')?.dataset.spriteIcon ||
				`icon-${generateHash(svgNode.innerHTML)}-${Math.random().toString()}`;

			if (!svgNode) return;

			if (!iconName) {
				unknownIconCounter += 1;
				iconName = `icon-${unknownIconCounter}`;
			}

			const svgAttributes = Array.from(svgNode.attributes)
				.map((attr) => `${attr.name}="${attr.value}"`)
				.join(' ');

			const HTMLUseChunk = `
					<svg ${svgAttributes}>
						<use xlink:href="${this.config.distRelative}#${iconName}"></use>
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

		const isHTML = constants.extensions.htmlLike.includes(extname);
		const isSVG = extname === constants.extDist.svg;

		const fileContent = readFileSync(fileUrl, 'utf8');
		let htmlContent = fileContent;

		if (!isHTML) {
			htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>${fileContent}</body></html>`;
		}

		const DOM = new JSDOM(htmlContent, { virtualConsole });
		const document = DOM.window.document;
		const icons = this.replaceAndCollectIcons({ document, basename, isHTML, isSVG });
		const newDocument = '<!DOCTYPE html>'.concat(document.documentElement.outerHTML);

		if (isHTML) writeFileSync(fileUrl, newDocument);

		return icons;
	}

	setupEvents(isDebug) {
		virtualConsole.on('jsdomError', (err) => {
			if (err.message.includes('Could not parse CSS stylesheet')) return;
			if (isDebug) this.errLog(err);
			this.warn('sprite building: jsdom error');
		});
	}

	start(cfg = {}) {
		if (!cfg) this.errThrow('Sprite building: no config provided');
		this.log(`${chalk.reset(`| ➕ Sprite building... `)}`);

		this.setConfig(cfg);
		this.setupEvents(this.config.debug);
		this.debugLog('Sprite building');

		const icons = {};

		const filesToProcess = getFilesList(this.config.entry).concat(getFilesList(this.config.additionalIcons));

		const filteredFilessToProcess = filesToProcess.filter(
			(filePath) => filePath.endsWith(constants.extDist.html) || filePath.endsWith(constants.extDist.svg),
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
