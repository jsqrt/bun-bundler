# Bun-Bundler: Modern, Simple, and Ultra-Fast HTML Bundler

[![Bun](https://img.shields.io/badge/Bun-Compatible-brightgreen.svg)](https://bun.sh/)
[![Node.js](https://img.shields.io/badge/Node.js-Compatible-brightgreen.svg)](https://nodejs.org/)

Bun-Bundler is a powerful and efficient HTML bundler designed for modern web development. It offers a comprehensive solution for bundling and optimizing your web projects, with support for various technologies and features that streamline your development workflow.

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

Create file `dev.js`

```javascript
import { Bundler } from 'bun-bundler';
import { Server } from 'bun-bundler/modules';
const bundler = new Bundler();
const server = new Server();

bundler.watch({
	src: './src',
	html: './src/html/',
	sass: './src/css/app.css',
	js: './src/js/app.js',
	dist: './dist',
	htmlDist: './dist',
	cssDist: './dist/css/',
	jsDist: './dist/js/',
	staticFolders: ['./src/images/', './src/fonts/', './src/static/'],
	onStart: () => {
		server.startServer({
			root: dist,
			open: true,
			debug: false,
			port: 8080,
		});
	},
	onCriticalError: () => server.stopServer(),
});
```

Then run it `npm run dev.js` or `bun dev.js`

## Production bundling example (Minification & Optimizations)

Create file `build.js`

```javascript
import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder(); // optional
const imgProcessor = new ImageProcessor(); // optional

bundler.build({
	src: './src',
	html: './src/html/',
	sass: './src/css/app.css',
	js: './src/js/app.js',
	dist: './build',
	htmlDist: './build',
	cssDist: './build/css/',
	jsDist: './build/js/',
	staticFolders: ['./src/images/', './src/fonts/', './src/static/'],
	production: true,
	debug: false,
	onBuildComplete: () => {
		imgProcessor.process({ root: './build/images/' });
		spriteBuilder.build({
			htmlDir: './build/',
			dist: './build/images/sprite/',
		});
		// optional
	},
});
```

We're ready to takeoff! Run `npm run build.js` or `bun build.js`

## Examples and Boilerplate

- Check the `./examples` directory in the repository to see Bun-Bundler in action.
- For a production-ready boilerplate, visit [Glivera Bun Template](https://github.com/glivera-team/glivera-bun-template).

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests to help improve Bun-Bundler.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the Bun-Bundler team. Happy bundling!
