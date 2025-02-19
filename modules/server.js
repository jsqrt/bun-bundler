import browserSync from 'browser-sync';
import { Reporter } from './reporter';
import chalk from 'chalk';

export class Server extends Reporter {
	setConfig(cfg = {}) {
		if (!cfg.root) this.errThrow('Server entry is not defined');

		this.config = {
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
	}

	onServerStarted(urls) {
		if (!urls) return;
		const { local, external, ui } = Object.fromEntries(urls);
		this.log(`${chalk.reset(`| 👀 Watching started: ${chalk.blue.underline(local)}`)}`);
	}

	start(cfg) {
		try {
			this.setConfig(cfg);
			this.debugLog('Server starting');

			this.server = browserSync.create();
			this.server.init({
				server: this.config.root,
				port: this.config.port,
				ui: {
					port: this.config.port - 1000,
				},
				files: [this.config.root],
				open: this.config.open,
				notify: this.config.debug,
				logLevel: this.config.debug ? 'debug' : 'silent',
				injectChanges: this.config.injectChanges,
				callbacks: {
					ready: (err, bs) => {
						// eslint-disable-next-line no-underscore-dangle
						this.onServerStarted(bs.options.get('urls')._root.entries);
					},
				},
				...this.config.overrides,
			});

			return this.server;
		} catch (err) {
			this.errLog('Server error:', err);
			return null;
		}
	}

	stop() {
		this.server?.exit();
	}

	restartServer() {
		this.stopServer();
		this.startServer(this.config.initial);
	}

	stopServer = this.stop;
	startServer = this.start;
}

export default Server;
