# bun-bundler

[![Bun](https://img.shields.io/badge/Bun-%3E%3D1.0.0-f472b6.svg)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A fast, zero-config-friendly bundler for HTML/Pug, SCSS/CSS, and JavaScript projects. Built on [Bun](https://bun.sh/) runtime with [Effect](https://effect.website/) under the hood.

## Features

- **HTML & Pug** templating with includes and layouts
- **SCSS & CSS** compilation with autoprefixer
- **JavaScript** bundling and minification (via Bun.build)
- **SVG sprite** generation from inline icons
- **Image optimization** with parallel processing (worker pool) and file caching
- **Static assets** copying (fonts, images, etc.)
- **Dev server** with hot reload (browser-sync)
- **File watching** with incremental rebuilds
- **JSON config** support — run via CLI without writing JS

## Installation

```bash
bun add bun-bundler
```

## Usage

### Option 1: JavaScript API

Create a script file (e.g. `build.js` or `dev.js`) and import the classes:

**Production build:**

```javascript
import Bundler from 'bun-bundler';
import { ImageProcessor, SpriteBuilder } from 'bun-bundler/modules';

const bundler = new Bundler();
const imgProcessor = new ImageProcessor();
const spriteBuilder = new SpriteBuilder();

bundler.build({
  dist: './build',
  sass: './src/scss/app.scss',
  cssDist: './build/css/',
  js: './src/js/app.js',
  jsDist: './build/js/',
  html: './src/pug/',
  htmlDist: './build',
  staticFolders: ['./src/images/', './src/fonts/', './src/static/'],
  assembleStyles: './build/css/app.css',
  production: true,
  onBuildComplete: () => {
    imgProcessor.start({ entry: './build/images' });
    spriteBuilder.start({
      dist: './build/images/sprite/sprite.svg',
      entry: './build/',
      spriteIconSelector: 'svg[data-sprite-icon]',
    });
  },
});
```

**Development with watch & server:**

```javascript
import Bundler from 'bun-bundler';
import { ImageProcessor, Server, SpriteBuilder } from 'bun-bundler/modules';

const bundler = new Bundler();
const server = new Server();
const imgProcessor = new ImageProcessor();
const spriteBuilder = new SpriteBuilder();

let serverStarted = false;

bundler.watch({
  dist: './dist',
  sass: './src/scss/app.scss',
  cssDist: './dist/css/',
  js: './src/js/app.js',
  jsDist: './dist/js/',
  html: './src/pug/',
  htmlDist: './dist',
  staticFolders: ['./src/images/', './src/fonts/', './src/static/'],
  assembleStyles: './dist/css/app.css',
  debug: true,
  onBuildComplete: () => {
    if (!serverStarted) {
      server.startServer({ root: './dist', open: true, port: 8080 });
      serverStarted = true;
    }
  },
  onUpdate: ({ changes }) => {
    if (changes.staticFolders) {
      imgProcessor.start({ entry: './dist/images' });
      spriteBuilder.start({
        dist: './dist/images/sprite/sprite.svg',
        entry: './dist/',
        spriteIconSelector: 'svg[data-sprite-icon]',
      });
    }
  },
  onError: () => server.stopServer(),
});
```

Run with:
```bash
bun run build.js
bun run dev.js
```

### Option 2: JSON Config + CLI

Define your config in a JSON file and run it directly — no JS scripts needed.

**bundler.build.json:**

```json
{
  "mode": "build",
  "bundler": {
    "dist": "./build",
    "sass": "./src/scss/app.scss",
    "cssDist": "./build/css/",
    "js": "./src/js/app.js",
    "jsDist": "./build/js/",
    "html": "./src/pug/",
    "htmlDist": "./build",
    "staticFolders": ["./src/images/", "./src/fonts/", "./src/static/"],
    "assembleStyles": "./build/css/app.css",
    "production": true
  },
  "imageProcessor": {
    "entry": "./build/images"
  },
  "spriteBuilder": {
    "dist": "./build/images/sprite/sprite.svg",
    "entry": "./build/",
    "spriteIconSelector": "svg[data-sprite-icon]"
  }
}
```

**bundler.dev.json:**

```json
{
  "mode": "dev",
  "bundler": {
    "dist": "./dist",
    "sass": "./src/scss/app.scss",
    "cssDist": "./dist/css/",
    "js": "./src/js/app.js",
    "jsDist": "./dist/js/",
    "html": "./src/pug/",
    "htmlDist": "./dist",
    "staticFolders": ["./src/images/", "./src/fonts/", "./src/static/"],
    "assembleStyles": "./dist/css/app.css",
    "debug": true
  },
  "server": {
    "root": "./dist",
    "open": true,
    "port": 8080
  },
  "imageProcessor": {
    "entry": "./dist/images"
  },
  "spriteBuilder": {
    "dist": "./dist/images/sprite/sprite.svg",
    "entry": "./dist/",
    "spriteIconSelector": "svg[data-sprite-icon]"
  }
}
```

Run with CLI:
```bash
bunx bun-bundler bundler.build.json
bunx bun-bundler bundler.dev.json
```

Or with a default config name (`bundler.config.json`):
```bash
bunx bun-bundler
```

## Configuration Reference

### Bundler

| Option | Type | Description |
|---|---|---|
| `dist` | `string` | Output directory |
| `sass` | `string \| string[]` | SCSS/CSS entry file(s) |
| `cssDist` | `string` | CSS output directory |
| `js` | `string \| string[]` | JS entry file(s) |
| `jsDist` | `string` | JS output directory |
| `html` | `string \| string[]` | HTML/Pug source directory or file(s) |
| `htmlDist` | `string` | HTML output directory |
| `staticFolders` | `string[]` | Directories to copy as static assets |
| `assembleStyles` | `string` | Path to merge JS-imported styles into |
| `production` | `boolean` | Enable minification and optimizations |
| `debug` | `boolean` | Verbose logging |

### Image Processor

| Option | Type | Default | Description |
|---|---|---|---|
| `entry` | `string` | — | Directory with images to optimize |
| `outputFormat` | `string` | `'webp'` | Output format: `webp`, `avif`, `png`, `jpeg` |
| `scale` | `number` | `1` | Scale factor for resizing |
| `resize` | `{ x, y }` | — | Exact target dimensions |
| `keepOriginals` | `boolean` | `false` | Keep original files after conversion |
| `useCache` | `boolean` | `true` | Cache processed images by content hash |
| `concurrency` | `number` | auto | Worker pool size (defaults to CPU cores / 2) |
| `reduceColors` | `boolean` | `false` | Reduce color palette |
| `fileTypes` | `string[]` | `['.png', '.jpg', '.jpeg']` | File extensions to process |

### Sprite Builder

| Option | Type | Description |
|---|---|---|
| `entry` | `string \| string[]` | Directories with HTML files to scan for SVG icons |
| `dist` | `string` | Output path for the SVG sprite file |
| `spriteIconSelector` | `string` | CSS selector to match inline SVG icons |
| `additionalIcons` | `string \| string[]` | Extra SVG files to include in the sprite |

### Server (dev mode)

| Option | Type | Default | Description |
|---|---|---|---|
| `root` | `string` | — | Directory to serve |
| `port` | `number` | `8080` | Server port |
| `open` | `boolean` | `false` | Open browser on start |

### Callbacks (JS API only)

| Callback | When |
|---|---|
| `onStart` | Before the build starts |
| `onBuildComplete` | After the build finishes |
| `onUpdate` | After a watched file changes (receives `{ changes }`) |
| `onError` | On build error |

## Project Structure

```
src/
├── bundler.ts          # Build orchestrator (watch, build)
├── bundler-types.ts    # Type definitions
├── compilers.ts        # Pug, SCSS, JS compilation
├── server.ts           # Dev server (browser-sync)
├── image-processor.ts  # Image optimization orchestrator
├── image-worker.ts     # Sharp worker for parallel processing
├── image-cache.ts      # Content-hash based caching
├── worker-pool.ts      # Generic typed worker pool
├── sprite-builder.ts   # SVG sprite generation
├── reporter.ts         # Console output & spinners
├── cli.ts              # JSON config CLI runner
├── constants.ts        # Shared constants
└── utils.ts            # File system utilities
```

## Examples

See working setups in:
- [`examples/html-boilerplate`](examples/html-boilerplate) — plain HTML + CSS
- [`examples/pug-boilerplate`](examples/pug-boilerplate) — Pug + SCSS

Both include JS scripts (`_scripts/`) and JSON configs for `build` and `dev` modes.

## License

MIT — see [LICENSE](LICENSE).
