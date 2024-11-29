/**
 * Build Script
 *
 * This script is responsible for building the project using bun-bundler.
 * It handles bundling HTML, SASS, and JavaScript files, processes images,
 * and creates sprite sheets. The script also supports staging builds and
 * includes debug mode options.
 */
import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

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

bundler.build({
	...directories,
	// you can pass function(it will call on every render), or array of files
	html: () => Bundler.utils.getDirFiles(directories.html),
	// folders/files to copy into dist root
	staticFolders: [images, fonts, statics],
	// affects on file-minifications in dist
	production: process.env.NODE_ENV === 'production',
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
