import { Context } from 'effect';
import type { Effect } from 'effect';

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

export interface ProcessedConfig {
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

export interface BundlerState {
	currentSpinner: any;
	lastBuildSucceeded: boolean;
	stylesToAssemble: any[];
	importedCSSToAssemble: Record<string, any>;
}
