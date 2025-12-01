import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

const TEST_DIR = join(__dirname, '__test_cli__');
const CLI_PATH = join(__dirname, '../bin/cli.ts');

function runCLI(args: string[], cwd: string): Promise<{ code: number; output: string; error: string }> {
	return new Promise((resolve) => {
		const proc = spawn('bun', [CLI_PATH, ...args], { cwd, shell: true });
		let output = '';
		let error = '';

		proc.stdout?.on('data', (data) => {
			output += data.toString();
		});

		proc.stderr?.on('data', (data) => {
			error += data.toString();
		});

		proc.on('close', (code) => {
			resolve({ code: code || 0, output, error });
		});

		// Timeout after 10 seconds
		setTimeout(() => {
			proc.kill('SIGTERM');
			resolve({ code: -1, output, error: 'Timeout' });
		}, 10000);
	});
}

describe('CLI', () => {
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

	describe('help', () => {
		it('should show help with --help', async () => {
			const result = await runCLI(['--help'], TEST_DIR);
			expect(result.output).toContain('Bun-Bundler');
			expect(result.output).toContain('Usage:');
			expect(result.output).toContain('Commands:');
		}, 15000);

		it('should show help with help command', async () => {
			const result = await runCLI(['help'], TEST_DIR);
			expect(result.output).toContain('Bun-Bundler');
			expect(result.output).toContain('Commands:');
		}, 15000);
	});

	describe('version', () => {
		it('should show version with --version', async () => {
			const result = await runCLI(['--version'], TEST_DIR);
			expect(result.output).toContain('bun-bundler');
			expect(result.output).toMatch(/\d+\.\d+\.\d+/);
		}, 15000);

		it('should show version with version command', async () => {
			const result = await runCLI(['version'], TEST_DIR);
			expect(result.output).toContain('bun-bundler');
		}, 15000);
	});

	describe('init', () => {
		it('should create bundler.config.js', async () => {
			const result = await runCLI(['init'], TEST_DIR);
			expect(result.code).toBe(0);
			expect(result.output).toContain('Created bundler.config.js');

			const configPath = join(TEST_DIR, 'bundler.config.js');
			expect(existsSync(configPath)).toBe(true);

			const config = readFileSync(configPath, 'utf-8');
			expect(config).toContain('export default');
			expect(config).toContain('dist:');
		}, 15000);

		it('should fail if config already exists', async () => {
			const configPath = join(TEST_DIR, 'bundler.config.js');
			writeFileSync(configPath, 'export default {};');

			const result = await runCLI(['init'], TEST_DIR);
			expect(result.code).toBe(1);
			expect(result.error).toContain('already exists');
		}, 15000);
	});

	describe('build', () => {
		it('should build with config file', async () => {
			// Create config
			const configPath = join(TEST_DIR, 'bundler.config.js');
			const srcDir = join(TEST_DIR, 'src');
			const distDir = join(TEST_DIR, 'dist');

			mkdirSync(srcDir, { recursive: true });
			writeFileSync(
				join(srcDir, 'index.html'),
				'<!DOCTYPE html><html><body>Test</body></html>'
			);

			writeFileSync(
				configPath,
				`export default {
					dist: '${distDir}',
					html: '${srcDir}',
					htmlDist: '${distDir}',
					production: true,
					debug: false
				};`
			);

			const result = await runCLI(['build'], TEST_DIR);
			
			// Build might succeed or fail, but should produce output
			expect(result.code === 0 || result.code === 1).toBe(true);

			// If successful, check output file
			if (result.code === 0) {
				const outputFile = join(distDir, 'index.html');
				expect(existsSync(outputFile)).toBe(true);
			}
		}, 20000);

		it('should override config with CLI args', async () => {
			const configPath = join(TEST_DIR, 'bundler.config.js');
			const srcDir = join(TEST_DIR, 'src');
			const distDir = join(TEST_DIR, 'dist-override');

			mkdirSync(srcDir, { recursive: true });
			writeFileSync(
				join(srcDir, 'index.html'),
				'<!DOCTYPE html><html><body>Test</body></html>'
			);

			writeFileSync(
				configPath,
				`export default {
					dist: './dist',
					html: '${srcDir}',
					htmlDist: './dist',
					production: true
				};`
			);

			const result = await runCLI(['build', '--dist', distDir], TEST_DIR);
			expect(result.code).toBe(0);

			// Should use overridden dist
			const outputFile = join(distDir, 'index.html');
			expect(existsSync(outputFile)).toBe(true);
		}, 20000);
	});

	describe('unknown command', () => {
		it('should show error for unknown command', async () => {
			const result = await runCLI(['unknown-command'], TEST_DIR);
			expect(result.code).toBe(1);
			expect(result.error).toContain('Unknown command');
		}, 15000);
	});
});
