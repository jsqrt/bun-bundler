/**
 * Development script for bundling and serving a web application.
 */

import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor, Server } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const src = './src';
const dist = './dev-dist';

const directories = {
	src,
	html: './src/html/',
	sass: './src/css/app.css',
	js: './src/js/app.js',
	images: './src/images/',
	fonts: './src/fonts/',
	statics: './src/static/',
	dist,
	htmlDist: dist,
	cssDist: './dev-dist/css/',
	jsDist: './dev-dist/js/',
	imagesDist: './dev-dist/images/',
	spriteDist: './dev-dist/images/sprite/sprite.svg',
	assembleStyles: './dev-dist/css/app.css',
};

const debugMode = false;
const server = new Server();

bundler.watch({
	...directories,
	staticFolders: [directories.images, directories.fonts, directories.statics],
	production: process.env.NODE_ENV === 'production',
	debug: debugMode,
	html: () => Bundler.utils.getDirFiles(directories.html),
	onStart: () => {
		server.start({
			open: true,
			debug: debugMode,
			port: 8080,
			root: dist,
			overrides: {},
		});
	},
	onBuildComplete: () => {
		imgProcessor.start({
			debug: debugMode,
			entry: directories.imagesDist,
		});
		spriteBuilder.start({
			debug: debugMode,
			entry: dist,
			dist: directories.spriteDist,
			additionalIcons: './src/images/facebook.svg',
			spriteIconSelector: 'svg[data-sprite-icon]',
		});
	},
	onCriticalError: () => {
		server.stop();
	},
});
