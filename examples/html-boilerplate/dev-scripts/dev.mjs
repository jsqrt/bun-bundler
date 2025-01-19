/**
 * Development script for bundling and serving a web application.
 */

import { resolve } from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor, Server } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const src = resolve('./src');
const dist = resolve('./build');

const directories = {
	src: src,
	html: resolve(src, './html/'),
	sass: [resolve(src, './css/app.css')],
	js: [resolve(src, './js/app.js')],
	images: resolve(src, './images/'),
	fonts: resolve(src, './fonts/'),
	statics: resolve(src, './static/'),

	dist: dist,
	htmlDist: dist,
	cssDist: resolve(dist, './css/'),
	assembleStyles: resolve(dist, './css/app.css'),
	jsDist: resolve(dist, './js/'),
	imagesDist: resolve(dist, './images/'),
	spriteDist: resolve(dist, './images/sprite/sprite.svg'),
};

const { images, fonts, statics, assembleStyles } = directories;

const debugMode = false;
const server = new Server();

bundler.watch({
	...directories,
	staticFolders: [images, fonts, statics],
	assembleStyles,
	production: process.env.NODE_ENV === 'production',
	debug: debugMode, // optional
	html: () => Bundler.utils.getDirFiles(directories.html),
	onStart: () => {
		server.start({
			open: true,
			debug: debugMode,
			port: 8080,
			root: dist,
			overrides: {}, // custom BrowserSync config, if needed
		});
	},
	onBuildComplete: () => {
		// ❇️ Ultra flexible to integrate your packages.
		// image optimizations on every build (no caching)
		imgProcessor.start({
			debug: debugMode,
			entry: directories.imagesDist,
		});
		// refresh sprite on every build (no caching)
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
