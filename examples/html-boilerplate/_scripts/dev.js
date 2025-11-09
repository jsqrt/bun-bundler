/**
 * Development script for bundling and serving a web application.
 */
import Bundler from 'bun-bundler';
import { ImageProcessor, Server, SpriteBuilder } from 'bun-bundler/modules';

const bundler = new Bundler();
const server = new Server();
const spriteBuilder = new SpriteBuilder(); // optional
const imgProcessor = new ImageProcessor(); // optional

let serverStarted = false;

bundler.watch({
	dist: './dist',
	// sass/css bundling
	sass: './src/css/app.css',
	cssDist: './dist/css/',
	// js bundling
	js: './src/js/app.js',
	jsDist: './dist/js/',
	// html/pug bundling
	html: './src/html/',
	htmlDist: './dist',
	staticFolders: [
		// static assets bundling
		'./src/images/',
		'./src/fonts/',
		'./src/static/',
	],
	assembleStyles: './dist/css/app.css', // imported styles form JS goes here
	production: false,
	debug: true,
	onBuildComplete: () => {
		if (!serverStarted) {
			server.startServer({
				root: './dist',
				open: true,
				debug: false,
				port: 8080,
				overrides: {},
			});
			serverStarted = true;
		}
	},
	onUpdate: ({ changes }) => {
		if (changes.staticFolders) {
			imgProcessor.start({
				debug: false,
				entry: './dist/images',
			});

			spriteBuilder.start({
				debug: false,
				dist: './dist/images/sprite/sprite.svg',
				entry: './dist/', // detect SVG in html files here
				spriteIconSelector: 'svg[data-sprite-icon]',
				additionalIcons: './src/images/facebook.svg', // inline icons, you want to add
			});
		}
	},
	onError: () => server.stopServer(),
});
