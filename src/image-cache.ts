import { Effect } from 'effect';
import fs from 'fs';
import fsPromises from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

const CACHE_VERSION = 'bun-bundler-img-v1';

export interface ImageCache {
	version: string;
	files: Record<string, string>;
}

export const loadImageCache = (cacheDir: string): Effect.Effect<ImageCache> =>
	Effect.tryPromise({
		try: async () => {
			const cachePath = path.join(cacheDir, 'image-cache.json');
			const raw = await fsPromises.readFile(cachePath, 'utf8');
			const data = JSON.parse(raw);
			if (data.version !== CACHE_VERSION) return { version: CACHE_VERSION, files: {} };
			return data as ImageCache;
		},
		catch: () => ({ version: CACHE_VERSION, files: {} } as ImageCache),
	}).pipe(Effect.catchAll(() => Effect.succeed({ version: CACHE_VERSION, files: {} } as ImageCache)));

export const saveImageCache = (cacheDir: string, cache: ImageCache): Effect.Effect<void> =>
	Effect.tryPromise({
		try: async () => {
			await fsPromises.mkdir(cacheDir, { recursive: true });
			await fsPromises.writeFile(
				path.join(cacheDir, 'image-cache.json'),
				JSON.stringify(cache, null, 2),
			);
		},
		catch: () => new Error('Failed to save image cache'),
	}).pipe(Effect.catchAll(() => Effect.void));

export const hashFile = (filePath: string): Effect.Effect<string> =>
	Effect.tryPromise({
		try: async () => {
			const buf = await fsPromises.readFile(filePath);
			return crypto.createHash('sha1').update(buf).update(CACHE_VERSION).digest('hex');
		},
		catch: () => '',
	}).pipe(Effect.catchAll(() => Effect.succeed('')));
