/**
 * Build script for production bundling a web application.
 */

import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder(); // optional
const imgProcessor = new ImageProcessor(); // optional

bundler.build({
	src: './src',
	html: './src/html/',
	sass: './src/css/app.css',
	js: './src/js/app.js',
	dist: './build',
	htmlDist: './build',
	cssDist: './build/css/',
	jsDist: './build/js/',
	staticFolders: ['./src/images/', './src/fonts/', './src/static/'],
	production: true,
	debug: true,
	onBuildComplete: () => {
		// optional
		imgProcessor.process({ root: './build/images/' });
		spriteBuilder.build({
			htmlDir: './build/',
			dist: './build/images/sprite/',
		});
	},
});
