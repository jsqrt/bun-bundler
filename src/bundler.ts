import { Effect, Context, Layer, pipe } from 'effect';
import Bun from 'bun';
import path, { basename, extname, resolve } from 'path';
import fs, { existsSync, readFileSync, renameSync, statSync, writeFileSync } from 'fs';
import type { Reporter } from './reporter';
import { ReporterService } from './reporter';
import type { Constants } from './constants';
import { ConstantsService } from './constants';
import {
	createDir,
	exec,
	getDirFiles,
	getFilesList,
	getSassFileConfig,
	removeDir,
	createFile,
	removeFile,
} from './utils';
import { runtimeMessages } from './runtime-messages';

const pug = require('pug');
const sass = require('sass');

export interface BundlerConfig {
	readonly rootDir?: string;
	readonly dist?: string;
	readonly html?: string | string[];
	readonly sass?: string | string[];
	readonly js?: string | string[];
	readonly staticFolders?: string | string[];
	readonly cssDist?: string;
	readonly jsDist?: string;
	readonly htmlDist?: string;
	readonly watchDir?: string;
	readonly production?: boolean;
	readonly debug?: boolean;
	readonly assembleStyles?: string;
	readonly pugConfigOverrides?: any;
	readonly jsConfigOverrides?: any;
	readonly sassConfigOverrides?: any;
	readonly onStart?: () => void;
	readonly onBuildComplete?: () => void;
	readonly onUpdate?: (changes: any) => void;
	readonly onError?: () => void;
	readonly onWatchUpdate?: (data: any) => void;
}

export class BundlerError {
	readonly _tag = 'BundlerError';
	constructor(readonly message: string, readonly originalError?: unknown) {}
}

interface ProcessedConfig {
	rootDir: string;
	production?: boolean;
	htmlFiles: string[];
	sassFiles: string[];
	jsFiles: string[];
	staticFolders: string[];
	watchDir: string;
	distDir: string;
	cssDist: string;
	jsDist: string;
	htmlDist: string;
	debug?: boolean;
	assembleStyles?: string;
	pugConfigOverrides: any;
	jsConfigOverrides: any;
	sassConfigOverrides: any;
	onStart?: () => void;
	onBuildComplete?: () => void;
	onUpdate?: (changes: any) => void;
	onError?: () => void;
	onWatchUpdate?: (data: any) => void;
}

export interface Bundler {
	readonly build: (config: BundlerConfig) => Effect.Effect<void, BundlerError>;
	readonly watch: (config: BundlerConfig) => Effect.Effect<void, BundlerError>;
}

export class BundlerService extends Context.Tag('BundlerService')<BundlerService, Bundler>() {}

class BundlerImpl {
	private watchDebounce: any = null;
	private watcher: any = null;
	private watchChangedFileList: Record<string, boolean> = {};
	private watchChangedExtList: Record<string, boolean> = {};
	private stylesToAssemble: any[] = [];
	private importedCSSToAssemble: Record<string, any> = {};
	private config!: ProcessedConfig;
	private currentSpinner: any = null; // Temporary spinner for current build
	private lastBuildSucceeded: boolean = false; // Track if last build was successful

	constructor(private reporter: Reporter, private constants: Constants) {}

	private prepareFiles(entry: any, extensions?: string[]): string[] {
		const fallback = [entry];
		if (typeof entry !== 'string') return fallback;

		const entryStat = statSync(entry);
		const isDirectory = entryStat?.isDirectory();

		return isDirectory ? [Effect.runSync(getDirFiles(entry, true, extensions))].flat() : fallback;
	}

	private setConfig(cfg: BundlerConfig, mode?: string): Effect.Effect<void, BundlerError> {
		return pipe(
			Effect.gen(
				function* (_) {
					if (!cfg) {
						return yield* _(Effect.fail(new BundlerError('Config is not defined')));
					}

					const {
						dist = '',
						html = [],
						sass = [],
						js = [],
						staticFolders = [],
						cssDist = '',
						jsDist = '',
						htmlDist = '',
						pugConfigOverrides = {},
						jsConfigOverrides = {},
						sassConfigOverrides = {},
						assembleStyles,
					} = cfg;

					const rootDir = cfg.rootDir || process.cwd();
					const production = cfg.production;

					this.config = {
						rootDir,
						production,
						htmlFiles: this.prepareFiles(exec(html)).flat(),
						sassFiles: this.prepareFiles(exec(sass)).flat(),
						jsFiles: this.prepareFiles(exec(js)).flat(),
						staticFolders: this.prepareFiles(exec(staticFolders)).flat(),
						watchDir: resolve(rootDir, cfg.watchDir || './src/'),
						distDir: resolve(rootDir, dist || './dist/'),
						cssDist: resolve(rootDir, cssDist || path.join(resolve(rootDir, dist || './dist/'), './css/')),
						jsDist: resolve(rootDir, jsDist || path.join(resolve(rootDir, dist || './dist/'), './js/')),
						htmlDist: resolve(rootDir, htmlDist || resolve(rootDir, dist || './dist/')),
						debug: cfg.debug,
						assembleStyles,
						pugConfigOverrides,
						jsConfigOverrides,
						sassConfigOverrides: {
							...(Effect.runSync(getSassFileConfig(rootDir)) || {}),
							...sassConfigOverrides,
						},
						onStart: cfg.onStart,
						onBuildComplete: cfg.onBuildComplete,
						onUpdate: cfg.onUpdate,
						onError: cfg.onError,
						onWatchUpdate: cfg.onWatchUpdate,
					};

					if (mode === 'watch' && !this.config.watchDir) {
						exec(this.config.onError);
						return yield* _(Effect.fail(new BundlerError('Can`t resolve watch directory.')));
					}
				}.bind(this),
			),
			Effect.mapError((error) =>
				error instanceof BundlerError ? error : new BundlerError('Configuration error', error),
			),
		) as Effect.Effect<void, BundlerError>;
	}

	private writeDistFiles(dist: string, compiledData: any[]) {
		Object.values(compiledData).forEach(({ fileContent, fileName } = {}) => {
			if (fileContent === null) return;
			writeFileSync(path.join(dist, fileName), fileContent);
		});
	}

	private compile = (options: {
		filePaths: string[];
		type: string;
		renderFn: any;
		newFileExt?: string;
		dist: string;
		skipExtensions?: string[];
		assembleCompilation?: any;
	}): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				const {
					filePaths,
					type,
					renderFn,
					newFileExt,
					dist,
					skipExtensions = [],
					assembleCompilation,
				} = options;

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
											// Stop spinner first
											if (this.currentSpinner) {
												this.currentSpinner.fail('Compilation failed');
												this.currentSpinner = null;
											}
											this.lastBuildSucceeded = false; // Mark build as failed

											// Output the error details (sass/pug do this themselves but we caught it)
											console.error(error.toString());

											// Re-throw to stop compilation
											throw error;
										}
									}

									return res;
								},
								catch: (error) => {
									// Don't wrap compilation errors - just propagate them
									if (error instanceof Error) {
										return error;
									}
									return new BundlerError(`${type} compilation failed`, error);
								},
							}),
						),
					),
				);

				if (
					this.constants.compilationTypes.css === type &&
					this.config.assembleStyles &&
					!assembleCompilation
				) {
					this.stylesToAssemble = [...this.stylesToAssemble, ...compiledData];
					return;
				}

				this.writeDistFiles(dist, compiledData);
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private processHTMLTemplate(filePath: string, visitedFiles = new Set<string>()): string {
		if (visitedFiles.has(filePath)) {
			throw new Error(`Dependency cycle detected in file ${filePath}`);
		}

		visitedFiles.add(filePath);

		let content = fs.readFileSync(filePath, 'utf-8');
		const includeRegex = /<!--\s*@include\s+['"](.+?)['"]\s*-->/g;

		let match;
		while ((match = includeRegex.exec(content)) !== null) {
			const includeFile = match[1];
			const includePath = path.resolve(path.dirname(filePath), includeFile);
			if (!existsSync(includePath)) {
				throw new BundlerError(`File ${includeFile} not found`);
			}
			const includeContent = this.processHTMLTemplate(includePath, visitedFiles);
			content = content.replace(match[0], includeContent);
		}

		visitedFiles.delete(filePath);
		return content;
	}

	private compileStyles = (): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				this.stylesToAssemble = [];
				yield* _(this.reporter.debugLog('Styles compilation'));
				yield* _(createDir(this.config.cssDist));

				yield* _(
					Effect.catchAll(
						this.compile({
							filePaths: this.config.sassFiles,
							type: this.constants.compilationTypes.css,
							newFileExt: this.constants.extDist.css,
							dist: this.config.cssDist,
							renderFn: (filePath) =>
								sass.compile(filePath, {
									style: 'compressed',
									...this.config.sassConfigOverrides,
								})?.css,
						}),
						(error) =>
							Effect.gen(
								function* (_) {
									// Error already logged in the try-catch block above
									// Just propagate it
									return yield* _(Effect.fail(error));
								}.bind(this),
							),
					),
				);
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private compilePug = (): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				yield* _(this.reporter.debugLog('Pug/html compilation'));

				const htmlFilesIsArray = Array.isArray(this.config.htmlFiles);

				if (!htmlFilesIsArray || !this.config.htmlFiles.length) {
					yield* _(this.reporter.debugLog("warning: HTML/pug files doesn't provided"));
					return;
				}

				const sitemap = this.config.htmlFiles
					?.filter((file) => fs.lstatSync(file).isFile())
					.map((file) => path.basename(file).replace(/\.pug$/, this.constants.extDist.html));

				yield* _(
					Effect.catchAll(
						this.compile({
							type: this.constants.compilationTypes.pug,
							filePaths: this.config.htmlFiles,
							newFileExt: this.constants.extDist.html,
							dist: this.config.distDir,
							renderFn: (filePath, fileExtname) => {
								const fullPath = path.resolve(filePath);
								const isFile = fs.lstatSync(fullPath).isFile();

								if (path.basename(fullPath).startsWith('._')) return null;
								if (!isFile) {
									Effect.runSync(this.reporter.debugLog(`Skipping: ${fullPath} is a directory.`));
									return null;
								}

								if (fileExtname === this.constants.extDist.html) {
									return this.processHTMLTemplate(filePath);
								}

								return pug.renderFile(fullPath, {
									pretty: false,
									cache: false,
									compileDebug: this.config.debug,
									sitemap,
									readFileSync,
									env: this.config.production ? 'production' : 'development',
									...this.config.pugConfigOverrides,
								});
							},
						}),
						(error) =>
							Effect.gen(
								function* (_) {
									// Error already logged in the try-catch block
									return yield* _(Effect.fail(error));
								}.bind(this),
							),
					),
				);
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private compileScripts = (): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				this.importedCSSToAssemble = {};
				yield* _(this.reporter.debugLog('Scripts compilation'));
				yield* _(createDir(this.config.jsDist));

				const result = yield* _(
					Effect.tryPromise({
						try: () =>
							Bun.build({
								entrypoints: this.config.jsFiles,
								outdir: this.config.jsDist,
								minify: this.config.production,
								format: 'esm',
								...this.config.jsConfigOverrides,
							}),
						catch: (error) => {
							// Stop spinner first
							if (this.currentSpinner) {
								this.currentSpinner.fail('Compilation failed');
								this.currentSpinner = null;
							}
							this.lastBuildSucceeded = false; // Mark build as failed

							// Output the Bun build error - show full details
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
					// Output errors first
					result?.logs?.forEach((message) => {
						console.error(String(message));
					});

					// Then stop spinner
					if (this.currentSpinner) {
						this.currentSpinner.fail('Compilation failed');
						this.currentSpinner = null;
					}
					this.lastBuildSucceeded = false; // Mark build as failed

					return yield* _(Effect.fail(new BundlerError('Script compilation failed')));
				}

				const importedCSS = result.outputs.filter(
					(output) => path.extname(output.path) === this.constants.extDist.css,
				);

				if (importedCSS.length && this.config.cssDist && !this.config.assembleStyles) {
					importedCSS.forEach((asset) => {
						const cssModules = path.join(this.config.cssDist, './modules');
						Effect.runSync(createDir(cssModules));
						renameSync(asset.path, path.join(cssModules, 'modules.css'));
					});
				}

				if (this.config.assembleStyles) {
					this.importedCSSToAssemble = Object.fromEntries(
						importedCSS.map((asset) => {
							if (this.importedCSSToAssemble[asset.hash]) {
								return [asset.hash, this.importedCSSToAssemble[asset.hash]];
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
					this.importedCSSToAssemble = {};
				}
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private assembleStyles = (): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				if (!this.config.assembleStyles) return;

				yield* _(this.reporter.debugLog('Styles assembling'));

				let distFileContent = '';
				const distFileURL = path.resolve(this.config.assembleStyles);

				if (!Object.values(this.importedCSSToAssemble).length && !this.stylesToAssemble?.length) {
					if (existsSync(distFileURL)) {
						yield* _(removeFile(distFileURL));
					}
					return;
				}

				const concatFileContent = (content: string, fileName: string) => {
					distFileContent += `\n\n/* @${fileName} */\n`;
					distFileContent += content;
				};

				Object.values(this.importedCSSToAssemble)?.forEach(({ fileContent, fileName, fileURL }) => {
					if (!fileContent) return;
					concatFileContent(fileContent, fileName);
					if (existsSync(fileURL)) {
						Effect.runSync(removeFile(fileURL));
					}
				});

				this.stylesToAssemble?.forEach(({ fileContent, fileName }) => {
					if (!fileContent) return;
					concatFileContent(fileContent, fileName);
				});

				yield* _(createFile(distFileURL, distFileContent));

				yield* _(
					this.compile({
						filePaths: [distFileURL],
						type: this.constants.compilationTypes.css,
						newFileExt: this.constants.extDist.css,
						dist: path.dirname(distFileURL),
						assembleCompilation: true,
						renderFn: (filePath) => {
							return sass.compile(filePath, {
								style: 'compressed',
								...this.config.sassConfigOverrides,
							})?.css;
						},
					}),
				);
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private transferStatics = (): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				yield* _(this.reporter.debugLog('Bundling statics'));
				const staticData = this.config.staticFolders;

				yield* _(
					Effect.all(
						staticData.map((folderPath) =>
							Effect.tryPromise({
								try: async () => {
									const fsPromises = (await import('fs/promises')).default;
									if (!fs.existsSync(folderPath)) {
										throw new BundlerError(`${folderPath} doesn't exist`);
									}

									const folderName = path.basename(folderPath);
									Effect.runSync(removeDir(path.join(this.config.distDir, folderName)));

									return fsPromises.cp(folderPath, path.join(this.config.distDir, folderName), {
										recursive: true,
									});
								},
								catch: (error) => new BundlerError('Failed to transfer statics', error),
							}),
						),
					),
				);
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private isFileChangedDuringWatch(params: {
		extname?: string[];
		folder?: string[];
		isWatchMode: boolean;
	}): boolean {
		if (!params.isWatchMode) return true;

		const changedFiles = Object.keys(this.watchChangedFileList);
		const changedExt = Object.keys(this.watchChangedExtList);

		if (!changedFiles?.length) return false;

		if (params.extname?.length && changedExt.find((fileExt) => params.extname!.includes(fileExt))) {
			return true;
		}

		if (
			params.folder?.length &&
			changedFiles.find((filePath) =>
				params.folder!.find((folderPath) => path.resolve(filePath).startsWith(path.resolve(folderPath))),
			)
		) {
			return true;
		}

		return false;
	}

	private bundle = (options: { mode?: string }): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				const startTime = Date.now();
				const isWatchMode = options.mode === 'watch';

				// In watch mode, clear previous "Done" message if last build succeeded
				if (isWatchMode && this.lastBuildSucceeded) {
					process.stdout.moveCursor(0, -1);
					process.stdout.clearLine(0);
				}

				// In watch mode, if previous build failed and now starting new build,
				// add many empty lines to "clear" the error from view
				if (isWatchMode && !this.lastBuildSucceeded) {
					console.log('\n'.repeat(50));
				}

				// Create fresh spinner for each build and store it
				this.currentSpinner = this.reporter.spinner(isWatchMode ? '⟳ Rebuilding' : 'Building');
				this.currentSpinner.start();

				if (!isWatchMode) {
					yield* _(this.reporter.debugLog('Clearing old dist.'));
					yield* _(removeDir(this.config.distDir));
					yield* _(createDir(this.config.distDir));
				}

				const needCompile = (params: { extname?: string[]; folder?: string[] }) => {
					return this.isFileChangedDuringWatch({ ...params, isWatchMode });
				};

				const { htmlLike, styles, scripts } = this.constants.extensions;

				const modulesToCompile = {
					styles: this.config.sassFiles?.length && needCompile({ extname: styles }),
					scripts: this.config.jsFiles?.length && needCompile({ extname: scripts }),
					htmlLike: this.config.htmlFiles?.length && needCompile({ extname: htmlLike }),
					statics: this.config.staticFolders?.length && needCompile({ folder: this.config.staticFolders }),
				};

				if (modulesToCompile.htmlLike) yield* _(this.compilePug());
				if (modulesToCompile.styles) yield* _(this.compileStyles());
				if (modulesToCompile.scripts || (modulesToCompile.styles && this.config.assembleStyles))
					yield* _(this.compileScripts());
				if ((modulesToCompile.scripts || modulesToCompile.styles) && this.config.assembleStyles)
					yield* _(this.assembleStyles());

				if (this.config.assembleStyles && !this.config.jsFiles?.length && !this.config.sassFiles?.length) {
					yield* _(this.reporter.warn('No styles to assemble'));
				}

				if (modulesToCompile.statics) yield* _(this.transferStatics());

				const doneTime = Date.now();
				const message = `Done in ${doneTime - startTime}ms`;

				// Succeed always creates a new line (which is what we want in watch mode)
				this.currentSpinner.succeed(message);
				this.currentSpinner = null;
				this.lastBuildSucceeded = true; // Mark build as successful

				exec(this.config.onBuildComplete);
				this.config.onUpdate?.({
					changes: {
						html: modulesToCompile.htmlLike,
						styles: modulesToCompile.styles,
						scripts: modulesToCompile.scripts,
						staticFolders: modulesToCompile.statics,
					},
				});
			}.bind(this),
		).pipe(
			Effect.catchAll((error) => {
				// Ensure spinner is stopped on any error (if not already stopped in compile)
				if (this.currentSpinner) {
					this.currentSpinner.fail('Build failed');
					this.currentSpinner = null;
				}
				this.lastBuildSucceeded = false; // Mark build as failed
				// Don't re-throw - error already logged
				return Effect.void;
			}),
		) as unknown as Effect.Effect<void, BundlerError>;

	build = (cfg: BundlerConfig): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				yield* _(this.setConfig(cfg));
				exec(this.config.onStart);
				yield* _(this.bundle({ mode: 'build' }));
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private watchBuild = (): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				yield* _(this.bundle({ mode: 'watch' }));
				this.config.onWatchUpdate?.({
					watchChangedExtList: this.watchChangedExtList,
					watchChangedFileList: this.watchChangedFileList,
				});
				this.watchChangedFileList = {};
				this.watchChangedExtList = {};
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
	private registerWatchFileChanged(fileUrl: string) {
		const extName = path.extname(fileUrl);
		if (!extName) return;

		this.watchChangedFileList[fileUrl] = true;
		this.watchChangedExtList[extName] = true;
	}

	private handleWatchChangeFile(fileUrl: string, reloadInterval?: number) {
		const interval = typeof reloadInterval === 'number' && reloadInterval >= 0 ? reloadInterval : 300;
		clearTimeout(this.watchDebounce);
		this.registerWatchFileChanged(fileUrl);
		this.watchDebounce = setTimeout(() => {
			Effect.runPromise(this.watchBuild()).catch((error) => {
				// Error already handled in compile() - spinner already marked as failed
			});
		}, interval);
	}

	private unwatch() {
		if (this.watcher) {
			this.watcher.close();
			this.watcher = null;
		}
	}

	watch = (cfg: BundlerConfig): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_) {
				yield* _(this.setConfig(cfg, 'watch'));

				this.watchChangedFileList = {};
				this.watchChangedExtList = {};

				if (!fs.existsSync(this.config.watchDir)) {
					exec(this.config.onError);
					return yield* _(Effect.fail(new BundlerError('Can`t resolve watch directory.')));
				}

				this.unwatch();
				this.watcher = fs.watch(this.config.watchDir, { recursive: true }, (eventType, fileName) => {
					Effect.runSync(this.reporter.debugLog(eventType));
					const fileUrl = path.resolve(this.config.watchDir, fileName);
					this.handleWatchChangeFile(fileUrl, eventType === 'rename' ? 100 : undefined);
				});

				exec(this.config.onStart);
				// Initial build (not in watch mode)
				yield* _(this.bundle({ mode: 'build' }));
				// Then start watch mode
				yield* _(this.bundle({ mode: 'watch' }));
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;
}
export const makeBundler = (reporter: Reporter, constants: Constants): Bundler => {
	const impl = new BundlerImpl(reporter, constants);
	return {
		build: impl.build,
		watch: impl.watch,
	};
};

export const BundlerLive = Layer.effect(
	BundlerService,
	Effect.all([ReporterService, ConstantsService]).pipe(
		Effect.map(([reporter, constants]) => makeBundler(reporter, constants)),
	),
);
