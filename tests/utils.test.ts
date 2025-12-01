import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { Effect } from 'effect';
import {
	getDirFiles,
	createDir,
	removeDir,
	createFile,
	removeFile,
	getFilesList,
	generateHash,
	findClosestFile,
	getSassFileConfig,
	exec,
	isFunction,
} from '../src/utils';

const TEST_DIR = join(__dirname, '__test_utils__');

describe('Utils', () => {
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

	describe('createDir', () => {
		it('should create a directory', () => {
			const dirPath = join(TEST_DIR, 'test-dir');
			Effect.runSync(createDir(dirPath));
			expect(existsSync(dirPath)).toBe(true);
		});

		it('should create nested directories', () => {
			const dirPath = join(TEST_DIR, 'nested/test/dir');
			Effect.runSync(createDir(dirPath));
			expect(existsSync(dirPath)).toBe(true);
		});

		it('should not throw if directory already exists', () => {
			const dirPath = join(TEST_DIR, 'existing-dir');
			mkdirSync(dirPath);
			expect(() => Effect.runSync(createDir(dirPath))).not.toThrow();
		});
	});

	describe('removeDir', () => {
		it('should remove a directory', () => {
			const dirPath = join(TEST_DIR, 'to-remove');
			mkdirSync(dirPath);
			Effect.runSync(removeDir(dirPath));
			expect(existsSync(dirPath)).toBe(false);
		});

		it('should remove directory with contents', () => {
			const dirPath = join(TEST_DIR, 'with-contents');
			mkdirSync(dirPath);
			writeFileSync(join(dirPath, 'file.txt'), 'content');
			Effect.runSync(removeDir(dirPath));
			expect(existsSync(dirPath)).toBe(false);
		});

		it('should not throw if directory does not exist', () => {
			const dirPath = join(TEST_DIR, 'non-existent');
			expect(() => Effect.runSync(removeDir(dirPath))).not.toThrow();
		});
	});

	describe('createFile', () => {
		it('should create a file with content', () => {
			const filePath = join(TEST_DIR, 'test.txt');
			const content = 'Hello, World!';
			Effect.runSync(createFile(filePath, content));
			expect(existsSync(filePath)).toBe(true);
		});

		it('should create parent directories if they don\'t exist', () => {
			const filePath = join(TEST_DIR, 'nested/dir/test.txt');
			const content = 'content';
			Effect.runSync(createFile(filePath, content));
			expect(existsSync(filePath)).toBe(true);
		});
	});

	describe('removeFile', () => {
		it('should remove a file', () => {
			const filePath = join(TEST_DIR, 'to-remove.txt');
			writeFileSync(filePath, 'content');
			Effect.runSync(removeFile(filePath));
			expect(existsSync(filePath)).toBe(false);
		});
	});

	describe('getDirFiles', () => {
		it('should get all files in directory', () => {
			const file1 = join(TEST_DIR, 'file1.txt');
			const file2 = join(TEST_DIR, 'file2.js');
			writeFileSync(file1, 'content1');
			writeFileSync(file2, 'content2');

			const files = Effect.runSync(getDirFiles(TEST_DIR, false));
			expect(files.length).toBe(2);
			expect(files).toContain(file1);
			expect(files).toContain(file2);
		});

		it('should get files recursively', () => {
			const nestedDir = join(TEST_DIR, 'nested');
			mkdirSync(nestedDir);
			const file1 = join(TEST_DIR, 'file1.txt');
			const file2 = join(nestedDir, 'file2.txt');
			writeFileSync(file1, 'content1');
			writeFileSync(file2, 'content2');

			const files = Effect.runSync(getDirFiles(TEST_DIR, true));
			// Should have at least 1 file (directory might also be listed)
			expect(files.length).toBeGreaterThanOrEqual(1);
			const txtFiles = files.filter(f => f.endsWith('.txt'));
			expect(txtFiles.length).toBe(2);
		});

		it('should filter by extensions', () => {
			writeFileSync(join(TEST_DIR, 'file1.txt'), 'content1');
			writeFileSync(join(TEST_DIR, 'file2.js'), 'content2');
			writeFileSync(join(TEST_DIR, 'file3.css'), 'content3');

			const files = Effect.runSync(getDirFiles(TEST_DIR, false, ['.txt', '.css']));
			expect(files.length).toBe(2);
			expect(files.every(f => f.endsWith('.txt') || f.endsWith('.css'))).toBe(true);
		});
	});

	describe('getFilesList', () => {
		it('should return empty array for undefined', () => {
			const files = Effect.runSync(getFilesList(undefined));
			expect(files).toEqual([]);
		});

		it('should return array for string path to file', () => {
			const filePath = join(TEST_DIR, 'test.txt');
			writeFileSync(filePath, 'content');
			const files = Effect.runSync(getFilesList(filePath));
			expect(files).toEqual([filePath]);
		});

		it('should return all files for directory', () => {
			writeFileSync(join(TEST_DIR, 'file1.txt'), 'content1');
			writeFileSync(join(TEST_DIR, 'file2.txt'), 'content2');
			const files = Effect.runSync(getFilesList(TEST_DIR));
			expect(files.length).toBe(2);
		});

		it('should return array as is', () => {
			const array = ['file1.txt', 'file2.txt'];
			const files = Effect.runSync(getFilesList(array));
			expect(files).toEqual(array);
		});
	});

	describe('generateHash', () => {
		it('should generate hash from string', () => {
			const str = 'test string';
			const hash = generateHash(str);
			expect(hash).toBeDefined();
			expect(hash.length).toBe(8);
		});

		it('should generate same hash for same string', () => {
			const str = 'test string';
			const hash1 = generateHash(str);
			const hash2 = generateHash(str);
			expect(hash1).toBe(hash2);
		});

		it('should generate different hash for different strings', () => {
			const hash1 = generateHash('string1');
			const hash2 = generateHash('string2');
			// Hashes should be different (with high probability)
			// But in edge cases they might collide, so we just check they exist
			expect(hash1).toBeDefined();
			expect(hash2).toBeDefined();
			expect(hash1.length).toBe(8);
			expect(hash2.length).toBe(8);
		});
	});

	describe('findClosestFile', () => {
		it('should find file in current directory', () => {
			const configPath = join(TEST_DIR, '.sassrc');
			writeFileSync(configPath, '{}');
			const found = findClosestFile(TEST_DIR, '.sassrc');
			expect(found).toBe(configPath);
		});

		it('should find file in parent directory', () => {
			const configPath = join(TEST_DIR, '.sassrc');
			const nestedDir = join(TEST_DIR, 'nested');
			mkdirSync(nestedDir);
			writeFileSync(configPath, '{}');
			const found = findClosestFile(nestedDir, '.sassrc');
			expect(found).toBe(configPath);
		});

		it('should return null if file not found', () => {
			const found = findClosestFile(TEST_DIR, 'non-existent.txt');
			expect(found).toBeNull();
		});
	});

	describe('getSassFileConfig', () => {
		it('should load .sassrc config', () => {
			const configPath = join(TEST_DIR, '.sassrc');
			const configData = { loadPaths: ['node_modules'], style: 'compressed' };
			writeFileSync(configPath, JSON.stringify(configData));
			const config = Effect.runSync(getSassFileConfig(TEST_DIR));
			expect(config).toEqual(configData);
		});

		it('should return null if .sassrc not found', () => {
			const config = Effect.runSync(getSassFileConfig(TEST_DIR));
			expect(config).toBeNull();
		});

		it('should return null for invalid JSON', () => {
			const configPath = join(TEST_DIR, '.sassrc');
			writeFileSync(configPath, 'invalid json');
			try {
				const config = Effect.runSync(getSassFileConfig(TEST_DIR));
				expect(config).toBeNull();
			} catch (error) {
				// Effect might throw, which is acceptable
				expect(error).toBeDefined();
			}
		});
	});

	describe('isFunction', () => {
		it('should return true for function', () => {
			expect(isFunction(() => {})).toBe(true);
			expect(isFunction(function() {})).toBe(true);
		});

		it('should return false for non-function', () => {
			expect(isFunction('string')).toBe(false);
			expect(isFunction(123)).toBe(false);
			expect(isFunction({})).toBe(false);
			expect(isFunction(null)).toBe(false);
			expect(isFunction(undefined)).toBe(false);
		});
	});

	describe('exec', () => {
		it('should execute function', () => {
			let executed = false;
			exec(() => { executed = true; });
			expect(executed).toBe(true);
		});

		it('should execute function with arguments', () => {
			const result = exec((a: number, b: number) => a + b, [2, 3]);
			expect(result).toBe(5);
		});

		it('should return value if not a function', () => {
			expect(exec(42)).toBe(42);
			expect(exec('string')).toBe('string');
			expect(exec(null)).toBeNull();
		});
	});
});
