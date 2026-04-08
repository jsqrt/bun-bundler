import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Effect } from 'effect';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';

import {
	getDirFiles,
	getFilesList,
	createDir,
	removeDir,
	createFile,
	removeFile,
	moveFile,
	isFunction,
	exec,
	findClosestFile,
	generateHash,
	FileSystemError,
	PathNotFoundError,
} from '../src/utils';

const TEST_DIR = join(__dirname, '__fixtures__');

function setupFixtures() {
	mkdirSync(join(TEST_DIR, 'sub'), { recursive: true });
	writeFileSync(join(TEST_DIR, 'file1.txt'), 'hello');
	writeFileSync(join(TEST_DIR, 'file2.js'), 'const a = 1;');
	writeFileSync(join(TEST_DIR, 'sub', 'nested.ts'), 'export {}');
	writeFileSync(join(TEST_DIR, '._hidden'), 'hidden');
}

function cleanFixtures() {
	if (existsSync(TEST_DIR)) {
		rmSync(TEST_DIR, { recursive: true, force: true });
	}
}

describe('utils', () => {
	beforeEach(() => {
		cleanFixtures();
		setupFixtures();
	});

	afterEach(() => {
		cleanFixtures();
	});

	describe('getDirFiles', () => {
		it('should list files in directory', () => {
			const files = Effect.runSync(getDirFiles(TEST_DIR));
			expect(files.length).toBeGreaterThanOrEqual(2);
		});

		it('should list files recursively', () => {
			const files = Effect.runSync(getDirFiles(TEST_DIR, true));
			const names = files.map((f) => f.replace(/\\/g, '/'));
			expect(names.some((f) => f.includes('nested.ts'))).toBe(true);
		});

		it('should filter by extensions', () => {
			const files = Effect.runSync(getDirFiles(TEST_DIR, false, ['.js']));
			expect(files.length).toBe(1);
			expect(files[0]).toContain('file2.js');
		});

		it('should filter out ._ prefixed files', () => {
			const files = Effect.runSync(getDirFiles(TEST_DIR));
			const names = files.map((f) => f.replace(/\\/g, '/'));
			expect(names.some((f) => f.includes('._hidden'))).toBe(false);
		});

		it('should fail for non-existent directory', () => {
			const result = Effect.runSyncExit(getDirFiles('/nonexistent/path'));
			expect(result._tag).toBe('Failure');
		});
	});

	describe('getFilesList', () => {
		it('should return empty array for undefined', () => {
			const files = Effect.runSync(getFilesList(undefined));
			expect(files).toEqual([]);
		});

		it('should return files from directory string', () => {
			const files = Effect.runSync(getFilesList(TEST_DIR));
			expect(files.length).toBeGreaterThan(0);
		});

		it('should return single file as array', () => {
			const filePath = join(TEST_DIR, 'file1.txt');
			const files = Effect.runSync(getFilesList(filePath));
			expect(files).toEqual([filePath]);
		});

		it('should pass through arrays', () => {
			const input = ['/a.js', '/b.js'];
			const files = Effect.runSync(getFilesList(input));
			expect(files).toEqual(input);
		});

		it('should return empty for non-existent path', () => {
			const files = Effect.runSync(getFilesList('/nonexistent'));
			expect(files).toEqual([]);
		});
	});

	describe('createDir / removeDir', () => {
		it('should create nested directories', () => {
			const dir = join(TEST_DIR, 'a', 'b', 'c');
			Effect.runSync(createDir(dir));
			expect(existsSync(dir)).toBe(true);
		});

		it('should not fail if dir already exists', () => {
			Effect.runSync(createDir(TEST_DIR));
			expect(existsSync(TEST_DIR)).toBe(true);
		});

		it('should remove directory recursively', () => {
			const dir = join(TEST_DIR, 'to-remove');
			mkdirSync(dir, { recursive: true });
			writeFileSync(join(dir, 'test.txt'), 'data');
			Effect.runSync(removeDir(dir));
			expect(existsSync(dir)).toBe(false);
		});

		it('should not fail removing non-existent dir', () => {
			Effect.runSync(removeDir(join(TEST_DIR, 'nope')));
		});
	});

	describe('createFile / removeFile', () => {
		it('should create file with content', () => {
			const fp = join(TEST_DIR, 'new', 'deep', 'file.txt');
			Effect.runSync(createFile(fp, 'test content'));
			expect(readFileSync(fp, 'utf-8')).toBe('test content');
		});

		it('should remove file', () => {
			const fp = join(TEST_DIR, 'file1.txt');
			Effect.runSync(removeFile(fp));
			expect(existsSync(fp)).toBe(false);
		});
	});

	describe('moveFile', () => {
		it('should move file to new directory', () => {
			const src = join(TEST_DIR, 'file1.txt');
			const destDir = join(TEST_DIR, 'moved');
			mkdirSync(destDir, { recursive: true });
			Effect.runSync(moveFile(src, destDir));
			expect(existsSync(join(destDir, 'file1.txt'))).toBe(true);
			expect(existsSync(src)).toBe(false);
		});
	});

	describe('isFunction / exec', () => {
		it('should detect functions', () => {
			expect(isFunction(() => {})).toBe(true);
			expect(isFunction('string')).toBe(false);
			expect(isFunction(null)).toBe(false);
			expect(isFunction(42)).toBe(false);
		});

		it('should execute function and return result', () => {
			expect(exec((a: number, b: number) => a + b, [2, 3])).toBe(5);
		});

		it('should return non-function as-is', () => {
			expect(exec('hello')).toBe('hello');
			expect(exec(42)).toBe(42);
			expect(exec(null)).toBe(null);
		});
	});

	describe('findClosestFile', () => {
		it('should find file in current directory', () => {
			writeFileSync(join(TEST_DIR, '.sassrc'), '{}');
			const result = findClosestFile(TEST_DIR, '.sassrc');
			expect(result).toContain('.sassrc');
		});

		it('should find file in parent directory', () => {
			writeFileSync(join(TEST_DIR, '.sassrc'), '{}');
			const result = findClosestFile(join(TEST_DIR, 'sub'), '.sassrc');
			expect(result).toContain('.sassrc');
		});

		it('should return null if file not found', () => {
			const result = findClosestFile(TEST_DIR, 'nonexistent.file');
			expect(result).toBe(null);
		});

		it('should return null for empty entry', () => {
			const result = findClosestFile('', '.sassrc');
			expect(result).toBe(null);
		});
	});

	describe('generateHash', () => {
		it('should generate consistent hash', () => {
			const h1 = generateHash('test');
			const h2 = generateHash('test');
			expect(h1).toBe(h2);
		});

		it('should generate different hashes for different inputs', () => {
			const h1 = generateHash('test1');
			const h2 = generateHash('test2');
			expect(h1).not.toBe(h2);
		});

		it('should generate 8-char hash', () => {
			const h = generateHash('some content');
			expect(h.length).toBe(8);
		});
	});
});
