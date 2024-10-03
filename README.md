# Bun-Bundler: Modern, Simple, and Ultra-Fast HTML Bundler

[![Bun](https://img.shields.io/badge/Bun-Compatible-brightgreen.svg)](https://bun.sh/)
[![Node.js](https://img.shields.io/badge/Node.js-Compatible-brightgreen.svg)](https://nodejs.org/)

Bun-Bundler is a powerful and efficient HTML bundler designed for modern web development. It offers a comprehensive solution for bundling and optimizing your web projects, with support for various technologies and features that streamline your development workflow.

## Key Features

- **Pug / HTML** support for flexible templating
- **SCSS / CSS** preprocessing
- **JavaScript** bundling and optimization
- **SVG Sprite** generation
- **Image optimizations** for improved performance
- **Static assets** handling
- **Real-time file watching** and **hot reloading** for rapid development

## Why Choose Bun-Bundler?

Bun-Bundler was created to address the limitations of other popular bundlers. It offers:

- **Efficiency**: Ultra-fast bundling and optimization processes
- **Flexibility**: Easy integration with other Node.js scripts and modules
- **Scalability**: Suitable for both small projects and large-scale websites
- **PUG Support**: Built-in support for the PUG templating engine, enabling efficient front-end development

## Quick Start

### Installation

`npm install bun-bundler`

or

`bun add bun-bundler`

### Basic Configuration

Create a `build.mjs` file in your project root with the following content:

```javascript
import path from 'path';
import { Bundler } from 'bun-bundler';
import { SpriteBuilder, ImageProcessor, Server } from 'bun-bundler/modules';

const bundler = new Bundler();
const spriteBuilder = new SpriteBuilder();
const imgProcessor = new ImageProcessor();

// Define your project structure
const src = path.resolve('./src');
const dist = path.resolve('./build');

const directories = {
	src: src,
	html: path.resolve(src, './pug/pages/'),
	sass: [path.resolve(src, './scss/app.scss')],
	js: [path.resolve(src, './js/app.js')],
	images: path.resolve(src, './images/'),
	fonts: path.resolve(src, './fonts/'),
	statics: path.resolve(src, './static/'),

	dist: dist,
	htmlDist: dist,
	cssDist: path.resolve(dist, './css/'),
	jsDist: path.resolve(dist, './js/'),
	imagesDist: path.resolve(dist, './images/'),
	spriteDist: path.resolve(dist, './images/sprite'),
};

const { images, fonts, statics } = directories;

// Configure the bundler
bundler.build({
	...directories,
	// ❇️ You can pass function(it will call on every render), or array of files
	html: () => Bundler.utils.getDirFiles(directories.html),
	staticFolders: [images, fonts, statics],
	production: process.env.NODE_ENV === 'production',
	onBuildComplete: () => {
		imgProcessor.process({ root: directories.imagesDist });
		spriteBuilder.build({
			htmlDir: directories.dist,
			dist: directories.spriteDist,
		});
	},
});
```

We're ready to takeoff! Run `bun run build.mjs`

## Development Mode

To enable file watching and dev-mode, use the following configuration:
`dev.mjs`

```javascript
const debugMode = false;
const server = new Server();

bundler.watch({
	...directories,
	production: process.env.NODE_ENV === 'production',
	staticFolders: [images, fonts, statics],
	debug: debugMode,
	html: () => Bundler.utils.getDirFiles(directories.html),
	onStart: () => {
		server.startServer({
			open: true,
			debug: debugMode,
			port: 8080,
			root: dist,
			❇️ // custom BrowserSync config, if needed:
			overrides: {},
		});
	},
	onBuildComplete: () => {
		// ❇️ image optimizations on every build (no caching)
		imgProcessor.process({
			debug: debugMode,
			root: directories.imagesDist,
		});
		// ❇️ refresh sprite on every build (no caching)
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

Run `bun run dev.mjs`

## Examples and Boilerplate

- Check the `./examples` directory in the repository to see Bun-Bundler in action.
- For a production-ready boilerplate, visit [Glivera Bun Template](https://github.com/glivera-team/glivera-bun-template).

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests to help improve Bun-Bundler.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the Bun-Bundler team. Happy bundling!
