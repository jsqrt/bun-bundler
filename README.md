## Modern, simple and ultra fast HTML bundler [Bun | Node.js compatible]

The reason this bundler exists is due to the significant shortcomings of other popular bundlers.
A key feature is its support for PUG, a templating engine that enables efficient front-end development.
These scripts are suitable for both small projects and large-scale websites.
You can easily integrate the modules you need and combine Bun-bundler with other Node.js scripts,
offering flexibility and customization for your development workflow.
Feel free to add issues 👾

## Features

- Pug / HTML
- SCSS / CSS
- JS
- SVG Sprite
- Image optimizations
- Static assets
- Realtime file watching and hot reloading

## Basic configuration ✨

```javascript
import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const src = path.resolve('./src');
const dist = path.resolve('./build');
const images = ;

const directories = {
	src: src,
	html: path.resolve(src, './pug/pages/'),
	sass: [path.resolve(src, './scss/app.scss')],
	js: [path.resolve(src, './js/app.js')],
	images: path.resolve(src, './images/'),
	fonts: path.resolve(src, './fonts/'),
	static: path.resolve(src, './static/'),

	dist: dist,
	htmlDist: dist,
	cssDist: path.resolve(dist, './css/'),
	jsDist: path.resolve(dist, './js/'),
	imagesDist: path.resolve(dist, './images/'),
	spriteDist: path.resolve(dist, './images/sprite'),
};

bundler.build({
	...directories,
	// you can pass function(it will call on every render), or array of files
	html: () => Bundler.utils.getDirFiles(directories.html),
	// folders/files to copy into dist root
	staticFolders: [
		images,
		fonst,
		static,
	],
	// affects on file-minifications in dist
	production: process.env.NODE_ENV === 'production',
	onBuildComplete: () => {
		// image optimizations on every build (no caching)
		imgProcessor.process({
			root: directories.imagesDist,
		});
		// refresh sprite on every build (no caching)
		spriteBuilder.build({
			htmlDir: directories.dist,
			dist: directories.spriteDist,
		});
	},
});
```

👀 Check ./examples to see how fast this is.

## File watching and dev-mode:

```javascript
const debugMode = false;
const server = new Server();

bundler.watch({
	...directories,
	production: process.env.NODE_ENV === 'production',
	debug: debugMode, // optional
	html: () => Bundler.utils.getDirFiles(directories.html),
	onStart: () => {
		server.startServer({
			open: true,
			debug: debugMode,
			port: 8080,
			root: dist,
			overrides: {}, // custom BrowserSync config, if needed
		});
	},
	onBuildComplete: () => {
		// ❇️ Ultra flexible to integrate your packages.
		// image optimizations on every build (no caching)
		imgProcessor.process({
			debug: debugMode,
			root: directories.imagesDist,
		});
		// refresh sprite on every build (no caching)
		spriteBuilder.build({
			debug: debugMode,
			htmlDir: dist,
			dist: directories.spriteDist,
		});
	},
	onCriticalError: () => {
		server.stopServer();
	},
});
```

##

## Real example of production boilerplane - [Glivera Bun Template](https://github.com/glivera-team/glivera-bun-template)

##
