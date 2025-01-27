/**
 * Build script for production bundling a web application.
 */

import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const src = './src';
const dist = './build';

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
	cssDist: './build/css/',
	assembleStyles: './build/css/app.css',
	jsDist: './build/js/',
	imagesDist: './build/images/',
	spriteDist: './build/images/sprite/sprite.svg',
};

bundler.build({
	...directories,
	html: () => Bundler.utils.getDirFiles(directories.html),
	staticFolders: [directories.images, directories.fonts, directories.statics],
	production: process.env.NODE_ENV === 'production',
	onBuildComplete: () => {
		imgProcessor.start({
			entry: directories.imagesDist,
		});
		spriteBuilder.start({
			entry: directories.dist,
			dist: directories.spriteDist,
			spriteIconSelector: 'svg[data-sprite-icon]',
			additionalIcons: './src/images/facebook.svg',
		});
	},
});
