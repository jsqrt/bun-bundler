/**
 * Development script for bundling and serving a web application.
 * This script sets up a development environment using bun-bundler,
 * watches for file changes, processes images, builds sprites,
 * and starts a local development server.
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
	html: path.resolve(src, './pug/'),
	sass: [path.resolve(src, './scss/app.scss')],
	js: [path.resolve(src, './js/app.js')],
	images: path.resolve(src, './images/'),
	fonts: path.resolve(src, './fonts/'),
	statics: path.resolve(src, './static/'),

	dist: dist,
	htmlDist: dist,
	cssDist: path.resolve(dist, './css/'),
	jsDist: path.resolve(dist, './js/'),
	imagesDist: path.resolve(dist, './images/'),
	spriteDist: path.resolve(dist, './images/sprite'),
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
		server.startServer({
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
		imgProcessor.process({
			debug: debugMode,
			root: directories.imagesDist,
		});
		// refresh sprite on every build (no caching)
		spriteBuilder.build({
			debug: debugMode,
			htmlDir: dist,
			dist: directories.spriteDist,
		});
	},
	onCriticalError: () => {
		server.stopServer();
	},
});
