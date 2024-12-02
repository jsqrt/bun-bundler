/**
 * Development script for bundling and serving a web application.
 */

import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor, Server } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const src = path.resolve('./src');
const dist = path.resolve('./build');

const directories = {
	src: src,
	html: path.resolve(src, './html/'),
	sass: [path.resolve(src, './css/app.css')],
	js: [path.resolve(src, './js/app.js')],
	images: path.resolve(src, './images/'),
	fonts: path.resolve(src, './fonts/'),
	statics: path.resolve(src, './static/'),

	dist: dist,
	htmlDist: dist,
	cssDist: path.resolve(dist, './css/'),
	jsDist: path.resolve(dist, './js/'),
	imagesDist: path.resolve(dist, './images/'),
	spriteDist: path.resolve(dist, './images/sprite/sprite.svg'),
};

const { images, fonts, statics } = directories;

const debugMode = false;
const server = new Server();

bundler.watch({
	...directories,
	staticFolders: [images, fonts, statics],
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
