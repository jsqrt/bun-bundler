## Modern, simple and ultra fast HTML bundler.

## Features.

- Pug / HTML
- SCSS / CSS
- JS
- SVG Sprite
- Image optimizations
- Static assets
- Realtime file watching and hot reloading

## Build example.

```javascript
import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

const dist = path.resolve('./build');
const src = path.resolve('./src');
const debugMode = false;

bundler.build({
	production: process.env.NODE_ENV === 'production',
	debug: debugMode,
	html: () => Bundler.utils.getDirFiles(`${src}/pug/pages/`),
	sass: [`${src}/scss/app.scss`],
	js: [`${src}/js/app.js`],
	staticFolders: [`${src}/images/`, `${src}/fonts/`, `${src}/static/`],
	dist,
	htmlDist: dist,
	cssDist: `${dist}/css/`,
	jsDist: `${dist}/js/`,
	onBuildComplete: () => {
		imgProcessor.process({
			debug: debugMode,
			root: `${dist}/images/`,
		});
		spriteBuilder.build({
			debug: debugMode,
			htmlDir: dist,
			dist: `${dist}/images/sprite/`,
		});
	},
	onCriticalError: () => {},
});
```

## Dev build & watch example.

```javascript
import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, Server, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const server = new Server();
const imgProcessor = new ImageProcessor();

const dist = path.resolve('./dev-dist');
const src = path.resolve('./src');
const debugMode = false;

bundler.watch({
	production: process.env.NODE_ENV === 'production',
	debug: debugMode,
	html: () => Bundler.utils.getDirFiles(`${src}/pug/pages/`),
	sass: [`${src}/scss/app.scss`],
	js: [`${src}/js/app.js`],
	staticFolders: [`${src}/images/`, `${src}/fonts/`, `${src}/static/`],
	dist,
	htmlDist: dist,
	cssDist: `${dist}/css/`,
	jsDist: `${dist}/js/`,
	onStart: () => {
		server.startServer({
			open: true,
			debug: debugMode,
			port: 8080,
			root: dist,
		});
	},
	onBuildComplete: () => {
		imgProcessor.process({
			debug: debugMode,
			root: `${dist}/images/`,
		});
		spriteBuilder.build({
			debug: debugMode,
			htmlDir: dist,
			dist: `${dist}/images/sprite/`,
		});
	},
	onCriticalError: () => {
		server.stopServer();
	},
});
```

##

## You can find complete template in [Glivera Bun Template](https://github.com/glivera-team/glivera-bun-template)

##
