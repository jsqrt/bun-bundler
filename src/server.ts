import { Effect, Context, Layer } from 'effect';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import type { Reporter } from './reporter';
import { ReporterService } from './reporter';

export interface ServerConfig {
	readonly root: string;
	readonly port?: number;
	readonly host?: string;
	readonly open?: boolean;
	readonly injectChanges?: boolean;
	readonly debug?: boolean;
	readonly overrides?: any;
}

export class ServerError {
	readonly _tag = 'ServerError';
	constructor(readonly message: string, readonly originalError?: unknown) {}
}

export interface Server {
	readonly start: (config: ServerConfig) => Effect.Effect<any, ServerError>;
	readonly stop: () => Effect.Effect<void>;
	readonly restart: (config: ServerConfig) => Effect.Effect<any, ServerError>;
}

export class ServerService extends Context.Tag('ServerService')<ServerService, Server>() {}

class ServerImpl {
	private server: any = null;
	private currentConfig: ServerConfig | null = null;

	constructor(private reporter: Reporter) {}

	private onServerStarted = (urls: any) =>
		Effect.gen(function* (_) {
			if (!urls) return;
			const entries = urls._root?.entries;
			if (!entries) return;
			const urlMap = Object.fromEntries(entries);
			const { local } = urlMap;

			yield* _(
				Effect.sync(() => {
					console.log(chalk.reset(`| 👀 Watching started: ${chalk.blue.underline(local)}`));
				}),
			);
		});

	start = (config: ServerConfig): Effect.Effect<any, ServerError> => {
		const self = this;
		return Effect.gen(function* (_) {
			const fullConfig: Required<ServerConfig> = {
				root: config.root,
				port: config.port ?? 8080,
				host: config.host ?? 'localhost',
				open: config.open ?? true,
				injectChanges: config.injectChanges ?? true,
				debug: config.debug ?? false,
				overrides: config.overrides ?? {},
			};

			if (!fullConfig.root) {
				return yield* _(Effect.fail(new ServerError('Server entry is not defined')));
			}

			self.currentConfig = fullConfig;

			yield* _(self.reporter.debugLog('Server starting'));

			return yield* _(
				Effect.try({
					try: () => {
						self.server = browserSync.create();
						self.server.init({
							server: fullConfig.root,
							port: fullConfig.port,
							ui: {
								port: fullConfig.port - 1000,
							},
							files: [fullConfig.root],
							open: fullConfig.open,
							notify: fullConfig.debug,
							logLevel: fullConfig.debug ? 'debug' : 'silent',
							injectChanges: fullConfig.injectChanges,
							callbacks: {
								ready: (err: any, bs: any) => {
									Effect.runSync(self.onServerStarted(bs.options.get('urls')));
								},
							},
							...fullConfig.overrides,
						});
						return self.server;
					},
					catch: (error) => new ServerError('Server error', error),
				}),
			);
		});
	};

	stop = (): Effect.Effect<void> =>
		Effect.sync(() => {
			this.server?.exit();
			this.server = null;
		});

	restart = (config: ServerConfig): Effect.Effect<any, ServerError> => {
		const self = this;
		return Effect.gen(function* (_) {
			yield* _(self.stop());
			return yield* _(self.start(config));
		});
	};
}

export const makeServer = (reporter: Reporter): Server => {
	const impl = new ServerImpl(reporter);
	return {
		start: impl.start,
		stop: impl.stop,
		restart: impl.restart,
	};
};

export const ServerLive = Layer.effect(ServerService, Effect.map(ReporterService, makeServer));
