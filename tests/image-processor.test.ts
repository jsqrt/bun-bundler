import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Effect } from 'effect';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { WorkerPool } from '../src/worker-pool';
import { loadImageCache, saveImageCache, hashFile } from '../src/image-cache';

const TEST_DIR = join(__dirname, '__fixtures_imgproc__');
const CACHE_DIR = join(TEST_DIR, '.cache');
const IMAGES_DIR = join(TEST_DIR, 'images');

function createTestPng(filePath: string, width = 2, height = 2) {
	const headerSize = 8;
	const ihdrSize = 25;
	const idatSize = 22;
	const iendSize = 12;

	const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

	const ihdrData = Buffer.alloc(13);
	ihdrData.writeUInt32BE(width, 0);
	ihdrData.writeUInt32BE(height, 4);
	ihdrData[8] = 8;
	ihdrData[9] = 2;

	const ihdrChunk = createPngChunk('IHDR', ihdrData);

	const rawData = Buffer.alloc((1 + width * 3) * height);
	for (let y = 0; y < height; y++) {
		rawData[y * (1 + width * 3)] = 0;
		for (let x = 0; x < width; x++) {
			const offset = y * (1 + width * 3) + 1 + x * 3;
			rawData[offset] = 255;
			rawData[offset + 1] = 0;
			rawData[offset + 2] = 0;
		}
	}

	const { deflateSync } = require('zlib');
	const compressed = deflateSync(rawData);
	const idatChunk = createPngChunk('IDAT', compressed);
	const iendChunk = createPngChunk('IEND', Buffer.alloc(0));

	const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
	writeFileSync(filePath, png);
}

function createPngChunk(type: string, data: Buffer): Buffer {
	const length = Buffer.alloc(4);
	length.writeUInt32BE(data.length);
	const typeBuffer = Buffer.from(type, 'ascii');
	const crcData = Buffer.concat([typeBuffer, data]);
	const { crc32 } = require('buffer');
	let crc: number;
	try {
		crc = crc32(crcData);
	} catch {
		crc = 0;
	}
	const crcBuffer = Buffer.alloc(4);
	crcBuffer.writeUInt32BE(crc >>> 0);
	return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function setup() {
	mkdirSync(IMAGES_DIR, { recursive: true });
	mkdirSync(join(IMAGES_DIR, 'sub'), { recursive: true });
	createTestPng(join(IMAGES_DIR, 'test1.png'));
	createTestPng(join(IMAGES_DIR, 'test2.png'));
	createTestPng(join(IMAGES_DIR, 'sub', 'nested.png'));
}

function clean() {
	if (existsSync(TEST_DIR)) {
		rmSync(TEST_DIR, { recursive: true, force: true });
	}
}

const isBun = typeof globalThis.Worker !== 'undefined';
const workerDescribe = isBun ? describe : describe.skip;

describe('WorkerPool', () => {
	it('should initialize with default worker count', () => {
		if (!isBun) return;
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 2);
		expect(pool.pending).toBe(0);
		pool.terminate();
	});

	it('should report pending count', () => {
		if (!isBun) return;
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 1);
		expect(pool.pending).toBe(0);
		pool.terminate();
	});

	it('should resolve drain immediately when idle', async () => {
		if (!isBun) return;
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 2);
		await pool.drain();
		pool.terminate();
	});
});

describe('Image Cache', () => {
	beforeEach(() => {
		clean();
		mkdirSync(CACHE_DIR, { recursive: true });
		mkdirSync(IMAGES_DIR, { recursive: true });
	});

	afterEach(() => {
		clean();
	});

	it('should return empty cache when file does not exist', async () => {
		const cache = await Effect.runPromise(loadImageCache(join(TEST_DIR, 'nonexistent')));
		expect(cache.files).toEqual({});
	});

	it('should save and load cache', async () => {
		const cache = { version: 'test', files: { 'img.png': 'abc123' } };
		await Effect.runPromise(saveImageCache(CACHE_DIR, cache));

		expect(existsSync(join(CACHE_DIR, 'image-cache.json'))).toBe(true);

		const raw = readFileSync(join(CACHE_DIR, 'image-cache.json'), 'utf8');
		const loaded = JSON.parse(raw);
		expect(loaded.files['img.png']).toBe('abc123');
	});

	it('should return empty cache for invalid JSON', async () => {
		mkdirSync(CACHE_DIR, { recursive: true });
		writeFileSync(join(CACHE_DIR, 'image-cache.json'), 'not json');
		const cache = await Effect.runPromise(loadImageCache(CACHE_DIR));
		expect(cache.files).toEqual({});
	});

	it('should hash a file deterministically', async () => {
		createTestPng(join(IMAGES_DIR, 'hash-test.png'));
		const h1 = await Effect.runPromise(hashFile(join(IMAGES_DIR, 'hash-test.png')));
		const h2 = await Effect.runPromise(hashFile(join(IMAGES_DIR, 'hash-test.png')));
		expect(h1).toBe(h2);
		expect(h1.length).toBe(40);
	});

	it('should return different hashes for different files', async () => {
		createTestPng(join(IMAGES_DIR, 'a.png'), 2, 2);
		createTestPng(join(IMAGES_DIR, 'b.png'), 4, 4);
		const h1 = await Effect.runPromise(hashFile(join(IMAGES_DIR, 'a.png')));
		const h2 = await Effect.runPromise(hashFile(join(IMAGES_DIR, 'b.png')));
		expect(h1).not.toBe(h2);
	});

	it('should return empty string for non-existent file', async () => {
		const h = await Effect.runPromise(hashFile(join(IMAGES_DIR, 'nope.png')));
		expect(h).toBe('');
	});
});

workerDescribe('Worker Pool - Image Processing', () => {
	beforeEach(() => {
		clean();
		setup();
	});

	afterEach(() => {
		clean();
	});

	it('should process a single image via worker', async () => {
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 2);
		const src = join(IMAGES_DIR, 'test1.png');
		const dist = join(TEST_DIR, 'out', 'test1.webp');

		const result = await pool.run({
			src,
			dist,
			outputFormat: 'webp',
			formatOptions: { quality: 80 },
		});

		expect(result.ok).toBe(true);
		expect(result.src).toBe(src);
		expect(existsSync(dist)).toBe(true);

		pool.terminate();
	});

	it('should process multiple images in parallel', async () => {
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 2);

		const tasks = [
			pool.run({
				src: join(IMAGES_DIR, 'test1.png'),
				dist: join(TEST_DIR, 'out', 'test1.webp'),
				outputFormat: 'webp',
			}),
			pool.run({
				src: join(IMAGES_DIR, 'test2.png'),
				dist: join(TEST_DIR, 'out', 'test2.webp'),
				outputFormat: 'webp',
			}),
			pool.run({
				src: join(IMAGES_DIR, 'sub', 'nested.png'),
				dist: join(TEST_DIR, 'out', 'sub', 'nested.webp'),
				outputFormat: 'webp',
			}),
		];

		const results = await Promise.all(tasks);
		results.forEach((r) => expect(r.ok).toBe(true));

		expect(existsSync(join(TEST_DIR, 'out', 'test1.webp'))).toBe(true);
		expect(existsSync(join(TEST_DIR, 'out', 'test2.webp'))).toBe(true);
		expect(existsSync(join(TEST_DIR, 'out', 'sub', 'nested.webp'))).toBe(true);

		pool.terminate();
	});

	it('should create output directories automatically', async () => {
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 1);

		const dist = join(TEST_DIR, 'deep', 'nested', 'dir', 'img.webp');
		const result = await pool.run({
			src: join(IMAGES_DIR, 'test1.png'),
			dist,
			outputFormat: 'webp',
		});

		expect(result.ok).toBe(true);
		expect(existsSync(dist)).toBe(true);

		pool.terminate();
	});

	it('should handle non-existent source gracefully', async () => {
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 1);

		const result = await pool.run({
			src: join(IMAGES_DIR, 'nonexistent.png'),
			dist: join(TEST_DIR, 'out', 'fail.webp'),
			outputFormat: 'webp',
		}).catch((e) => ({ ok: false, error: e.message, src: '' }));

		expect(result.ok).toBe(false);

		pool.terminate();
	});

	it('should drain after all tasks complete', async () => {
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 2);

		pool.run({
			src: join(IMAGES_DIR, 'test1.png'),
			dist: join(TEST_DIR, 'out', 'd1.webp'),
			outputFormat: 'webp',
		});
		pool.run({
			src: join(IMAGES_DIR, 'test2.png'),
			dist: join(TEST_DIR, 'out', 'd2.webp'),
			outputFormat: 'webp',
		});

		await pool.drain();

		expect(existsSync(join(TEST_DIR, 'out', 'd1.webp'))).toBe(true);
		expect(existsSync(join(TEST_DIR, 'out', 'd2.webp'))).toBe(true);

		pool.terminate();
	});

	it('should convert to avif format', async () => {
		const pool = new WorkerPool(new URL('../src/image-worker.ts', import.meta.url).href, 1);

		const dist = join(TEST_DIR, 'out', 'test1.avif');
		const result = await pool.run({
			src: join(IMAGES_DIR, 'test1.png'),
			dist,
			outputFormat: 'avif',
			formatOptions: { quality: 60 },
		});

		expect(result.ok).toBe(true);
		expect(existsSync(dist)).toBe(true);

		pool.terminate();
	});
});
