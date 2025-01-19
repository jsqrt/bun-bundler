/**
 * Build script for production bundling a web application.
 */

import { resolve } from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const src = resolve('./src');
const dist = resolve('./build');

const directories = {
	src: src,
	html: resolve(src, './pug/'),
	sass: [resolve(src, './scss/app.scss')],
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

bundler.build({
	...directories,
	// you can pass function(it will call on every render), or array of files
	html: () => Bundler.utils.getDirFiles(directories.html),
	// folders/files to copy into dist root
	staticFolders: [images, fonts, statics],
	// affects on file-minifications in dist
	production: process.env.NODE_ENV === 'production',
	// assemble styles into one file
	assembleStyles,
	onBuildComplete: () => {
		// image optimizations on every build (no caching)
		imgProcessor.start({
			entry: directories.imagesDist,
		});
		// refresh sprite on every build (no caching)
		spriteBuilder.start({
			entry: directories.dist,
			dist: directories.spriteDist,
			spriteIconSelector: 'svg[data-sprite-icon]',
			additionalIcons: './src/images/facebook.svg',
		});
	},
});
