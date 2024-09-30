/**
 * Build Script
 *
 * This script is responsible for building the project using bun-bundler.
 * It handles bundling HTML, SASS, and JavaScript files, processes images,
 * and creates sprite sheets. The script also supports staging builds and
 * includes debug mode options.
 */

import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const dist = path.resolve('./build');
const src = path.resolve('./src');
const debugMode = false;

const build = async () => {
	try {
		bundler.build({
			production: process.env.NODE_ENV === 'production',
			debug: debugMode,
			html: () => Bundler.utils.getDirFiles(`${src}/html/`),
			sass: [`${src}/css/app.css`],
			js: [`${src}/js/app.js`],
			staticFolders: [`${src}/images/`, `${src}/fonts/`, `${src}/static-files/`],
			dist,
			htmlDist: dist,
			cssDist: `${dist}/css/`,
			jsDist: `${dist}/js/`,
			onBuildComplete: () => {
				imgProcessor.process({
					debug: debugMode,
					root: `${dist}/images/`,
				});
				spriteBuilder.build({
					spriteIconsSelector: '[data-sprite-icon]',
					debug: debugMode,
					htmlDir: dist,
					dist: `${dist}/images/sprite/`,
				});
			},
			// onCriticalError: () => {},
		});
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

build();
