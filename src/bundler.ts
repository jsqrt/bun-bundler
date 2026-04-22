import { Effect, Layer, pipe } from 'effect';
import path, { resolve } from 'path';
import fs, { statSync } from 'fs';
import type { Reporter } from './reporter';
import { ReporterService } from './reporter';
import type { Constants } from './constants';
import { ConstantsService } from './constants';
import { createDir, exec, getDirFiles, getSassFileConfig, removeDir } from './utils';
import { onCleanup } from './cleanup';
import type { BundlerConfig, ProcessedConfig, BundlerState, Bundler } from './bundler-types';
import { BundlerError, BundlerService } from './bundler-types';
import {
	compileStyles,
	compilePug,
	compileScripts,
	assembleStyles,
	transferStatics,
} from './compilers';

export type { BundlerConfig, Bundler } from './bundler-types';
export { BundlerError, BundlerService } from './bundler-types';

class BundlerImpl {
	private watchDebounce: any = null;
	private watcher: any = null;
	private watchChangedFileList: Record<string, boolean> = {};
	private watchChangedExtList: Record<string, boolean> = {};
	private config!: ProcessedConfig;
	private isBuildInProgress: boolean = false;
	private pendingWatchBuild: boolean = false;

	private state: BundlerState = {
		currentSpinner: null,
		lastBuildSucceeded: false,
		stylesToAssemble: [],
		importedCSSToAssemble: {},
	};

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
				function* (_: any) {
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
			function* (_: any) {
				const startTime = Date.now();
				const isWatchMode = options.mode === 'watch';

				if (isWatchMode && this.state.lastBuildSucceeded) {
					process.stdout.moveCursor(0, -1);
					process.stdout.clearLine(0);
				}

				if (isWatchMode && !this.state.lastBuildSucceeded) {
					console.log('\n'.repeat(50));
				}

				this.state.currentSpinner = this.reporter.spinner(isWatchMode ? '⟳ Rebuilding' : 'Building');
				this.state.currentSpinner.start();

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

				if (modulesToCompile.htmlLike)
					yield* _(compilePug(this.config, this.reporter, this.constants, this.state));
				if (modulesToCompile.styles)
					yield* _(compileStyles(this.config, this.reporter, this.constants, this.state));
				if (modulesToCompile.scripts || (modulesToCompile.styles && this.config.assembleStyles))
					yield* _(compileScripts(this.config, this.reporter, this.constants, this.state));
				if ((modulesToCompile.scripts || modulesToCompile.styles) && this.config.assembleStyles)
					yield* _(assembleStyles(this.config, this.reporter, this.constants, this.state));

				if (this.config.assembleStyles && !this.config.jsFiles?.length && !this.config.sassFiles?.length) {
					yield* _(this.reporter.warn('No styles to assemble'));
				}

				if (modulesToCompile.statics) yield* _(transferStatics(this.config, this.reporter));

				const doneTime = Date.now();
				const message = `Done in ${doneTime - startTime}ms`;

				this.state.currentSpinner.succeed(message);
				this.state.currentSpinner = null;
				this.state.lastBuildSucceeded = true;

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
				if (this.state.currentSpinner) {
					this.state.currentSpinner.fail('Build failed');
					this.state.currentSpinner = null;
				}
				this.state.lastBuildSucceeded = false;
				return Effect.void;
			}),
		) as unknown as Effect.Effect<void, BundlerError>;

	build = (cfg: BundlerConfig): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_: any) {
				yield* _(this.setConfig(cfg));
				exec(this.config.onStart);
				yield* _(this.bundle({ mode: 'build' }));
			}.bind(this),
		) as Effect.Effect<void, BundlerError>;

	private watchBuild = (): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_: any) {
				yield* _(this.bundle({ mode: 'watch' }));
				this.config.onWatchUpdate?.({
					watchChangedExtList: this.watchChangedExtList,
					watchChangedFileList: this.watchChangedFileList,
				});
			}.bind(this),
		).pipe(
			Effect.ensuring(
				Effect.sync(() => {
					this.watchChangedFileList = {};
					this.watchChangedExtList = {};
				}),
			),
		) as unknown as Effect.Effect<void, BundlerError>;

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

		if (this.isBuildInProgress) {
			this.pendingWatchBuild = true;
			return;
		}

		this.watchDebounce = setTimeout(() => {
			this.isBuildInProgress = true;
			Effect.runPromise(this.watchBuild())
				.catch((err) => {
					console.error('Watch build error:', err);
				})
				.finally(() => {
					this.isBuildInProgress = false;
					if (this.pendingWatchBuild) {
						this.pendingWatchBuild = false;
						this.handleWatchChangeFile('', 0);
					}
				});
		}, interval);
	}

	private unwatch() {
		if (this.watchDebounce) {
			clearTimeout(this.watchDebounce);
			this.watchDebounce = null;
		}
		if (this.watcher) {
			this.watcher.close();
			this.watcher = null;
		}
	}

	watch = (cfg: BundlerConfig): Effect.Effect<void, BundlerError> =>
		Effect.gen(
			function* (_: any) {
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
					if (!fileName) return;
					const fileUrl = path.resolve(this.config.watchDir, fileName);
					this.handleWatchChangeFile(fileUrl, eventType === 'rename' ? 100 : undefined);
				});
				onCleanup(() => this.unwatch());

				exec(this.config.onStart);
				yield* _(this.bundle({ mode: 'build' }));
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
