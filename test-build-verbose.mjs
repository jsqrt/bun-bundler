import { Bundler } from './index.mjs';

const bundler = new Bundler();

console.log('Starting build...');

bundler.build({
rootDir: './examples/pug-boilerplate',
dist: './examples/pug-boilerplate/dist',
sass: './examples/pug-boilerplate/src/scss/app.scss',
cssDist: './examples/pug-boilerplate/dist/css/',
js: './examples/pug-boilerplate/src/js/app.js',
jsDist: './examples/pug-boilerplate/dist/js/',
html: './examples/pug-boilerplate/src/pug/',
htmlDist: './examples/pug-boilerplate/dist',
staticFolders: [],
assembleStyles: './examples/pug-boilerplate/dist/css/app.css',
production: false,
debug: true,
onBuildComplete: () => {
		console.log('\n✓ Build completed');
		const fs = require('fs');
		console.log('HTML:', fs.existsSync('./examples/pug-boilerplate/dist/index.html'));
		console.log('CSS:', fs.existsSync('./examples/pug-boilerplate/dist/css/app.css'));
		console.log('JS:', fs.existsSync('./examples/pug-boilerplate/dist/js/app.js'));
		process.exit(0);
	},
	onError: () => {
		console.log('\n✗ Build error');
		process.exit(1);
	},
});
