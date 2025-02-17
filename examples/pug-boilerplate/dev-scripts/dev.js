/**
 * Development script for bundling and serving a web application.
 */

import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor, Server } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const src = './src';
const dist = './dist';

const directories = {
	src: src,
	html: './src/pug/',
	sass: './src/scss/app.scss',
	js: './src/js/app.js',
	images: './src/images/',
	fonts: './src/fonts/',
	statics: './src/static/',
	dist: dist,
	htmlDist: dist,
	cssDist: './dist/css/',
	assembleStyles: './dist/css/app.css',
	jsDist: './dist/js/',
	imagesDist: './dist/images/',
	spriteDist: './dist/images/sprite/sprite.svg',
};

const debugMode = false;
const server = new Server();

bundler.watch({
	...directories,
	staticFolders: [directories.images, directories.fonts, directories.statics],
	production: process.env.NODE_ENV === 'production',
	debug: debugMode, // optional
	html: () => Bundler.utils.getDirFiles(directories.html),
	onStart: () => {
		server.start({
			open: true,
			debug: debugMode,
			port: 8080,
			root: dist,
			overrides: {}, // optional
		});
	},
	onBuildComplete: () => {
		imgProcessor.start({
			debug: debugMode,
			entry: directories.imagesDist,
		});
		spriteBuilder.start({
			debug: debugMode,
			dist: directories.spriteDist,
			entry: dist,
			spriteIconSelector: 'svg[data-sprite-icon]',
			additionalIcons: './src/images/facebook.svg',
		});
	},
	onCriticalError: () => {
		server.stop();
	},
});
