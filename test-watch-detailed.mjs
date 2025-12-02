import { Bundler, Server } from './index.mjs';
import fs from 'fs';

const bundler = new Bundler();
const server = new Server();

let serverStarted = false;

bundler.watch({
	rootDir: './examples/pug-boilerplate',
	dist: './examples/pug-boilerplate/dist',
	sass: './examples/pug-boilerplate/src/scss/app.scss',
	cssDist: './examples/pug-boilerplate/dist/css/',
	js: './examples/pug-boilerplate/src/js/app.js',
	jsDist: './examples/pug-boilerplate/dist/js/',
	html: './examples/pug-boilerplate/src/pug/',
	htmlDist: './examples/pug-boilerplate/dist',
	staticFolders: [
		'./examples/pug-boilerplate/src/images/',
		'./examples/pug-boilerplate/src/fonts/',
		'./examples/pug-boilerplate/src/static/',
	],
	assembleStyles: './examples/pug-boilerplate/dist/css/app.css',
	production: false,
	debug: true,
	onBuildComplete: () => {
		console.log('\n✓ Build completed');
		// Check what files were created
		const hasHTML = fs.existsSync('./examples/pug-boilerplate/dist/index.html');
		const hasCSS = fs.existsSync('./examples/pug-boilerplate/dist/css/app.css');
		const hasJS = fs.existsSync('./examples/pug-boilerplate/dist/js/app.js');

		console.log(`  Files created: HTML=${hasHTML}, CSS=${hasCSS}, JS=${hasJS}`);

		if (!serverStarted) {
			server.startServer({
				root: './examples/pug-boilerplate/dist',
				open: false,
				debug: false,
				port: 8080,
			});
			serverStarted = true;
		}
	},
	onError: () => {
		console.log('\n✗ Build error occurred');
		// Check what files were created even after error
		const hasHTML = fs.existsSync('./examples/pug-boilerplate/dist/index.html');
		const hasCSS = fs.existsSync('./examples/pug-boilerplate/dist/css/app.css');
		const hasJS = fs.existsSync('./examples/pug-boilerplate/dist/js/app.js');

		console.log(`  Files after error: HTML=${hasHTML}, CSS=${hasCSS}, JS=${hasJS}`);
	},
});
