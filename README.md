# Bun-Bundler: Simple and Ultra-Fast HTML Bundler

[![Bun](https://img.shields.io/badge/Bun-Compatible-brightgreen.svg)](https://bun.sh/)
[![Node.js](https://img.shields.io/badge/Node.js-Compatible-brightgreen.svg)](https://nodejs.org/)

Bun-Bundler is a powerful and efficient Markup bundler designed for powerful devs. 
It offers a comprehensive solution for bundling and optimizing your web projects, 
with support for various technologies and features that streamline your development workflow.

## Key Features

- **Pug / HTML** templating
- **SCSS / CSS** preprocessing
- **JavaScript** bundling and optimization
- **SVG Sprite** generation
- **Image optimizations** for improved performance
- **Static assets** handling
- **Real-time file watching** and **hot reloading** for rapid development

## Quick Start

### Installation

Bun-Bundler works great with both Bun and Node.js. Install Bun-Bundler using npm or Bun:

`npm install bun-bundler`
or
`bun add bun-bundler`

## Dev bundling example (File watching & Hot Reload)

1. Create file `dev.js`, or name it whatever you want.
2. Here's the full config below that you can use as a template.

```javascript
import Bundler from 'bun-bundler';
import { ImageProcessor, Server, SpriteBuilder } from 'bun-bundler/modules';

const bundler = new Bundler();
const server = new Server();
const spriteBuilder = new SpriteBuilder(); // optional
const imgProcessor = new ImageProcessor(); // optional

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
	debug: false,
	onStart: () => {
		server.startServer({
			root: './dist',
			open: true,
			debug: false,
			port: 8080,
			overrides: {},
		});
	},
	onBuildComplete: () => {
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
	},
	onWatchUpdate: () => {},
	onCriticalError: () => server.stopServer(),
});
```

3. Run it `npm run dev.js` or `bun dev.js`

## Production bundling example (Minification & Optimizations)

Same config, but with production setup

1. File `build.js`

```javascript
import Bundler from 'bun-bundler';
import { ImageProcessor, SpriteBuilder } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder(); // optional
const imgProcessor = new ImageProcessor(); // optional

bundler.build({
	dist: './build',
	// sass/css bundling
	sass: './src/css/app.css',
	cssDist: './build/css/',
	// js bundling
	js: './src/js/app.js',
	jsDist: './build/js/',
	// html/pug bundling
	html: './src/html/',
	htmlDist: './build',
	staticFolders: [
		// static assets bundling
		'./src/images/',
		'./src/fonts/',
		'./src/static/',
	],
	assembleStyles: './build/css/app.css', // imported styles form JS goes here
	production: true,
	debug: false,
	onStart: () => {},
	onBuildComplete: () => {
		imgProcessor.start({
			debug: false,
			entry: './build/images',
		});
		spriteBuilder.start({
			debug: false,
			dist: './build/images/sprite/sprite.svg',
			entry: './build/', // detect SVG in html files here
			spriteIconSelector: 'svg[data-sprite-icon]',
			additionalIcons: './src/images/facebook.svg', // inline icons, you want to add
		});
	},
	onWatchUpdate: () => {},
	onCriticalError: () => {},
});
```

2. We're ready to takeoff, run `npm run build.js` or `bun build.js`

## Examples and Boilerplate

- Check the `./examples` directory in the repository to see Bun-Bundler in action.
- For a production-ready boilerplate, visit [Glivera Bun Template](https://github.com/glivera-team/glivera-bun-template).

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests to help improve Bun-Bundler.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the Bun-Bundler team. Happy bundling!
