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

export function readAllFilesInDirectory(directoryPath) {
	try {
		if (!existsSync(directoryPath)) {
			console.log('path doesn`t exist');
			return null;
		}

		const files = readdirSync(directoryPath);

		return files.map((file) => {
			const filePath = `${directoryPath}/${file}`;
			const content = readFileSync(filePath, 'utf-8');

			return content;
		});
	} catch (error) {
		console.error('Error while reading files.', error);
		return null;
	}
}

export function getFileNamesInDirectory(directoryPath) {
	try {
		if (!existsSync(directoryPath)) {
			console.log('path doesn`t exist');
			return null;
		}

		const files = readdirSync(directoryPath);

		return files;
	} catch (error) {
		console.error('Error while reading files.', error);
		return null;
	}
}

export function getDirFiles(directoryPath, recursive) {
	try {
		if (!existsSync(directoryPath)) {
			console.log('path doesn`t exist');
			return null;
		}

		const files = readdirSync(directoryPath, { recursive }).map((file) => path.resolve(directoryPath, file));

		return files;
	} catch (error) {
		console.error('Error while reading files.', error);
		return null;
	}
}

export function getFilesList(entry) {
	if (!entry) return [];

	if (typeof entry === 'string') {
		const entryUrl = path.resolve(entry);
		const entryStat = statSync(entryUrl);
		const isEntryDir = entryStat?.isDirectory();
		if (!existsSync(entryUrl)) return [];

		if (isEntryDir) {
			return getDirFiles(entryUrl);
		} else {
			return [entryUrl];
		}
	} else if (Array.isArray(entry)) {
		return entry;
	}

	return [];
}

export const createDir = (dirPath) => {
	if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
};

export const removeDir = (dirPath) => {
	if (existsSync(dirPath)) rmSync(dirPath, { recursive: true });
};

export const createFile = ({ url, content }) => {
	const dir = path.dirname(url);
	createDir(dir);
	writeFileSync(url, content, 'utf-8');
};

export const removeFile = (url) => {
	rmSync(url);
};

export const promiseWrap = async (fn) => {
	return new Promise((resolve, reject) => {
		fn().then((res) => {
			if (!res.message) return resolve();
			// console.error(res.message);
			return reject();
		});
	});
};

export const isFunction = (func) => {
	return func instanceof Function;
};

export const exec = (func, attr = []) => {
	if (!isFunction(func)) return func;
	return func(...attr);
};

const findClosestFile = (entryDir, fileName) => {
	if (!entryDir) return null;

	const files = readdirSync(entryDir);
	for (const file of files) {
		if (file === fileName) return path.join(entryDir, file);
	}
	const parentDir = path.dirname(entryDir);
	if (parentDir === entryDir) return null;

	return findClosestFile(parentDir, fileName);
};

export function getSassFileConfig(entryDir) {
	if (!entryDir) return null;

	try {
		const sassConfigUrl = findClosestFile(entryDir, '.sassrc');
		if (!sassConfigUrl) return null;

		const sassConfig = readFileSync(sassConfigUrl, 'utf8');
		const sassConfigParsed = JSON.parse(sassConfig);
		return sassConfigParsed;
	} catch (err) {
		this.debugLog(err);
		return null;
	}
}

export const moveFile = (url, newFolder) => {
	const basename = path.basename(url);
	renameSync(url, path.join(newFolder, basename));
};
