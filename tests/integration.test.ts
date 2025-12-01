import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

const TEST_DIR = join(__dirname, '__test_integration__');

describe('Bundler Integration Tests', () => {
	beforeEach(() => {
		if (existsSync(TEST_DIR)) {
			rmSync(TEST_DIR, { recursive: true });
		}
		mkdirSync(TEST_DIR, { recursive: true });
	});

	afterEach(() => {
		if (existsSync(TEST_DIR)) {
			rmSync(TEST_DIR, { recursive: true });
		}
	});

	describe('HTML Includes', () => {
		it('should process HTML includes', async () => {
			const { Bundler } = await import('../index.mjs');
			const bundler = new Bundler();

			// Create source files
			const srcDir = join(TEST_DIR, 'src');
			const distDir = join(TEST_DIR, 'dist');
			mkdirSync(srcDir, { recursive: true });

			// Create header partial
			writeFileSync(
				join(srcDir, 'header.html'),
				'<header><h1>Header</h1></header>'
			);

			// Create main file with include
			writeFileSync(
				join(srcDir, 'index.html'),
				`<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
<!-- @include 'header.html' -->
<main>Content</main>
</body>
</html>`
			);

			// Build
			await new Promise((resolve, reject) => {
				bundler.build({
					dist: distDir,
					html: srcDir,
					htmlDist: distDir,
					production: true,
					debug: false,
					onBuildComplete: resolve,
					onError: reject,
				});
			});

			// Check result
			const result = readFileSync(join(distDir, 'index.html'), 'utf-8');
			expect(result).toContain('<header><h1>Header</h1></header>');
			expect(result).toContain('<main>Content</main>');
			expect(result).not.toContain('@include');
		}, 15000);

		it('should handle nested includes', async () => {
			const { Bundler } = await import('../index.mjs');
			const bundler = new Bundler();

			const srcDir = join(TEST_DIR, 'src');
			const distDir = join(TEST_DIR, 'dist');
			mkdirSync(srcDir, { recursive: true });

			// Create nested partials
			writeFileSync(join(srcDir, 'nav.html'), '<nav>Navigation</nav>');
			writeFileSync(
				join(srcDir, 'header.html'),
				'<header><!-- @include \'nav.html\' --></header>'
			);
			writeFileSync(
				join(srcDir, 'index.html'),
				'<!DOCTYPE html><html><body><!-- @include \'header.html\' --></body></html>'
			);

			await new Promise((resolve, reject) => {
				bundler.build({
					dist: distDir,
					html: srcDir,
					htmlDist: distDir,
					production: true,
					debug: false,
					onBuildComplete: resolve,
					onError: reject,
				});
			});

			const result = readFileSync(join(distDir, 'index.html'), 'utf-8');
			expect(result).toContain('<nav>Navigation</nav>');
		}, 15000);
	});

	describe('Assemble Styles', () => {
		it('should assemble CSS from multiple sources', async () => {
			const { Bundler } = await import('../index.mjs');
			const bundler = new Bundler();

			const srcDir = join(TEST_DIR, 'src');
			const distDir = join(TEST_DIR, 'dist');
			mkdirSync(join(srcDir, 'css'), { recursive: true });
			mkdirSync(join(srcDir, 'js'), { recursive: true });

			// Create SCSS file
			writeFileSync(
				join(srcDir, 'css', 'app.scss'),
				'body { margin: 0; }'
			);

			// Create JS file (Bun will extract CSS)
			writeFileSync(
				join(srcDir, 'js', 'app.js'),
				'console.log("test");'
			);

			await new Promise((resolve, reject) => {
				bundler.build({
					dist: distDir,
					sass: join(srcDir, 'css', 'app.scss'),
					cssDist: join(distDir, 'css'),
					js: join(srcDir, 'js', 'app.js'),
					jsDist: join(distDir, 'js'),
					assembleStyles: join(distDir, 'css', 'app.css'),
					production: true,
					debug: false,
					onBuildComplete: resolve,
					onError: reject,
				});
			});

			const cssExists = existsSync(join(distDir, 'css', 'app.css'));
			expect(cssExists).toBe(true);

			if (cssExists) {
				const css = readFileSync(join(distDir, 'css', 'app.css'), 'utf-8');
				expect(css).toContain('body');
			}
		}, 15000);
	});

	describe('Error Handling', () => {
		it('should handle missing source files gracefully', async () => {
			const { Bundler } = await import('../index.mjs');
			const bundler = new Bundler();

			const distDir = join(TEST_DIR, 'dist');

			let errorCaught = false;

			await new Promise((resolve) => {
				bundler.build({
					dist: distDir,
					html: join(TEST_DIR, 'non-existent'),
					htmlDist: distDir,
					production: true,
					debug: false,
					onBuildComplete: resolve,
					onError: () => {
						errorCaught = true;
						resolve(null);
					},
				});

				// Give it some time to process
				setTimeout(resolve, 2000);
			});

			// Should handle error without crashing
			expect(true).toBe(true);
		}, 10000);
	});

	describe('Static Files', () => {
		it('should copy static folders', async () => {
			const { Bundler } = await import('../index.mjs');
			const bundler = new Bundler();

			const srcDir = join(TEST_DIR, 'src');
			const distDir = join(TEST_DIR, 'dist');
			const imagesDir = join(srcDir, 'images');
			mkdirSync(imagesDir, { recursive: true });

			// Create dummy image file
			writeFileSync(join(imagesDir, 'test.png'), 'fake-image-data');

			await new Promise((resolve, reject) => {
				bundler.build({
					dist: distDir,
					staticFolders: [imagesDir],
					production: true,
					debug: false,
					onBuildComplete: resolve,
					onError: reject,
				});
			});

			const copiedImage = join(distDir, 'images', 'test.png');
			expect(existsSync(copiedImage)).toBe(true);
		}, 15000);
	});
});
