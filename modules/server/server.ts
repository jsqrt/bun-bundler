/// <reference path="./server.d.ts" />

import browserSync from 'browser-sync';
import { Reporter } from '../reporter';
import { Effect } from 'effect';
import TServer from './server';
import { definedErrors } from '../../stdout/error-messages';
import { runtimeMessages } from '../../stdout/runtime-messages';

export class Server extends Reporter implements TServer {
	createConfig(cfg: unknown) {
		return this.setConfig(cfg);
	}

	setConfig = (cfg) =>
		Effect.runSyncExit(
			Effect.try(() => {
				if (!cfg.root) Effect.fail(definedErrors['config-prop-not-def'](['Server entry']));

				return {
					initial: cfg,
					debug: false,
					root: cfg.root,
					port: 8080,
					host: 'localhost',
					open: true,
					injectChanges: true,
					overrides: {},
					...cfg,
				};
			}),
		);

	onServerStarted = Effect.gen(function* (_) {
		return (urls: Map<string, string>) => {
			if (!urls) return;
			const { local, external, ui } = Object.fromEntries(urls);
			this.debugLog(external, ui);
			this.log(runtimeMessages['server-started'](local));
		};
	});

	start = Effect.gen(function* (_) {
		return (cfg: unknown) => {
			const config = yield * _(this.setConfig(cfg));
			this.debugLog('Server starting');

			this.server = browserSync.create();

			return Effect.try(() => {
				server.init({
					server: config.root,
					port: config.port,
					ui: { port: config.port - 1000 },
					files: [config.root],
					open: config.open,
					notify: config.debug,
					logLevel: config.debug ? 'debug' : 'silent',
					injectChanges: config.injectChanges,
					callbacks: {
						ready: (err, bs) => {
							this.onServerStarted(bs.options.get('urls')._root.entries);
						},
					},
					...config.overrides,
				});
				return server;
			});
		};
	});

	stop = Effect.sync(() => {
		this.server?.exit();
	});

	restartServer = Effect.gen(function* (_) {
		yield* _(this.stop());
		return yield* _(this.start(this.config.initial));
	});

	stopServer = this.stop;
	startServer = this.start;
}

export default Server;
