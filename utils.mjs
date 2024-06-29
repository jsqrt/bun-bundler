import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
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

export const createDir = (dirPath) => {
	if (!existsSync(dirPath)) mkdirSync(dirPath);
};

export const removeDir = (dirPath) => {
	if (existsSync(dirPath)) rmSync(dirPath, { recursive: true });
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
