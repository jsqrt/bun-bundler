import { Effect } from 'effect';
import {
	statSync,
	existsSync,
	readdirSync,
	readFileSync,
	mkdirSync,
	rmSync,
	renameSync,
	writeFileSync,
} from 'fs';
import path from 'path';

export class FileSystemError {
	readonly _tag = 'FileSystemError';
	constructor(readonly message: string) {}
}

export class PathNotFoundError {
	readonly _tag = 'PathNotFoundError';
	constructor(readonly path: string) {}
}

export const readAllFilesInDirectory = (directoryPath: string) =>
	Effect.try({
		try: () => {
			if (!existsSync(directoryPath)) {
				throw new PathNotFoundError(directoryPath);
			}
			const files = readdirSync(directoryPath);
			return files.map((file) => {
				const filePath = `${directoryPath}/${file}`;
				return readFileSync(filePath, 'utf-8');
			});
		},
		catch: (error) => (error instanceof PathNotFoundError ? error : new FileSystemError(String(error))),
	});

export const getFileNamesInDirectory = (directoryPath: string) =>
	Effect.try({
		try: () => {
			if (!existsSync(directoryPath)) {
				throw new PathNotFoundError(directoryPath);
			}
			return readdirSync(directoryPath);
		},
		catch: (error) => (error instanceof PathNotFoundError ? error : new FileSystemError(String(error))),
	});

export const getDirFiles = (directoryPath: string, recursive: boolean = false, matchExtensions?: string[]) =>
	Effect.try({
		try: () => {
			const entry = path.resolve(directoryPath);
			if (!existsSync(entry)) {
				throw new PathNotFoundError(entry);
			}

			let files = readdirSync(entry, { recursive }).map((file) => path.resolve(entry, file as string));

			if (matchExtensions) {
				files = files.filter((file) => matchExtensions.includes(path.extname(file)));
			}

			return files;
		},
		catch: (error) => (error instanceof PathNotFoundError ? error : new FileSystemError(String(error))),
	});

export const getFilesList = (entry: string | string[] | undefined) =>
	Effect.sync(() => {
		if (!entry) return [];

		if (typeof entry === 'string') {
			const entryUrl = path.resolve(entry);
			if (!existsSync(entryUrl)) return [];

			const entryStat = statSync(entryUrl);
			const isEntryDir = entryStat?.isDirectory();

			if (isEntryDir) {
				return Effect.runSync(getDirFiles(entryUrl));
			} else {
				return [entryUrl];
			}
		} else if (Array.isArray(entry)) {
			return entry;
		}

		return [];
	});

export const createDir = (dirPath: string) =>
	Effect.sync(() => {
		if (!existsSync(dirPath)) {
			mkdirSync(dirPath, { recursive: true });
		}
	});

export const removeDir = (dirPath: string) =>
	Effect.sync(() => {
		if (existsSync(dirPath)) {
			rmSync(dirPath, { recursive: true });
		}
	});

export const createFile = (url: string, content: string) =>
	Effect.gen(function* (_) {
		const dir = path.dirname(url);
		yield* _(createDir(dir));
		yield* _(
			Effect.sync(() => {
				writeFileSync(url, content, 'utf-8');
			}),
		);
	});

export const removeFile = (url: string) =>
	Effect.sync(() => {
		rmSync(url);
	});

export const moveFile = (url: string, newFolder: string) =>
	Effect.sync(() => {
		const basename = path.basename(url);
		renameSync(url, path.join(newFolder, basename));
	});

export const isFunction = (func: unknown): func is Function => func instanceof Function;

export const exec = <T>(func: T | ((...args: any[]) => T), attr: any[] = []): T => {
	if (!isFunction(func)) return func;
	return func(...attr);
};

export const findClosestFile = (entryDir: string, fileName: string): string | null => {
	if (!entryDir) return null;

	const files = readdirSync(entryDir);
	for (const file of files) {
		if (file === fileName) return path.join(entryDir, file);
	}

	const parentDir = path.dirname(entryDir);
	if (parentDir === entryDir) return null;

	return findClosestFile(parentDir, fileName);
};

export const getSassFileConfig = (entryDir: string) =>
	Effect.try({
		try: () => {
			if (!entryDir) return null;

			const sassConfigUrl = findClosestFile(entryDir, '.sassrc');
			if (!sassConfigUrl) return null;

			const sassConfig = readFileSync(sassConfigUrl, 'utf8');
			return JSON.parse(sassConfig);
		},
		catch: () => null,
	});

export const generateHash = (str: string): string => {
	return Buffer.from(str).toString('base64').substring(0, 8);
};
