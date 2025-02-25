import { ConfigurableModule } from '../../interfaces';
import { BrowserSync } from 'browser-sync';
import Reporter from '../reporter';

interface ServerConfig {
	root: string;
	debug?: boolean;
	port?: number;
	host?: string;
	open?: boolean;
	injectChanges?: boolean;
	overrides?: Record<string, unknown>;
	server: BrowserSync.BrowserSyncInstance;
}

interface ServerUrls {
	local: string;
	external: string;
	ui: string;
	externalUI: string;
}

export abstract class TServer extends Reporter implements ConfigurableModule {
	private config: ServerConfig;
	private server: BrowserSync.Instance;

	abstract setConfig(cfg: unknown): void;

	onServerStarted(urls: Map<string, string>): void;
	start(cfg: ServerConfig): BrowserSync.Instance | null;
	stop(): void;
	restartServer(): void;
	stopServer(): void;
	startServer(config: ServerConfig): BrowserSync.Instance | null;
}

export default TServer;
