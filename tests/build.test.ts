import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

const HTML_BOILERPLATE = join(__dirname, '../examples/html-boilerplate');
const PUG_BOILERPLATE = join(__dirname, '../examples/pug-boilerplate');

function runCommand(cwd: string, command: string, args: string[]): Promise<{ code: number; output: string }> {
	return new Promise((resolve) => {
		const proc = spawn(command, args, { cwd, shell: true });
		let output = '';

		proc.stdout?.on('data', (data) => {
			output += data.toString();
		});

		proc.stderr?.on('data', (data) => {
			output += data.toString();
		});

		proc.on('close', (code) => {
			resolve({ code: code || 0, output });
		});
	});
}

function runDevWatch(cwd: string, timeoutMs: number): Promise<{ output: string }> {
	return new Promise((resolve) => {
		const proc = spawn('npm', ['run', 'dev'], { cwd, shell: true });
		let output = '';

		proc.stdout?.on('data', (data) => {
			output += data.toString();
		});

		proc.stderr?.on('data', (data) => {
			output += data.toString();
		});

		setTimeout(() => {
			proc.kill('SIGTERM');
			setTimeout(() => {
				if (!proc.killed) {
					proc.kill('SIGKILL');
				}
				resolve({ output });
			}, 500);
		}, timeoutMs);
	});
}

describe('HTML Boilerplate', () => {
	const buildDir = join(HTML_BOILERPLATE, 'build');
	const distDir = join(HTML_BOILERPLATE, 'dist');

	beforeAll(() => {
		// Clean up
		if (existsSync(buildDir)) rmSync(buildDir, { recursive: true });
		if (existsSync(distDir)) rmSync(distDir, { recursive: true });
	});

	afterAll(() => {
		// Clean up after tests
		if (existsSync(buildDir)) rmSync(buildDir, { recursive: true });
		if (existsSync(distDir)) rmSync(distDir, { recursive: true });
	});

	it('should build production successfully', async () => {
		const result = await runCommand(HTML_BOILERPLATE, 'npm', ['run', 'build']);

		expect(result.code).toBe(0);
		expect(result.output).toContain('Done');

		// Check build directory exists
		expect(existsSync(buildDir)).toBe(true);

		// Check main files exist
		expect(existsSync(join(buildDir, 'index.html'))).toBe(true);
		expect(existsSync(join(buildDir, 'css/app.css'))).toBe(true);
		expect(existsSync(join(buildDir, 'js/app.js'))).toBe(true);

		// Check HTML content
		const html = readFileSync(join(buildDir, 'index.html'), 'utf-8');
		expect(html).toContain('<!DOCTYPE html>');
		expect(html).toContain('Bun bundler simple HTML example');
		expect(html).toContain('./css/app.css');
		expect(html).toContain('./js/app.js');

		// Check JS is minified
		const js = readFileSync(join(buildDir, 'js/app.js'), 'utf-8');
		expect(js).toContain('console.log');

		// Check CSS exists and has content
		const css = readFileSync(join(buildDir, 'css/app.css'), 'utf-8');
		expect(css.length).toBeGreaterThan(0);

		// Check images optimized
		expect(existsSync(join(buildDir, 'images/alive.webp'))).toBe(true);
	}, 30000);

	it('should start dev watch mode and generate files', async () => {
		const result = await runDevWatch(HTML_BOILERPLATE, 5000);

		expect(result.output).toContain('Building');
		expect(result.output).toContain('Done');
		expect(result.output).toContain('👀 http://localhost:'); // Port may vary (8080, 8081, etc.)

		// Check dist directory was created
		expect(existsSync(distDir)).toBe(true);
		expect(existsSync(join(distDir, 'index.html'))).toBe(true);
		expect(existsSync(join(distDir, 'css/app.css'))).toBe(true);
		expect(existsSync(join(distDir, 'js/app.js'))).toBe(true);

		// Check HTML content in dev mode
		const html = readFileSync(join(distDir, 'index.html'), 'utf-8');
		expect(html).toContain('<!DOCTYPE html>');
		expect(html).toContain('Bun bundler simple HTML example');
	}, 15000);
});

describe('Pug Boilerplate', () => {
	const buildDir = join(PUG_BOILERPLATE, 'build');
	const distDir = join(PUG_BOILERPLATE, 'dist');

	beforeAll(() => {
		// Clean up
		if (existsSync(buildDir)) rmSync(buildDir, { recursive: true });
		if (existsSync(distDir)) rmSync(distDir, { recursive: true });
	});

	afterAll(() => {
		// Clean up after tests
		if (existsSync(buildDir)) rmSync(buildDir, { recursive: true });
		if (existsSync(distDir)) rmSync(distDir, { recursive: true });
	});

	it('should build production successfully', async () => {
		const result = await runCommand(PUG_BOILERPLATE, 'npm', ['run', 'build']);

		expect(result.code).toBe(0);
		expect(result.output).toContain('Done');

		// Check build directory exists
		expect(existsSync(buildDir)).toBe(true);

		// Check main files exist
		expect(existsSync(join(buildDir, 'index.html'))).toBe(true);
		expect(existsSync(join(buildDir, 'css/app.css'))).toBe(true);
		expect(existsSync(join(buildDir, 'js/app.js'))).toBe(true);

		// Check Pug was compiled to HTML
		const html = readFileSync(join(buildDir, 'index.html'), 'utf-8');
		expect(html).toContain('<!DOCTYPE html>');
		expect(html).toContain('Bun bundler simple PUG example');
		expect(html).toContain('./css/app.css');
		expect(html).toContain('./js/app.js');

		// Check SCSS was compiled to CSS and minified
		const css = readFileSync(join(buildDir, 'css/app.css'), 'utf-8');
		expect(css).toContain('background-color');
		expect(css.length).toBeGreaterThan(0);

		// Check JS is compiled
		const js = readFileSync(join(buildDir, 'js/app.js'), 'utf-8');
		expect(js).toContain('console.log');

		// Check images optimized to webp
		expect(existsSync(join(buildDir, 'images/alive.webp'))).toBe(true);

		// Check SVG sprite was created
		expect(existsSync(join(buildDir, 'images/sprite/sprite.svg'))).toBe(true);
		const sprite = readFileSync(join(buildDir, 'images/sprite/sprite.svg'), 'utf-8');
		expect(sprite).toContain('<svg');
		expect(sprite).toContain('symbol');
	}, 30000);

	it('should start dev watch mode and compile Pug', async () => {
		const result = await runDevWatch(PUG_BOILERPLATE, 5000);

		expect(result.output).toContain('Building');
		expect(result.output).toContain('Done');
		expect(result.output).toContain('👀 http://localhost:'); // Port may vary (8080, 8081, etc.)

		// Check dist directory was created
		expect(existsSync(distDir)).toBe(true);
		expect(existsSync(join(distDir, 'index.html'))).toBe(true);
		expect(existsSync(join(distDir, 'css/app.css'))).toBe(true);
		expect(existsSync(join(distDir, 'js/app.js'))).toBe(true);

		// Check Pug compiled in dev mode
		const html = readFileSync(join(distDir, 'index.html'), 'utf-8');
		expect(html).toContain('<!DOCTYPE html>');
		expect(html).toContain('Bun bundler simple PUG example');

		// Check SCSS compiled in dev mode
		const css = readFileSync(join(distDir, 'css/app.css'), 'utf-8');
		expect(css.length).toBeGreaterThan(0);
	}, 15000);
});
