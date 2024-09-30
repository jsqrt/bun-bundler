/**
 * Development script for bundling and serving a web application.
 * This script sets up a development environment using bun-bundler,
 * watches for file changes, processes images, builds sprites,
 * and starts a local development server.
 */

import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, Server, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const server = new Server();
const imgProcessor = new ImageProcessor();

const dist = path.resolve('./dev-dist');
const src = path.resolve('./src');
const debugMode = false;

const dev = () => {
	bundler.watch({
		production: false,
		debug: debugMode,
		html: () => Bundler.utils.getDirFiles(`${src}/pug/`),
		sass: [`${src}/scss/app.scss`],
		js: [`${src}/js/app.js`],
		staticFolders: [`${src}/images/`, `${src}/fonts/`, `${src}/static-files/`],
		dist,
		htmlDist: dist,
		cssDist: `${dist}/css/`,
		jsDist: `${dist}/js/`,
		onStart: () => {
			server.startServer({
				open: true,
				debug: debugMode,
				port: 8080,
				root: dist,
			});
		},
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
		onCriticalError: () => {
			server.stopServer();
		},
	});
};

dev();
