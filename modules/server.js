/**
 * Provides a server management class that uses BrowserSync to start, stop, and restart a local development server.
 * The `Server` class extends the `Reporter` class, which provides logging and error handling functionality.
 * The `setConfig` method sets the configuration options for the server, including the root directory, port, host, and other settings.
 * The `startServer` method initializes the BrowserSync server with the configured options and starts the server. It returns the BrowserSync instance.
 * The `stopServer` method stops the BrowserSync server.
 * The `restartServer` method stops the current server and starts a new one with the initial configuration.
 */
import browserSync from 'browser-sync';
import { Reporter } from './reporter';

export class Server extends Reporter {
	/**
	 * Sets the configuration options for the server, including the root directory, port, host, and other settings.
	 * @param {Object} [cfg={}] - The configuration options for the server.
	 * @param {string} cfg.root - The root directory for the server.
	 * @param {number} [cfg.port=8080] - The port number for the server.
	 * @param {string} [cfg.host='localhost'] - The host for the server.
	 * @param {boolean} [cfg.open=true] - Whether to open the server in the default browser.
	 * @param {boolean} [cfg.injectChanges=true] - Whether to inject changes into the browser.
	 * @param {boolean} [cfg.debug=false] - Whether to enable debug logging.
	 */
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
			...cfg,
		};
	}

	/**
	 * Callback function that is called when the server has started. It logs a message and displays a table of the server URLs.
	 * @param {Object.<string, string>} urls - An object containing the server URLs, with the keys being the URL types and the values being the actual URLs.
	 */
	onServerStarted(urls) {
		if (!urls) return;
		this.log('[👀 Server started ]');
		this.table(Object.fromEntries(urls));
	}

	/**
	 * Starts the BrowserSync server with the configured options.
	 * @param {Object} cfg - The configuration options for the server.
	 * @returns {Object|null} - The BrowserSync instance if the server was started successfully, or null if an error occurred.
	 */
	startServer(cfg) {
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
			});

			return this.server;
		} catch (err) {
			this.errLog('Server error:', err);
			return null;
		}
	}

	/**
	 * Stops the BrowserSync server instance.
	 */
	stopServer() {
		this.server?.exit();
	}

	/**
	 * Restarts the BrowserSync server with the initial configuration.
	 * This method first stops the current server instance, then starts a new server
	 * with the initial configuration provided in the `this.config.initial` object.
	 */
	restartServer() {
		this.stopServer();
		this.startServer(this.config.initial);
	}
}

export default Server;
