import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

sharp.concurrency(1);
sharp.cache(false);

export interface ImageWorkerTask {
	src: string;
	dist: string;
	outputFormat: string;
	formatOptions?: Record<string, any>;
	resize?: { x: number; y: number } | null;
	scale?: number;
	reduceColors?: boolean;
}

export interface ImageWorkerResult {
	ok: boolean;
	src: string;
	size?: number;
	error?: string;
}

declare var self: Worker;

self.onmessage = async ({ data }: MessageEvent<ImageWorkerTask>) => {
	const { src, dist, outputFormat, formatOptions = {}, resize, scale, reduceColors } = data;

	try {
		await fs.mkdir(path.dirname(dist), { recursive: true });

		const extname = path.extname(src).toLowerCase();
		const sharpOptions: any = extname === '.svg' && scale ? { density: scale * 72 } : {};

		let img = sharp(src, sharpOptions);

		if (resize) {
			img = img.resize(resize.x, resize.y);
		}

		if (reduceColors) {
			img = (img as any).colorspace('rgb16').toColorspace('srgb');
		}

		img = img.rotate();
		await (img as any).toFormat(outputFormat, formatOptions).toFile(dist);

		const { size } = await fs.stat(dist);
		self.postMessage({ ok: true, src, size } satisfies ImageWorkerResult);
	} catch (e: any) {
		self.postMessage({ ok: false, src, error: e.message } satisfies ImageWorkerResult);
	}
};
