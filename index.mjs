/* eslint-disable prefer-template */
import Bun from 'bun';
import path, { basename, extname, resolve } from 'path';
import fsPromises from 'fs/promises';
import fs, { existsSync, readFileSync, writeFileSync } from 'fs';
import { createDir, exec, getDirFiles, getFilesList, getSassFileConfig, removeDir } from './utils.mjs';
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

	async compile({ filePaths, type, renderFn, newFileExt, dist, skipExtensions = [] }) {
		if (!filePaths.length) {
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
					res.compilationRes = readFileSync(filePath, 'utf-8');
				} else {
					res.compilationRes = renderFn(filePath);
				}

				return res;
			}),
		);

		const createDistFiles = () => {
			Object.values(compiledData).forEach(({ compilationRes, fileName } = {}) => {
				if (!compilationRes === null) return;
				writeFileSync(path.join(dist, fileName), compilationRes);
			});
		};

		createDistFiles();
	}

	async compileStyles() {
		this.debugLog('Styles compilation');
		createDir(this.config.cssDist);
		try {
			await this.compile({
				filePaths: this.config.sassFiles,
				type: 'CSS',
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

		const sitemap = this.config.htmlFiles
			.filter((file) => fs.lstatSync(file).isFile())
			.map((file) => path.basename(file).replace(/\.pug$/, constants.extDist.html));

		try {
			await this.compile({
				type: 'PUG',
				filePaths: this.config.htmlFiles,
				skipExtensions: constants.extensions.html,
				newFileExt: constants.extDist.html,
				dist: this.config.distDir,
				renderFn: (filePath) => {
					const fullPath = path.resolve(filePath);
					const isFile = fs.lstatSync(fullPath).isFile();

					if (!isFile) {
						this.debugLog(`Skipping: ${fullPath} is a directory.`);
						return null;
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

	setConfig(cfg, mode) {
		if (!cfg) this.errThrow('Config is not defined');
		if (!cfg.dist) this.errThrow('Dist directory is not defined');
		if (!cfg.html) this.errThrow('Html/pug directory is not defined');

		const {
			html = [],
			dist = [],
			sass = [],
			js = [],
			staticFolders = [],
			cssDist = '',
			jsDist = '',
			htmlDist = '',
			pugConfigOverrides = {},
			jsConfigOverrides = {},
			sassConfigOverrides = {},
		} = cfg;

		if (!this.config.initialCfg) this.config.initialCfg = cfg;

		this.config.production = cfg.production;

		this.config.htmlFiles = exec(html);
		this.config.sassFiles = exec(sass);
		this.config.jsFiles = exec(js);
		this.config.staticFolders = exec(staticFolders);

		this.config.watchDir = resolve(this.config.rootDir, cfg.watchDir || './src/');
		this.config.distDir = resolve(this.config.rootDir, dist || './dist/');
		this.config.cssDist = resolve(this.config.rootDir, cssDist || this.config.distDir + './css/');
		this.config.jsDist = resolve(this.config.rootDir, jsDist || this.config.distDir + './js/');
		this.config.htmlDist = resolve(this.config.rootDir, htmlDist || this.config.distDir);
		this.config.onStart = cfg.onStart;
		this.config.onBuildComplete = cfg.onBuildComplete;
		this.config.onCriticalError = cfg.onCriticalError;
		this.config.debug = cfg.debug;
		this.config.refresh = () => {
			this.setConfig(this.config.initialCfg, mode);
		};

		this.config.pugConfigOverrides = pugConfigOverrides;
		this.config.jsConfigOverrides = jsConfigOverrides;
		this.config.sassConfigOverrides = {
			...(getSassFileConfig.call(this, this.config.rootDir) || {}),
			...sassConfigOverrides,
		};

		if (mode === 'watch') {
			if (!this.config.watchDir) {
				exec(this.config.onCriticalError);
				this.errThrow('Can`t resolve watch directory.');
			}
		}
	}

	async bundle({ onBuildComplete, mode } = {}) {
		try {
			const isWatchMode = mode === 'watch';

			if (isWatchMode) {
				this.log('\n');
				this.log('[⏳ Refreshing... ]');
			} else {
				this.log('\n');
				this.log('[✨ Starting... ]');
			}
			const start = Date.now();

			if (!isWatchMode) {
				this.debugLog('Clearing old dist.');
				removeDir(this.config.distDir);
				createDir(this.config.distDir);
			}

			const needCompile = ({ extname, folder }) =>
				this.isFileChangedDuringWatch({ extname, folder, isWatchMode });

			const { htmlLike, styles, scripts } = constants.extensions;

			if (needCompile({ extname: htmlLike })) await this.compilePug();
			if (needCompile({ extname: styles })) await this.compileStyles();
			if (needCompile({ extname: scripts })) await this.compileScripts();
			if (needCompile({ folder: this.config.staticFolders })) await this.transferStatics();

			const end = Date.now();
			this.log(`[✅ Done ${end - start}ms ]`);

			exec(onBuildComplete);
		} catch (error) {
			this.errLog(error.message);
		}
	}

	build(cfg) {
		this.setConfig(cfg);
		exec(this.config.onStart);
		this.bundle({
			mode: 'build',
			onBuildComplete: () => exec(this.config.onBuildComplete),
		});
	}

	watchBuild() {
		this.config.refresh();

		this.bundle({
			mode: 'watch',
			onBuildComplete: () => {
				this.watchChangedFileList = {};
				this.watchChangedExtList = {};
			},
		});
		exec(this.config.onWatchUpdate);
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
				exec(this.config.onCriticalError);
				return this.errThrow('Can`t resolve watch directory.');
			}

			this.unwatch();
			this.watcher = fs.watch(this.config.watchDir, { recursive: true }, (eventType, fileName) => {
				this.debugLog(eventType);
				const fileUrl = path.resolve(this.config.watchDir, fileName);
				this.handleWatchChangeFile(fileUrl, eventType === 'rename' && 100);
			});
			this.bundle({
				onBuildComplete: () => exec(this.config.onBuildComplete),
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
