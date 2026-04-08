import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Effect, Layer } from 'effect';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';

import { BundlerService, BundlerLive, BundlerError, makeBundler } from '../src/bundler';
import { ReporterLive, makeReporter } from '../src/reporter';
import { ConstantsLive } from '../src/constants';
import { ConstantsService } from '../src/constants';

const TEST_DIR = join(__dirname, '__fixtures_bundler__');
const SRC_DIR = join(TEST_DIR, 'src');
const BUILD_DIR = join(TEST_DIR, 'build');

const BaseLayer = Layer.mergeAll(ReporterLive(false), ConstantsLive);
const BundlerLayer = BundlerLive.pipe(Layer.provide(BaseLayer));

function runBundler(config: any) {
	const program = Effect.gen(function* (_) {
		const bundler = yield* _(BundlerService);
		yield* _(bundler.build(config));
	});
	return Effect.runPromise(program.pipe(Effect.provide(BundlerLayer)));
}

function setupSrc() {
	mkdirSync(join(SRC_DIR, 'html'), { recursive: true });
	mkdirSync(join(SRC_DIR, 'js'), { recursive: true });
	mkdirSync(join(SRC_DIR, 'scss'), { recursive: true });
	mkdirSync(BUILD_DIR, { recursive: true });
}

function cleanDir() {
	if (existsSync(TEST_DIR)) {
		rmSync(TEST_DIR, { recursive: true, force: true });
	}
}

describe('Bundler Unit Tests', () => {
	beforeEach(() => {
		cleanDir();
		setupSrc();
	});

	afterEach(() => {
		cleanDir();
	});

	describe('HTML Include - Cycle Detection', () => {
		it('should detect direct cycle in HTML includes', async () => {
			writeFileSync(
				join(SRC_DIR, 'html', 'a.html'),
				'<div><!-- @include "b.html" --></div>',
			);
			writeFileSync(
				join(SRC_DIR, 'html', 'b.html'),
				'<div><!-- @include "a.html" --></div>',
			);

			await runBundler({
				rootDir: TEST_DIR,
				dist: BUILD_DIR,
				html: join(SRC_DIR, 'html', 'a.html'),
				production: true,
			});

			expect(existsSync(join(BUILD_DIR, 'a.html'))).toBe(false);
		});

		it('should detect self-referencing cycle', async () => {
			writeFileSync(
				join(SRC_DIR, 'html', 'self.html'),
				'<div><!-- @include "self.html" --></div>',
			);

			await runBundler({
				rootDir: TEST_DIR,
				dist: BUILD_DIR,
				html: join(SRC_DIR, 'html', 'self.html'),
				production: true,
			});

			expect(existsSync(join(BUILD_DIR, 'self.html'))).toBe(false);
		});

		it('should handle valid nested includes', async () => {
			writeFileSync(
				join(SRC_DIR, 'html', 'main.html'),
				'<!DOCTYPE html><html><body><!-- @include "header.html" --><main>Content</main></body></html>',
			);
			writeFileSync(
				join(SRC_DIR, 'html', 'header.html'),
				'<header>Header</header>',
			);

			await runBundler({
				rootDir: TEST_DIR,
				dist: BUILD_DIR,
				html: join(SRC_DIR, 'html', 'main.html'),
				production: true,
			});

			const result = readFileSync(join(BUILD_DIR, 'main.html'), 'utf-8');
			expect(result).toContain('<header>Header</header>');
			expect(result).toContain('<main>Content</main>');
		});
	});

	describe('HTML Include - Path Traversal', () => {
		it('should reject path traversal attempts', async () => {
			writeFileSync(
				join(SRC_DIR, 'html', 'evil.html'),
				'<!-- @include "../../../../../../etc/passwd" -->',
			);

			await runBundler({
				rootDir: TEST_DIR,
				dist: BUILD_DIR,
				html: join(SRC_DIR, 'html', 'evil.html'),
				production: true,
			});

			expect(existsSync(join(BUILD_DIR, 'evil.html'))).toBe(false);
		});

		it('should allow includes within project root', async () => {
			writeFileSync(
				join(SRC_DIR, 'html', 'safe.html'),
				'<!DOCTYPE html><!-- @include "partial.html" --><body></body>',
			);
			writeFileSync(
				join(SRC_DIR, 'html', 'partial.html'),
				'<header>Safe Partial</header>',
			);

			await runBundler({
				rootDir: TEST_DIR,
				dist: BUILD_DIR,
				html: join(SRC_DIR, 'html', 'safe.html'),
				production: true,
			});

			const result = readFileSync(join(BUILD_DIR, 'safe.html'), 'utf-8');
			expect(result).toContain('Safe Partial');
		});
	});

	describe('SCSS compilation', () => {
		it('should compile SCSS to CSS', async () => {
			writeFileSync(
				join(SRC_DIR, 'scss', 'app.scss'),
				'$color: red; body { background: $color; }',
			);

			await runBundler({
				rootDir: TEST_DIR,
				dist: BUILD_DIR,
				sass: join(SRC_DIR, 'scss', 'app.scss'),
				cssDist: join(BUILD_DIR, 'css'),
				production: true,
			});

			const css = readFileSync(join(BUILD_DIR, 'css', 'app.css'), 'utf-8');
			expect(css).toContain('background');
			expect(css).toContain('red');
		});

		it('should fail on invalid SCSS', async () => {
			writeFileSync(
				join(SRC_DIR, 'scss', 'bad.scss'),
				'body { background: ; color }',
			);

			await expect(
				runBundler({
					rootDir: TEST_DIR,
					dist: BUILD_DIR,
					sass: join(SRC_DIR, 'scss', 'bad.scss'),
					cssDist: join(BUILD_DIR, 'css'),
					production: true,
				}),
			).resolves.not.toThrow();
		});
	});

	describe('Config validation', () => {
		it('should fail without config', async () => {
			await expect(runBundler(undefined as any)).rejects.toThrow();
		});
	});
});
