/**
 * Build script for production bundling a web application.
 */

import Bundler from '../../../index.mjs';
import { ImageProcessor, SpriteBuilder } from '../../../index.mjs';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder(); // optional
const imgProcessor = new ImageProcessor(); // optional

bundler.build({
	dist: './build',
	// sass/css bundling
	sass: './src/scss/app.scss',
	cssDist: './build/css/',
	// js bundling
	js: './src/js/app.js',
	jsDist: './build/js/',
	// html/pug bundling
	html: './src/pug/',
	htmlDist: './build',
	staticFolders: [
		// static assets bundling
		'./src/images/',
		'./src/fonts/',
		'./src/static/',
	],
	assembleStyles: './build/css/app.css', // imported styles form JS goes here
	production: true,
	debug: false,
	onStart: () => {},
	onBuildComplete: () => {
		imgProcessor.start({
			debug: false,
			entry: './build/images',
		});
		spriteBuilder.start({
			debug: false,
			dist: './build/images/sprite/sprite.svg',
			entry: './build/', // detect SVG in html files here
			spriteIconSelector: 'svg[data-sprite-icon]',
			additionalIcons: './src/images/facebook.svg', // inline icons, you want to add
		});
	},
});
