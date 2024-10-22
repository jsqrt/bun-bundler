/* eslint-disable prefer-template */
import Bun from 'bun';
import path, { basename, extname, resolve } from 'path';
import fsPromises from 'fs/promises';
import fs, { existsSync, readFileSync, writeFileSync } from 'fs';
import { createDir, exec, getDirFiles, getSassFileConfig, removeDir } from './utils.mjs';
import { Reporter } from './modules/reporter';

const pug = require('pug');
const sass = require('sass');

/**
 * The `Bundler` class is responsible for compiling and bundling various types of assets, including HTML, CSS, and JavaScript files. It extends the `Reporter` class, which provides logging and error handling functionality.
 *
 * The `Bundler` class has the following key features:
 * - Supports various file types and extensions for HTML, CSS, and JavaScript files.
 * - Provides methods for compiling and bundling these asset types, including Pug templates, Sass/SCSS styles, and JavaScript files.
 * - Handles file watching and incremental rebuilds during development.
 * - Provides configuration options for customizing the build process, such as output directories, production mode, and callbacks for various build events.
 *
 * The `Bundler` class is designed to be used as part of a larger build system or development workflow, providing a flexible and extensible way to manage the compilation and bundling of web assets.
 */
export class Bundler extends Reporter {
	get SUPPORTED_EXTENSIONS() {
		return {
			html: ['.pug', '.html'],
			styles: ['.scss', '.css'],
			scripts: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
		};
	}

	/**
	 * Constructs a new instance of the `Bundler` class, which extends the `Reporter` class.
	 *
	 * The constructor initializes the following properties:
	 * - `watchDebounce`: Stores a reference to the debounce timer used for file watching.
	 * - `config`: An object that holds the configuration options for the `Bundler` instance, including the `rootDir` property which is set to the current working directory.
	 */
	constructor() {
		super();

		this.watchDebounce = null;
		this.config = {
			rootDir: process.cwd(),
		};
	}

	/**
	 * Compiles a set of files of a specific type (e.g. HTML, CSS, JavaScript) and writes the compiled output to a specified distribution directory.
	 *
	 * @param {Object} options - The options object for the compilation process.
	 * @param {string[]} options.filePaths - An array of file paths to be compiled.
	 * @param {string} options.type - The type of files being compiled (e.g. 'CSS', 'Pug', 'Scripts').
	 * @param {function(string): string} options.renderFn - A function that takes a file path and returns the compiled output.
	 * @param {string} [options.newFileExt] - The new file extension to be used for the compiled output files.
	 * @param {string} options.dist - The directory path where the compiled output files will be written.
	 * @param {string} [options.extensionSkip] - The file extension to skip during the compilation process.
	 * @returns {Promise<void>} - A Promise that resolves when the compilation process is complete.
	 */
	async compile({ filePaths, type, renderFn, newFileExt, dist, extensionSkip }) {
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

				if (extensionSkip && fileExtname === extensionSkip) {
					res.compilationRes = readFileSync(filePath, 'utf-8');
				} else {
					res.compilationRes = renderFn(filePath);
				}

				return res;
			}),
		);

		/**
		 * Writes the compiled output files to the specified distribution directory.
		 *
		 * @param {Object[]} compiledData - An array of objects containing the compiled output and file names.
		 * @param {string} compiledData[].compilationRes - The compiled output for the file.
		 * @param {string} compiledData[].fileName - The name of the compiled output file.
		 * @param {string} dist - The directory path where the compiled output files will be written.
		 */
		const createDistFiles = () => {
			Object.values(compiledData).forEach(({ compilationRes, fileName } = {}) => {
				if (!compilationRes === null) return;
				writeFileSync(path.join(dist, fileName), compilationRes);
			});
		};

		createDistFiles();
	}

	/**
	 * Compiles the Sass/SCSS files and writes the resulting CSS files to the specified distribution directory.
	 *
	 * @param {Object} options - The options object for the compilation process.
	 * @param {string[]} options.filePaths - An array of file paths to the Sass/SCSS files to be compiled.
	 * @param {string} options.type - The type of compilation being performed (e.g. 'CSS').
	 * @param {string} options.newFileExt - The new file extension to use for the compiled output files.
	 * @param {string} options.dist - The directory path where the compiled output files will be written.
	 * @param {function(string): {css: string}} options.renderFn - A function that takes a file path and returns the compiled CSS output.
	 * @returns {Promise<void>} - A Promise that resolves when the compilation process is complete.
	 */
	async compileStyles() {
		this.debugLog('Styles compilation');
		createDir(this.config.cssDist);
		try {
			await this.compile({
				filePaths: this.config.sassFiles,
				type: 'CSS',
				newFileExt: '.css',
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

	/**
	 * Compiles the Pug/HTML files and writes the resulting HTML files to the specified distribution directory.
	 *
	 * @param {Object} options - The options object for the compilation process.
	 * @param {string[]} options.filePaths - An array of file paths to the Pug/HTML files to be compiled.
	 * @param {string} options.extensionSkip - The file extension to skip during compilation.
	 * @param {string} options.type - The type of compilation being performed (e.g. 'Pug').
	 * @param {string} options.newFileExt - The new file extension to use for the compiled output files.
	 * @param {string} options.dist - The directory path where the compiled output files will be written.
	 * @param {function(string): string} options.renderFn - A function that takes a file path and returns the compiled HTML output.
	 * @returns {Promise<void>} - A Promise that resolves when the compilation process is complete.
	 */
	async compilePug() {
		this.debugLog('Pug/html compilation');

		const sitemap = this.config.htmlFiles
			.filter((file) => fs.lstatSync(file).isFile())
			.map((file) => path.basename(file).replace(/\.pug$/, '.html'));

		try {
			await this.compile({
				filePaths: this.config.htmlFiles,
				extensionSkip: '.html',
				type: 'Pug',
				newFileExt: '.html',
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

	/**
	 * Compiles the JavaScript files and writes the resulting JavaScript files to the specified distribution directory.
	 *
	 * @returns {Promise<void>} - A Promise that resolves when the compilation process is complete.
	 */
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

	/**
	 * Transfers the static files specified in the configuration to the distribution directory.
	 *
	 * This method iterates through the `staticFolders` configuration, copies each folder recursively to the
	 * distribution directory, and logs any errors that occur during the process.
	 *
	 * @returns {Promise<void>} - A Promise that resolves when the transfer of all static files is complete.
	 */
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

	/**
	 * Checks if a file has been changed during a watch mode operation.
	 *
	 * This function examines the list of changed files and file extensions to determine if a given file has been modified.
	 *
	 * @param {Object} options - The options object.
	 * @param {string[]} options.extname - The file extension(s) to check for changes.
	 * @param {string[]} options.folder - The folder path(s) to check for changes.
	 * @param {boolean} options.isWatchMode - Indicates whether the operation is in watch mode.
	 * @returns {boolean} - `true` if the file has been changed, `false` otherwise.
	 */
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

	/**
	 * Sets the configuration for the application.
	 *
	 * This method initializes the configuration object with the provided settings, including directories, file paths, and callback functions.
	 *
	 * @param {Object} cfg - The configuration object.
	 * @param {string} cfg.dist - The directory where the compiled output will be stored.
	 * @param {string} cfg.html - The directory containing the HTML/Pug files.
	 * @param {string} [cfg.sass] - The directory containing the Sass files.
	 * @param {string} [cfg.js] - The directory containing the JavaScript files.
	 * @param {string[]} [cfg.staticFolders] - An array of directories containing static assets.
	 * @param {string} [cfg.cssDist] - The directory where the compiled CSS files will be stored.
	 * @param {string} [cfg.jsDist] - The directory where the compiled JavaScript files will be stored.
	 * @param {string} [cfg.htmlDist] - The directory where the compiled HTML files will be stored.
	 * @param {function} [cfg.onStart] - A callback function to be executed when the build process starts.
	 * @param {function} [cfg.onBuildComplete] - A callback function to be executed when the build process completes.
	 * @param {function} [cfg.onCriticalError] - A callback function to be executed when a critical error occurs.
	 * @param {boolean} [cfg.debug] - A flag indicating whether debug mode is enabled.
	 * @param {string} [mode] - The mode of operation, either 'watch' or 'build'.
	 * @returns {void}
	 */
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

	/**
	 * Bundles the application assets, including HTML, CSS, JavaScript, and static files.
	 * This method can be used in both build and watch modes.
	 *
	 * @param {Object} [options] - The options object.
	 * @param {function} [options.onBuildComplete] - A callback function to be executed when the build process completes.
	 * @param {string} [options.mode] - The mode of operation, either 'watch' or 'build'.
	 * @returns {Promise<void>} - A Promise that resolves when the bundling process is complete.
	 */
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

			/**
			 * Checks if a file needs to be compiled based on the provided file extension or folder.
			 *
			 * @param {Object} options - The options object.
			 * @param {string} [options.extname] - The file extension to check.
			 * @param {string} [options.folder] - The folder to check.
			 * @returns {boolean} - `true` if the file needs to be compiled, `false` otherwise.
			 */
			const needCompile = ({ extname, folder }) =>
				this.isFileChangedDuringWatch({ extname, folder, isWatchMode });

			if (needCompile({ extname: this.SUPPORTED_EXTENSIONS.html })) await this.compilePug();
			if (needCompile({ extname: this.SUPPORTED_EXTENSIONS.styles })) await this.compileStyles();
			if (needCompile({ extname: this.SUPPORTED_EXTENSIONS.scripts })) await this.compileScripts();
			if (needCompile({ folder: this.config.staticFolders })) await this.transferStatics();

			const end = Date.now();
			this.log(`[✅ Done ${end - start}ms ]`);

			exec(onBuildComplete);
		} catch (error) {
			this.errLog(error.message);
		}
	}

	/**
	 * Builds the application by bundling the necessary assets.
	 *
	 * @param {Object} cfg - The configuration object.
	 * @returns {Promise<void>} - A Promise that resolves when the bundling process is complete.
	 */
	build(cfg) {
		this.setConfig(cfg);
		exec(this.config.onStart);
		this.bundle({
			mode: 'build',
			onBuildComplete: () => exec(this.config.onBuildComplete),
		});
	}

	/**
	 * Rebuilds the application bundle when files change during watch mode.
	 *
	 * This method is called when a file change is detected during watch mode. It refreshes the configuration, rebuilds the application bundle, and clears the lists of changed files and extensions.
	 *
	 * After the build is complete, it executes the `onWatchUpdate` callback from the configuration.
	 */
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

	/**
	 * Stops the file watcher and cleans up the watcher instance.
	 */
	unwatch() {
		if (this.watcher) {
			this.watcher.close();
			this.watcher = null;
		}
	}

	/**
	 * Registers a file as having been changed during watch mode.
	 *
	 * This method updates the `watchChangedFileList` and `watchChangedExtList` dictionaries to track which files and file extensions have been modified. This information is used to determine which parts of the application need to be rebuilt during the next watch mode build.
	 *
	 * @param {string} fileUrl - The absolute path of the file that was changed.
	 * @returns {void}
	 */
	registerWatchFileChanged(fileUrl) {
		const extName = path.extname(fileUrl);
		if (!extName) return;

		this.watchChangedFileList[fileUrl] = true;
		this.watchChangedExtList[extName] = true;
	}

	/**
	 * Handles a file change event during watch mode.
	 *
	 * This method is called when a file change is detected during watch mode. It registers the changed file in the `watchChangedFileList` and `watchChangedExtList` dictionaries, and then debounces the `watchBuild` method to avoid triggering multiple rebuilds for rapid file changes.
	 *
	 * @param {string} fileUrl - The full path of the changed file.
	 * @param {number} [reloadInterval=300] - The debounce interval in milliseconds before triggering the `watchBuild` method.
	 */
	handleWatchChangeFile(fileUrl, reloadInterval) {
		const interval = typeof reloadInterval === 'number' && reloadInterval >= 0 ? reloadInterval : 300;
		clearTimeout(this.watchDebounce);
		this.registerWatchFileChanged(fileUrl);
		this.watchDebounce = setTimeout(this.watchBuild.bind(this), interval);
	}

	/**
	 * Starts the file watcher and sets up the necessary event handlers.
	 *
	 * This method is responsible for initializing the file watcher, registering the necessary event handlers, and triggering the initial bundle build. It also sets up the `watchChangedFileList` and `watchChangedExtList` dictionaries to track changes during watch mode.
	 *
	 * @param {Object} cfg - The configuration object for the file watcher.
	 * @returns {null} - Returns `null` if the method completes successfully.
	 * @throws {Error} - Throws an error if the watch directory cannot be resolved.
	 */
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
};

export default Bundler;
