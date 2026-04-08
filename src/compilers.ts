import { Effect } from 'effect';
import Bun from 'bun';
import path, { basename, extname } from 'path';
import fs, { existsSync, readFileSync, renameSync, writeFileSync } from 'fs';
import type { Reporter } from './reporter';
import type { Constants } from './constants';
import type { ProcessedConfig, BundlerState } from './bundler-types';
import { BundlerError } from './bundler-types';
import { createDir, createFile, removeDir, removeFile } from './utils';

const pug = require('pug');
const sass = require('sass');

export function writeDistFiles(dist: string, compiledData: any[]) {
	Object.values(compiledData).forEach(({ fileContent, fileName } = {}) => {
		if (fileContent === null) return;
		writeFileSync(path.join(dist, fileName), fileContent);
	});
}

export const compile = (
	options: {
		filePaths: string[];
		type: string;
		renderFn: any;
		newFileExt?: string;
		dist: string;
		skipExtensions?: string[];
		assembleCompilation?: any;
	},
	config: ProcessedConfig,
	constants: Constants,
	state: BundlerState,
): Effect.Effect<void, BundlerError> =>
	Effect.gen(function* (_: any) {
		const { filePaths, type, renderFn, newFileExt, dist, skipExtensions = [], assembleCompilation } = options;

		if (!Array.isArray(filePaths) || !filePaths.length) {
			return yield* _(Effect.fail(new BundlerError(`${type} - No files to compile`)));
		}

		const compiledData = yield* _(
			Effect.all(
				filePaths.map((filePath) =>
					Effect.try({
						try: () => {
							if (!existsSync(filePath)) {
								throw new BundlerError(`${type} compilation: File ${filePath} doesn't exist`);
							}

							const fileExtname = extname(filePath);
							let fileName = basename(filePath);
							if (newFileExt) fileName = fileName.replace(path.extname(filePath), newFileExt);

							const res: any = { fileName, path: filePath };

							if (skipExtensions && skipExtensions.includes(fileExtname)) {
								res.fileContent = readFileSync(filePath, 'utf-8');
							} else {
								try {
									res.fileContent = renderFn(filePath, fileExtname);
								} catch (error: any) {
									if (state.currentSpinner) {
										state.currentSpinner.fail('Compilation failed');
										state.currentSpinner = null;
									}
									state.lastBuildSucceeded = false;
									console.error(error);
									throw error;
								}
							}

							return res;
						},
						catch: (error) => {
							if (error instanceof Error) {
								return error;
							}
							return new BundlerError(`${type} compilation failed`, error);
						},
					}),
				),
			),
		);

		if (constants.compilationTypes.css === type && config.assembleStyles && !assembleCompilation) {
			state.stylesToAssemble = [...state.stylesToAssemble, ...compiledData];
			return;
		}

		writeDistFiles(dist, compiledData);
	}) as Effect.Effect<void, BundlerError>;

export function processHTMLTemplate(
	filePath: string,
	config: ProcessedConfig,
	visitedFiles = new Set<string>(),
): string {
	if (visitedFiles.has(filePath)) {
		throw new BundlerError(`Dependency cycle detected in file ${filePath}`);
	}

	visitedFiles.add(filePath);

	let content = fs.readFileSync(filePath, 'utf-8');
	const includeRegex = /<!--\s*@include\s+['"](.+?)['"]\s*-->/g;

	let match;
	while ((match = includeRegex.exec(content)) !== null) {
		const includeFile = match[1];
		const includePath = path.resolve(path.dirname(filePath), includeFile);

		const rootDir = path.resolve(config.rootDir);
		if (!includePath.startsWith(rootDir)) {
			throw new BundlerError(`Include path traversal detected: "${includeFile}" resolves outside project root`);
		}

		if (!existsSync(includePath)) {
			throw new BundlerError(`File ${includeFile} not found`);
		}
		const includeContent = processHTMLTemplate(includePath, config, visitedFiles);
		content = content.replace(match[0], includeContent);
		includeRegex.lastIndex = 0;
	}

	visitedFiles.delete(filePath);
	return content;
}

export const compileStyles = (
	config: ProcessedConfig,
	reporter: Reporter,
	constants: Constants,
	state: BundlerState,
): Effect.Effect<void, BundlerError> =>
	Effect.gen(function* (_: any) {
		state.stylesToAssemble = [];
		yield* _(reporter.debugLog('Styles compilation'));
		yield* _(createDir(config.cssDist));

		yield* _(
			Effect.catchAll(
				compile(
					{
						filePaths: config.sassFiles,
						type: constants.compilationTypes.css,
						newFileExt: constants.extDist.css,
						dist: config.cssDist,
						renderFn: (filePath: string) =>
							sass.compile(filePath, {
								style: 'compressed',
								...config.sassConfigOverrides,
							})?.css,
					},
					config,
					constants,
					state,
				),
				(error: any) =>
					Effect.gen(function* (_: any) {
						return yield* _(Effect.fail(error));
					}),
			),
		);
	}) as Effect.Effect<void, BundlerError>;

export const compilePug = (
	config: ProcessedConfig,
	reporter: Reporter,
	constants: Constants,
	state: BundlerState,
): Effect.Effect<void, BundlerError> =>
	Effect.gen(function* (_: any) {
		yield* _(reporter.debugLog('Pug/html compilation'));

		const htmlFilesIsArray = Array.isArray(config.htmlFiles);

		if (!htmlFilesIsArray || !config.htmlFiles.length) {
			yield* _(reporter.debugLog("warning: HTML/pug files doesn't provided"));
			return;
		}

		const sitemap = config.htmlFiles
			?.filter((file: string) => fs.lstatSync(file).isFile())
			.map((file: string) => path.basename(file).replace(/\.pug$/, constants.extDist.html));

		yield* _(
			Effect.catchAll(
				compile(
					{
						type: constants.compilationTypes.pug,
						filePaths: config.htmlFiles,
						newFileExt: constants.extDist.html,
						dist: config.distDir,
						renderFn: (filePath: string, fileExtname: string) => {
							const fullPath = path.resolve(filePath);
							const isFile = fs.lstatSync(fullPath).isFile();

							if (path.basename(fullPath).startsWith(constants.hiddenFilePrefix)) return null;
							if (!isFile) {
								Effect.runSync(reporter.debugLog(`Skipping: ${fullPath} is a directory.`));
								return null;
							}

							if (fileExtname === constants.extDist.html) {
								return processHTMLTemplate(filePath, config);
							}

							const rootDir = path.resolve(config.rootDir);
							const safeReadFileSync = (filePath: string, options?: any) => {
								const resolved = path.resolve(filePath);
								if (!resolved.startsWith(rootDir)) {
									throw new Error(`Access denied: "${filePath}" is outside project root`);
								}
								return readFileSync(resolved, options);
							};

							return pug.renderFile(fullPath, {
								pretty: false,
								cache: false,
								compileDebug: config.debug,
								sitemap,
								readFileSync: safeReadFileSync,
								env: config.production ? 'production' : 'development',
								...config.pugConfigOverrides,
							});
						},
					},
					config,
					constants,
					state,
				),
				(error) =>
					Effect.gen(function* (_: any) {
						return yield* _(Effect.fail(error));
					}),
			),
		);
	}) as Effect.Effect<void, BundlerError>;

export const compileScripts = (
	config: ProcessedConfig,
	reporter: Reporter,
	constants: Constants,
	state: BundlerState,
): Effect.Effect<void, BundlerError> =>
	Effect.gen(function* (_: any) {
		state.importedCSSToAssemble = {};
		yield* _(reporter.debugLog('Scripts compilation'));
		yield* _(createDir(config.jsDist));

		const result = yield* _(
			Effect.tryPromise({
				try: () =>
					Bun.build({
						entrypoints: config.jsFiles,
						outdir: config.jsDist,
						minify: config.production,
						format: 'esm',
						...config.jsConfigOverrides,
					}),
				catch: (error) => {
					if (state.currentSpinner) {
						state.currentSpinner.fail('Compilation failed');
						state.currentSpinner = null;
					}
					state.lastBuildSucceeded = false;

					if (error && typeof error === 'object') {
						console.error(error);
					} else {
						console.error(String(error));
					}

					return new BundlerError('Failed to build scripts', error);
				},
			}),
		);

		if (!result.success) {
			result?.logs?.forEach((message: any) => {
				console.error(message);
			});

			if (state.currentSpinner) {
				state.currentSpinner.fail('Compilation failed');
				state.currentSpinner = null;
			}
			state.lastBuildSucceeded = false;

			return yield* _(Effect.fail(new BundlerError('Script compilation failed', result)));
		}

		const importedCSS = result.outputs.filter(
			(output: any) => path.extname(output.path) === constants.extDist.css,
		);

		if (importedCSS.length && config.cssDist && !config.assembleStyles) {
			importedCSS.forEach((asset: any) => {
				const cssModules = path.join(config.cssDist, './modules');
				Effect.runSync(createDir(cssModules));
				renameSync(asset.path, path.join(cssModules, 'modules.css'));
			});
		}

		if (config.assembleStyles) {
			state.importedCSSToAssemble = Object.fromEntries(
				importedCSS.map((asset: any) => {
					if (state.importedCSSToAssemble[asset.hash]) {
						return [asset.hash, state.importedCSSToAssemble[asset.hash]];
					}

					const assetData = {
						fileURL: asset.path,
						fileName: path.basename(asset.path),
						fileContent: readFileSync(asset.path, 'utf-8'),
					};
					return [asset.hash, assetData];
				}),
			);
		} else {
			state.importedCSSToAssemble = {};
		}
	}) as Effect.Effect<void, BundlerError>;

export const assembleStyles = (
	config: ProcessedConfig,
	reporter: Reporter,
	constants: Constants,
	state: BundlerState,
): Effect.Effect<void, BundlerError> =>
	Effect.gen(function* (_: any) {
		if (!config.assembleStyles) return;

		yield* _(reporter.debugLog('Styles assembling'));

		let distFileContent = '';
		const distFileURL = path.resolve(config.assembleStyles);

		if (!Object.values(state.importedCSSToAssemble).length && !state.stylesToAssemble?.length) {
			if (existsSync(distFileURL)) {
				yield* _(removeFile(distFileURL));
			}
			return;
		}

		const concatFileContent = (content: string, fileName: string) => {
			distFileContent += `\n\n/* @${fileName} */\n`;
			distFileContent += content;
		};

		Object.values(state.importedCSSToAssemble)?.forEach(({ fileContent, fileName, fileURL }: any) => {
			if (!fileContent) return;
			concatFileContent(fileContent, fileName);
			if (existsSync(fileURL)) {
				Effect.runSync(removeFile(fileURL));
			}
		});

		state.stylesToAssemble?.forEach(({ fileContent, fileName }: any) => {
			if (!fileContent) return;
			concatFileContent(fileContent, fileName);
		});

		yield* _(createFile(distFileURL, distFileContent));

		yield* _(
			compile(
				{
					filePaths: [distFileURL],
					type: constants.compilationTypes.css,
					newFileExt: constants.extDist.css,
					dist: path.dirname(distFileURL),
					assembleCompilation: true,
					renderFn: (filePath: string) => {
						return sass.compile(filePath, {
							style: 'compressed',
							...config.sassConfigOverrides,
						})?.css;
					},
				},
				config,
				constants,
				state,
			),
		);
	}) as Effect.Effect<void, BundlerError>;

export const transferStatics = (
	config: ProcessedConfig,
	reporter: Reporter,
): Effect.Effect<void, BundlerError> =>
	Effect.gen(function* (_: any) {
		yield* _(reporter.debugLog('Bundling statics'));
		const staticData = config.staticFolders;

		yield* _(
			Effect.all(
				staticData.map((folderPath: string) =>
					Effect.tryPromise({
						try: async () => {
							const fsPromises = (await import('fs/promises')).default;
							if (!fs.existsSync(folderPath)) {
								throw new BundlerError(`${folderPath} doesn't exist`);
							}

							const folderName = path.basename(folderPath);
							Effect.runSync(removeDir(path.join(config.distDir, folderName)));

							return fsPromises.cp(folderPath, path.join(config.distDir, folderName), {
								recursive: true,
							});
						},
						catch: (error) => new BundlerError('Failed to transfer statics', error),
					}),
				),
			),
		);
	}) as Effect.Effect<void, BundlerError>;
