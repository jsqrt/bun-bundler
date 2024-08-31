## Modern, simple and ultra fast HTML bundler [Bun | Node.js compatible].

The reason this bundler exists is due to the significant shortcomings of other popular bundlers. 
A key feature is its support for PUG, a templating engine that enables efficient front-end development. 
These scripts are suitable for both small projects and large-scale websites. 
You can easily integrate the modules you need and combine Bun-bundler with other Node.js scripts, 
offering flexibility and customization for your development workflow.
Feel free to add issues, or ask directly <a href="https://t.me/tsqrt">t.me/jsqrt</a>

## Features.
- Pug / HTML
- SCSS / CSS
- JS
- SVG Sprite
- Image optimizations
- Static assets
- Realtime file watching and hot reloading

## Let`s get started: imports ❇️

```javascript
import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();
const src = path.resolve('./src');
```

## Build scripts example - ultra flexible ✨

```javascript
const dist = path.resolve('./build');

bundler.build({
	production: process.env.NODE_ENV === 'production',
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
			root: `${dist}/images/`,
		});
		spriteBuilder.build({
			htmlDir: dist,
			dist: `${dist}/images/sprite/`,
		});
	},
});
```

## Now we ready to watch 👀

```javascript
const server = new Server();
const dist = path.resolve('./dev-dist');

bundler.watch({
	production: process.env.NODE_ENV === 'production',
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
			debug: false,
			port: 8080,
			root: dist,
		});
	},
	onBuildComplete: () => {
		imgProcessor.process({
			debug: false,
			root: `${dist}/images/`,
		});
		spriteBuilder.build({
			debug: false,
			htmlDir: dist,
			dist: `${dist}/images/sprite/`,
		});
	},
	onCriticalError: () => {
		server.stopServer();
	},
	debug: false,
});
```

##

## You can find full example of production template in [Glivera Bun Template](https://github.com/glivera-team/glivera-bun-template)

##
