import { version } from './package.json';

/* eslint-disable prefer-template */
import Bun from 'bun';
import path, { basename, extname, resolve } from 'path';
import fsPromises from 'fs/promises';
import fs, { existsSync, readFileSync, renameSync, statSync, writeFileSync } from 'fs';
import chalk from 'chalk';
import {
	createDir,
	exec,
	getDirFiles,
	getFilesList,
	getSassFileConfig,
	removeDir,
	createFile,
	removeFile,
} from './utils.mjs';
import { Reporter } from './modules/reporter';
import { constants } from './modules/constants';

const pug = require('pug');
const sass = require('sass');

export class Bundler extends Reporter {
	constructor() {
		super();

		this.watchDebounce = null;
		this.config = {
			rootDir: process.cwd(),
		};
	}

	setConfig(cfg, mode) {
		if (!cfg) this.errThrow('Config is not defined');

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

		if (!this.config.initialCfg) this.config.initialCfg = cfg;

		this.config.production = cfg.production;

		const prepareFiles = (entry, extensions) => {
			const fallback = [entry];

			if (typeof entry !== 'string') return fallback;

			const entryStat = statSync(entry);
			const isDirectory = entryStat?.isDirectory();

			return isDirectory ? [getDirFiles(entry, true, extensions)] : fallback;
		};

		this.config.htmlFiles = prepareFiles(exec(html)).flat();
		this.config.sassFiles = prepareFiles(exec(sass)).flat();
		this.config.jsFiles = prepareFiles(exec(js)).flat();
		this.config.staticFolders = prepareFiles(exec(staticFolders)).flat();

		this.config.watchDir = resolve(this.config.rootDir, cfg.watchDir || './src/');
		this.config.distDir = resolve(this.config.rootDir, dist || './dist/');
		this.config.cssDist = resolve(this.config.rootDir, cssDist || path.join(this.config.distDir, './css/'));
		this.config.jsDist = resolve(this.config.rootDir, jsDist || path.join(this.config.distDir, './js/'));
		this.config.htmlDist = resolve(this.config.rootDir, htmlDist || this.config.distDir);
		this.config.onStart = cfg.onStart;
		this.config.onBuildComplete = cfg.onBuildComplete;
		this.config.onUpdate = cfg.onUpdate;
		this.config.onError = cfg.onError || cfg.onCriticalError; //legacy def
		this.config.onWatchUpdate = cfg.onWatchUpdate; //legacy def
		this.config.debug = cfg.debug;
		this.config.refresh = () => {
			this.setConfig(this.config.initialCfg, mode);
		};

		this.config.assembleStyles = assembleStyles;
		this.config.pugConfigOverrides = pugConfigOverrides;
		this.config.jsConfigOverrides = jsConfigOverrides;
		this.config.sassConfigOverrides = {
			...(getSassFileConfig.call(this, this.config.rootDir) || {}),
			...sassConfigOverrides,
		};

		if (mode === 'watch') {
			if (!this.config.watchDir) {
				exec(this.config.onError);
				this.errThrow('Can`t resolve watch directory.');
			}
		}
	}

	writeDistFiles(dist, compiledData) {
		Object.values(compiledData).forEach(({ fileContent, fileName } = {}) => {
			if (!fileContent === null) return;
			writeFileSync(path.join(dist, fileName), fileContent);
		});
	}

	async compile({ filePaths, type, renderFn, newFileExt, dist, skipExtensions = [], assembleCompilation }) {
		if (!Array.isArray(filePaths) || !filePaths.length) {
			this.errThrow(`${type} - No files to compile`);
		}

		const compiledData = await Promise.all(
			filePaths.map(async (filePath) => {
				if (!existsSync(filePath)) {
					this.errThrow(`${type} compilation: File ${filePath} doesn't exist`);
				}
				const fileExtname = extname(filePath);
				let fileName = basename(filePath);
				if (newFileExt) fileName = fileName.replace(path.extname(filePath), newFileExt);

				const res = {
					fileName,
					path: filePath,
				};

				if (skipExtensions && skipExtensions.includes(fileExtname)) {
					res.fileContent = readFileSync(filePath, 'utf-8');
				} else {
					res.fileContent = renderFn(filePath, fileExtname);
				}

				return res;
			}),
		);

		if (constants.compilationTypes.css === type && this.config.assembleStyles && !assembleCompilation) {
			if (!this.stylesToAssemble) this.stylesToAssemble = [];
			this.stylesToAssemble = [...this.stylesToAssemble, ...compiledData];
			return;
		}

		this.writeDistFiles(dist, compiledData); // refactor this, need to be separate method to wrire files
	}

	// assemble all comppiled files into one file
	async assembleStyles() {
		if (!this.config.assembleStyles) return;

		this.debugLog('Styles assembling');

		let distFileContent = '';
		const distFileURL = path.resolve(this.config.assembleStyles);

		if (!Object.values(this.importedCSSToAssemble).length && !this.stylesToAssemble?.length) {
			if (existsSync(distFileURL)) {
				removeFile(distFileURL);
			}
			return;
		}

		const concatFileContent = (content, fileName) => {
			distFileContent += `\n\n/* @${fileName} */\n`;
			distFileContent += content;
		};

		Object.values(this.importedCSSToAssemble)?.forEach(({ fileContent, fileName, fileURL }) => {
			//refactor- move concationation to the scripts method & check cache before operations
			// anyway, all module styles go to the one file. so we can take it from there
			//
			if (!fileContent) return;
			concatFileContent(fileContent, fileName);
			if (existsSync(fileURL)) {
				removeFile(fileURL);
			}
		});

		this.stylesToAssemble?.forEach(({ fileContent, fileName }) => {
			//refactor- check cache before operation
			if (!fileContent) return;
			concatFileContent(fileContent, fileName);
		});

		createFile({ url: distFileURL, content: distFileContent });

		await this.compile({
			filePaths: [distFileURL],
			type: constants.compilationTypes.css,
			newFileExt: constants.extDist.css,
			dist: path.dirname(distFileURL),
			assembleCompilation: true,
			renderFn: (filePath) => {
				return sass.compile(filePath, {
					style: 'compressed',
					...this.config.sassConfigOverrides,
				})?.css;
			},
		});
	}

	processHTMLTemplate(filePath, visitedFiles = new Set()) {
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
				this.errThrow(`File ${includeFile} not found`);
				return;
			}
			const includeContent = this.processHTMLTemplate(includePath, visitedFiles);
			content = content.replace(match[0], includeContent);
		}

		visitedFiles.delete(filePath);
		return content;
	}

	async compileStyles() {
		this.stylesToAssemble = [];
		this.debugLog('Styles compilation');
		createDir(this.config.cssDist);
		try {
			await this.compile({
				filePaths: this.config.sassFiles,
				type: constants.compilationTypes.css,
				newFileExt: constants.extDist.css,
				dist: this.config.cssDist,
				renderFn: (filePath) =>
					sass.compile(filePath, {
						style: 'compressed',
						...this.config.sassConfigOverrides,
					})?.css,
			});
		} catch (error) {
			this.errLog('Error while compiling css/scss files');
			this.errThrow(error);
		}
	}

	async compilePug() {
		this.debugLog('Pug/html compilation');

		const htmlFilesIsArray = Array.isArray(this.config.htmlFiles);

		if (!htmlFilesIsArray || !this.config.htmlFiles.length) {
			this.debugLog("warning: HTML/pug files doesn't provided");
			return;
		}

		const sitemap = this.config.htmlFiles
			?.filter((file) => fs.lstatSync(file).isFile())
			.map((file) => path.basename(file).replace(/\.pug$/, constants.extDist.html));

		try {
			await this.compile({
				type: constants.compilationTypes.pug,
				filePaths: this.config.htmlFiles,
				skipExtensions: false,
				newFileExt: constants.extDist.html,
				dist: this.config.distDir,
				renderFn: (filePath, fileExtname) => {
					const fullPath = path.resolve(filePath);
					const isFile = fs.lstatSync(fullPath).isFile();

					if (!isFile) {
						this.debugLog(`Skipping: ${fullPath} is a directory.`);
						return null;
					}

					if (fileExtname === constants.extDist.html) {
						const templatedHTML = this.processHTMLTemplate(filePath);
						return templatedHTML;
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
			});
		} catch (error) {
			this.errLog('Error while compiling pug files');
			this.errThrow(error);
		}
	}

	async compileScripts() {
		if (!this.importedCSSToAssemble) this.importedCSSToAssemble = {};
		this.debugLog('Scripts compilation');
		createDir(this.config.jsDist);

		try {
			const result = await Bun.build({
				entrypoints: this.config.jsFiles,
				outdir: this.config.jsDist,
				minify: this.config.production,
				format: 'esm',
				...this.config.jsConfigOverrides,
			});

			if (!result.success) {
				result?.logs?.forEach((message) => {
					this.errLog(message);
				});
				this.errThrow();
			}

			const importedCSS = result.outputs.filter(
				(output) => path.extname(output.path) === constants.extDist.css,
			);

			if (importedCSS.length && this.config.cssDist && !this.config.assembleStyles) {
				importedCSS.forEach((asset) => {
					const cssModules = path.join(this.config.cssDist, './modules');
					createDir(cssModules);
					renameSync(asset.path, path.join(cssModules, 'modules.css')); // move file to modules
				});
			}

			if (this.config.assembleStyles) {
				this.importedCSSToAssemble = Object.fromEntries(
					importedCSS.map((asset) => {
						if (this.importedCSSToAssemble[asset.hash])
							return [asset.hash, this.importedCSSToAssemble[asset.hash]];

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
		} catch (error) {
			this.errLog('Error while compiling js files');
			this.errThrow(error);
		}
	}

	async transferStatics() {
		this.debugLog('Bundling statics');
		const staticData = this.config.staticFolders;

		await Promise.all(
			staticData.map((folderPath) => {
				if (!fs.existsSync(folderPath)) this.errThrow(`${folderPath} doesn't exist`);

				const folderName = path.basename(folderPath);
				removeDir(path.join(this.config.distDir, folderName));

				return fsPromises.cp(folderPath, path.join(this.config.distDir, folderName), {
					recursive: true,
				});
			}),
		);
	}

	isFileChangedDuringWatch({ extname, folder, isWatchMode }) {
		if (!isWatchMode) return true;

		const changedFiles = Object.keys(this.watchChangedFileList);
		const changedExt = Object.keys(this.watchChangedExtList);

		if (!changedFiles?.length) return false;

		if (extname?.length && changedExt.find((fileExt) => extname.includes(fileExt))) return true;

		if (
			folder?.length &&
			changedFiles.find((filePath) =>
				folder.find((folderPath) => path.resolve(filePath).startsWith(path.resolve(folderPath))),
			)
		) {
			return true;
		} else return false;
	}

	async bundle({ onComplete, mode } = {}) {
		try {
			const isWatchMode = mode === 'watch';

			if (isWatchMode) {
				this.log(`\n${chalk.reset('| ⏳ Refreshing...')}`);
			} else {
				this.log(
					chalk.dim(
						`# v.${version}, Node ${process.version} Support: https://github.com/jsqrt/bun-bundler/issues`,
					),
				);
				this.log(`\n${chalk.reset('| ✨ Bundling...')}`);
			}
			const start = Date.now();

			if (!isWatchMode) {
				this.debugLog('Clearing old dist.');
				removeDir(this.config.distDir);
				createDir(this.config.distDir);
			}

			const needCompile = ({ extname, folder }) => {
				if (this.isFileChangedDuringWatch({ extname, folder, isWatchMode })) return true;
			};

			const { htmlLike, styles, scripts } = constants.extensions;

			const modulesToCompile = {
				styles: this.config.sassFiles?.length && needCompile({ extname: styles }),
				scripts: this.config.jsFiles?.length && needCompile({ extname: scripts }),
				htmlLike: this.config.htmlFiles?.length && needCompile({ extname: htmlLike }),
				statics: this.config.staticFolders?.length && needCompile({ folder: this.config.staticFolders }),
			};

			if (modulesToCompile.htmlLike) await this.compilePug();
			if (modulesToCompile.styles) await this.compileStyles();
			if (modulesToCompile.scripts || (modulesToCompile.styles && this.config.assembleStyles))
				await this.compileScripts();
			if ((modulesToCompile.scripts || modulesToCompile.styles) && this.config.assembleStyles)
				await this.assembleStyles();

			if (this.config.assembleStyles && !this.config.jsFiles?.length && !this.config.sassFiles?.length) {
				this.warn('warning: assemble styles: No styles to assemble.');
			}

			if (modulesToCompile.statics) await this.transferStatics();

			const end = Date.now();
			this.log(`${chalk.reset(`| ✅ Done in ${end - start}ms`)}`);

			exec(onComplete);
			this.config.onUpdate?.({
				changes: {
					html: modulesToCompile.htmlLike,
					styles: modulesToCompile.styles,
					scripts: modulesToCompile.scripts,
					staticFolders: modulesToCompile.statics,
				},
			});
		} catch (error) {
			this.errLog(error.message);
		}
	}

	build(cfg) {
		this.setConfig(cfg);
		exec(this.config.onStart);
		this.bundle({
			mode: 'build',
			onComplete: () => exec(this.config.onBuildComplete),
		});
	}

	watchBuild() {
		this.config.refresh();

		this.bundle({
			mode: 'watch',
			onComplete: () => {
				this.config.onWatchUpdate?.({
					watchChangedExtList: this.watchChangedExtList,
					watchChangedFileList: this.watchChangedFileList,
				});
				this.watchChangedFileList = {};
				this.watchChangedExtList = {};
			},
		});
	}

	unwatch() {
		if (this.watcher) {
			this.watcher.close();
			this.watcher = null;
		}
	}

	registerWatchFileChanged(fileUrl) {
		const extName = path.extname(fileUrl);
		if (!extName) return;

		this.watchChangedFileList[fileUrl] = true;
		this.watchChangedExtList[extName] = true;
	}

	handleWatchChangeFile(fileUrl, reloadInterval) {
		const interval = typeof reloadInterval === 'number' && reloadInterval >= 0 ? reloadInterval : 300;
		clearTimeout(this.watchDebounce);
		this.registerWatchFileChanged(fileUrl);
		this.watchDebounce = setTimeout(this.watchBuild.bind(this), interval);
	}

	watch(cfg) {
		try {
			this.setConfig(cfg, 'watch');
			exec(this.config.onStart);

			this.watchChangedFileList = {};
			this.watchChangedExtList = {};

			if (!fs.existsSync(this.config.watchDir)) {
				exec(this.config.onError);
				return this.errThrow('Can`t resolve watch directory.');
			}

			this.unwatch();
			this.watcher = fs.watch(this.config.watchDir, { recursive: true }, (eventType, fileName) => {
				this.debugLog(eventType);
				const fileUrl = path.resolve(this.config.watchDir, fileName);
				this.handleWatchChangeFile(fileUrl, eventType === 'rename' && 100);
			});
			this.bundle({
				onComplete: () => exec(this.config.onBuildComplete),
			});
		} catch (error) {
			this.errLog(error.message);
		}
		return null;
	}
}

Bundler.utils = {
	getDirFiles,
	getFilesList,
};

export default Bundler;
