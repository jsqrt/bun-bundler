import { ImageProcessor, SpriteBuilder } from 'bun-bundler/modules';

const imgProcessor = new ImageProcessor();
const spriteBuilder = new SpriteBuilder();

export default {
	dist: './dist',
	html: './src/pug/',
	htmlDist: './dist',
	sass: './src/scss/app.scss',
	cssDist: './dist/css/',
	js: './src/js/app.js',
	jsDist: './dist/js/',
	staticFolders: [
		'./src/images/',
		'./src/fonts/',
	],
	assembleStyles: './dist/css/app.css',
	production: false,
	debug: false,
	onUpdate: ({ changes }) => {
		if (changes.staticFolders) {
			imgProcessor.start({
				debug: false,
				entry: './dist/images',
			});

			spriteBuilder.start({
				debug: false,
				dist: './dist/images/sprite/sprite.svg',
				entry: './dist/',
				spriteIconSelector: 'svg[data-sprite-icon]',
			});
		}
	},
};
