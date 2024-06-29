/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import jsdom from 'jsdom';
import fs from 'fs';
import path from 'path';
import { Reporter } from './reporter';

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();

export class SpriteBuilder extends Reporter {
	setConfig({ htmlDir, dist, debug }) {
		this.config = {
			debug,
			src: path.resolve(htmlDir),
			dist,
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

	setupEvents(isDebug) {
		virtualConsole.on('jsdomError', (err) => {
			if (err.message.includes('Could not parse CSS stylesheet')) return;
			if (isDebug) this.errLog(err);
			this.warn('sprite building: jsdom error');
		});
	}

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
