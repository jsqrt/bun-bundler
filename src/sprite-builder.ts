import { Effect, Context, Layer } from 'effect';
import jsdom from 'jsdom';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import chalk from 'chalk';
import type { Reporter } from './reporter';
import { ReporterService } from './reporter';
import type { Constants } from './constants';
import { ConstantsService } from './constants';
import { generateHash, getFilesList } from './utils';

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();

let unknownIconCounter = 0;

export interface SpriteBuilderConfig {
	readonly entry: string | string[];
	readonly dist: string;
	readonly debug?: boolean;
	readonly spriteIconSelector?: string;
	readonly additionalIcons?: string | string[];
}

export class SpriteBuilderError {
	readonly _tag = 'SpriteBuilderError';
	constructor(readonly message: string, readonly originalError?: unknown) {}
}

export interface SpriteBuilder {
	readonly build: (config: SpriteBuilderConfig) => Effect.Effect<void, SpriteBuilderError>;
}

export class SpriteBuilderService extends Context.Tag('SpriteBuilderService')<
	SpriteBuilderService,
	SpriteBuilder
>() {}

interface IconData {
	viewBox: string;
	paths: string;
}

class SpriteBuilderImpl {
	private config!: Required<SpriteBuilderConfig> & { distRelative: string };

	constructor(private reporter: Reporter, private constants: Constants) {}

	private setupEvents(isDebug: boolean) {
		virtualConsole.on('jsdomError', (err) => {
			if (err.message.includes('Could not parse CSS stylesheet')) return;
			if (isDebug) {
				Effect.runSync(this.reporter.errLog(err.message));
			}
			Effect.runSync(this.reporter.warn('sprite building: jsdom error'));
		});
	}

	private generateSprite(icons: Record<string, IconData>): string {
		return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <style>
            .sprite-symbol-usage {display: none;}
            .sprite-symbol-usage:target {display: inline;}
          </style>
          ${Object.entries(icons)
						.map(
							([iconName, iconContent]) => `
            <symbol viewBox="${iconContent.viewBox || '0 0 18 18'}" id="${iconName}">${
								iconContent.paths
							}</symbol>
          `,
						)
						.join('')}
        </defs>
        ${Object.entries(icons)
					.map(
						([iconName]) =>
							`<use id="${iconName}-usage" xlink:href="#${iconName}" class="sprite-symbol-usage" />`,
					)
					.join('')}
      </svg>
    `;
	}

	private replaceAndCollectIcons(
		document: Document,
		isHTML: boolean,
		isSVG: boolean,
	): Record<string, IconData> {
		const icons: Record<string, IconData> = {};
		const pageIcons = document.querySelectorAll(isSVG ? 'svg' : this.config.spriteIconSelector);

		pageIcons.forEach((svgWrap) => {
			const svgNode = svgWrap.tagName === 'svg' ? svgWrap : svgWrap.querySelector('svg');

			if (!svgNode) return;

			const closestElement = svgWrap.closest(this.config.spriteIconSelector);
			const datasetIcon = (closestElement as any)?.dataset?.spriteIcon;
			const closestWithData = svgWrap.closest('[data-sprite-icon]');
			const datasetIconFallback = (closestWithData as any)?.dataset?.spriteIcon;

			let iconName =
				datasetIcon ||
				datasetIconFallback ||
				`icon-${generateHash(svgNode.innerHTML)}-${Math.random().toString()}`;

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

	private collectIconData(fileUrl: string): Record<string, IconData> {
		const extname = path.extname(fileUrl);
		const isHTML = this.constants.extensions.htmlLike.includes(extname);
		const isSVG = extname === this.constants.extDist.svg;

		const fileContent = readFileSync(fileUrl, 'utf8');
		let htmlContent = fileContent;

		if (!isHTML) {
			htmlContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>${fileContent}</body></html>`;
		}

		const DOM = new JSDOM(htmlContent, { virtualConsole });
		const document = DOM.window.document;
		const icons = this.replaceAndCollectIcons(document, isHTML, isSVG);
		const newDocument = '<!DOCTYPE html>'.concat(document.documentElement.outerHTML);

		if (isHTML) writeFileSync(fileUrl, newDocument);

		return icons;
	}

	build = (config: SpriteBuilderConfig): Effect.Effect<void, SpriteBuilderError> =>
		Effect.gen(
			function* (_) {
				const self = this;

				if (!path.resolve(config.dist)) {
					return yield* _(
						Effect.fail(new SpriteBuilderError('Sprite building: dist directory not provided')),
					);
				}

				if (!config.spriteIconSelector) {
					yield* _(
						self.reporter.warn(
							`Warning: SpriteBuilder: ${chalk.underline('spriteIconSelector')} is not provided!`,
						),
					);
				}

				const distExtname = path.extname(config.dist);
				const distFormatted = distExtname !== '.svg' ? path.resolve(config.dist, 'sprite.svg') : config.dist;
				const distRelative = path.relative(
					Array.isArray(config.entry) ? config.entry[0] : config.entry,
					distFormatted,
				);

				self.config = {
					entry: config.entry,
					dist: distFormatted,
					distRelative,
					debug: config.debug ?? false,
					spriteIconSelector: config.spriteIconSelector || 'svg',
					additionalIcons: config.additionalIcons ?? [],
				};

				yield* _(self.reporter.log('Sprite building'));

				self.setupEvents(self.config.debug);

				const icons: Record<string, IconData> = {};

				const filesToProcess = yield* _(
					Effect.sync(() =>
						Effect.runSync(getFilesList(self.config.entry)).concat(
							Effect.runSync(getFilesList(self.config.additionalIcons)),
						),
					),
				);

				const filteredFilesToProcess = filesToProcess.filter(
					(filePath) =>
						filePath.endsWith(self.constants.extDist.html) || filePath.endsWith(self.constants.extDist.svg),
				);

				if (!filteredFilesToProcess.length) {
					return yield* _(
						Effect.fail(
							new SpriteBuilderError('Sprite building: Entry prop - directory/HTML files is not provided'),
						),
					);
				}

				filteredFilesToProcess.forEach((file) => {
					Object.assign(icons, self.collectIconData(file));
				});

				const spriteHTML = self.generateSprite(icons);

				const distDir = path.dirname(self.config.dist);
				const distFileName = path.basename(self.config.dist);

				if (!existsSync(distDir)) {
					mkdirSync(distDir, { recursive: true });
				}

				writeFileSync(path.join(distDir, distFileName), spriteHTML);
			}.bind(this),
		);
}

export const makeSpriteBuilder = (reporter: Reporter, constants: Constants): SpriteBuilder => {
	const impl = new SpriteBuilderImpl(reporter, constants);
	return {
		build: impl.build,
	};
};

export const SpriteBuilderLive = Layer.effect(
	SpriteBuilderService,
	Effect.all([ReporterService, ConstantsService]).pipe(
		Effect.map(([reporter, constants]) => makeSpriteBuilder(reporter, constants)),
	),
);
