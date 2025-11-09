import { Context, Layer } from 'effect';

export interface Constants {
	readonly extDist: {
		readonly html: string;
		readonly css: string;
		readonly svg: string;
	};
	readonly extensions: {
		readonly htmlLike: readonly string[];
		readonly html: readonly string[];
		readonly styles: readonly string[];
		readonly scripts: readonly string[];
	};
	readonly compilationTypes: {
		readonly pug: string;
		readonly css: string;
		readonly js: string;
	};
}

export class ConstantsService extends Context.Tag('ConstantsService')<ConstantsService, Constants>() {}

const constants: Constants = {
	extDist: {
		html: '.html',
		css: '.css',
		svg: '.svg',
	},
	extensions: {
		htmlLike: ['.pug', '.html', '.htm'],
		html: ['.html', '.htm'],
		styles: ['.scss', '.css'],
		scripts: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
	},
	compilationTypes: {
		pug: 'PUG',
		css: 'CSS',
		js: 'JS',
	},
};

export const ConstantsLive = Layer.succeed(ConstantsService, constants);
