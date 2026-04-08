import { Effect, Layer } from 'effect';
import path from 'path';
import fs from 'fs';
import {
	BundlerService,
	BundlerLive,
	ServerService,
	ServerLive,
	ImageProcessorService,
	ImageProcessorLive,
	SpriteBuilderService,
	SpriteBuilderLive,
	ReporterLive,
	ConstantsLive,
} from './index';

interface JsonBundlerConfig {
	dist: string;
	sass?: string | string[];
	cssDist?: string;
	js?: string | string[];
	jsDist?: string;
	html?: string | string[];
	htmlDist?: string;
	staticFolders?: string[];
	assembleStyles?: string;
	watchDir?: string;
	production?: boolean;
	debug?: boolean;
	pugConfigOverrides?: any;
	jsConfigOverrides?: any;
	sassConfigOverrides?: any;
}

interface JsonServerConfig {
	root: string;
	port?: number;
	host?: string;
	open?: boolean;
	debug?: boolean;
	overrides?: any;
}

interface JsonImageProcessorConfig {
	entry: string;
	debug?: boolean;
	outputFormat?: 'webp' | 'png' | 'jpeg' | 'avif';
	fileTypes?: string[];
	reduceColors?: boolean;
	resize?: { x: number; y: number };
	scale?: number;
	useCache?: boolean;
	cache?: boolean;
	cacheDir?: string;
	concurrency?: number;
	keepOriginals?: boolean;
	performance?: boolean;
	optimization?: Record<string, any>;
}

interface JsonSpriteBuilderConfig {
	entry: string | string[];
	dist: string;
	debug?: boolean;
	spriteIconSelector?: string;
	additionalIcons?: string | string[];
}

export interface BunBundlerJsonConfig {
	mode: 'build' | 'dev';
	bundler: JsonBundlerConfig;
	server?: JsonServerConfig;
	imageProcessor?: JsonImageProcessorConfig;
	spriteBuilder?: JsonSpriteBuilderConfig;
}

const DEFAULT_CONFIG_NAME = 'bundler.config.json';

function resolveConfigPath(arg?: string): string {
	const configArg = arg || DEFAULT_CONFIG_NAME;
	const resolved = path.resolve(configArg);
	if (!fs.existsSync(resolved)) {
		console.error(`Config not found: ${resolved}`);
		process.exit(1);
	}
	return resolved;
}

function loadJsonConfig(configPath: string): BunBundlerJsonConfig {
	const raw = fs.readFileSync(configPath, 'utf-8').replace(/^\uFEFF/, '').trim();
	return JSON.parse(raw);
}

export async function run(configPathArg?: string) {
	const configPath = resolveConfigPath(configPathArg);
	const configDir = path.dirname(configPath);
	const originalCwd = process.cwd();

	if (configDir !== originalCwd) {
		process.chdir(configDir);
	}

	const config = loadJsonConfig(configPath);
	const debug = config.bundler.debug ?? false;

	const BaseLayer = Layer.mergeAll(ReporterLive(debug), ConstantsLive);
	const BundlerLayer = BundlerLive.pipe(Layer.provide(BaseLayer));
	const ServerLayer = ServerLive.pipe(Layer.provide(BaseLayer));
	const ImageProcessorLayer = ImageProcessorLive.pipe(Layer.provide(BaseLayer));
	const SpriteBuilderLayer = SpriteBuilderLive.pipe(Layer.provide(BaseLayer));

	const runPostBuildTasks = async () => {
		if (config.spriteBuilder) {
			const spriteProgram = Effect.gen(function* (_) {
				const builder = yield* _(SpriteBuilderService);
				yield* _(builder.build(config.spriteBuilder!));
			});
			await Effect.runPromise(spriteProgram.pipe(Effect.provide(SpriteBuilderLayer))).catch((error) => {
				console.error('Sprite building error:', error);
			});
		}

		if (config.imageProcessor) {
			const imgProgram = Effect.gen(function* (_) {
				const processor = yield* _(ImageProcessorService);
				yield* _(processor.process(config.imageProcessor!));
			});
			await Effect.runPromise(imgProgram.pipe(Effect.provide(ImageProcessorLayer))).catch((error) => {
				console.error('Image processing error:', error);
			});
		}
	};

	let serverStarted = false;
	const startServer = () => {
		if (!config.server || serverStarted) return;
		const program = Effect.gen(function* (_) {
			const server = yield* _(ServerService);
			yield* _(server.start(config.server!));
		});
		Effect.runPromise(program.pipe(Effect.provide(ServerLayer))).catch((error) => {
			console.error('Server start error:', error);
		});
		serverStarted = true;
	};

	const stopServer = () => {
		if (!serverStarted) return;
		const program = Effect.gen(function* (_) {
			const server = yield* _(ServerService);
			yield* _(server.stop());
		});
		try {
			Effect.runSync(program.pipe(Effect.provide(ServerLayer)));
		} catch {}
		serverStarted = false;
	};

	const isBuild = config.mode === 'build';

	const bundlerConfig: Record<string, any> = {
		...config.bundler,
		production: isBuild ? (config.bundler.production ?? true) : (config.bundler.production ?? false),
		onBuildComplete: () => {
			if (isBuild) {
				runPostBuildTasks();
			} else {
				startServer();
			}
		},
		onError: () => {
			if (!isBuild) stopServer();
		},
	};

	if (!isBuild) {
		bundlerConfig.onUpdate = ({ changes }: any) => {
			if (changes?.staticFolders) {
				runPostBuildTasks();
			}
		};
	}

	const program = Effect.gen(function* (_) {
		const bundler = yield* _(BundlerService);
		if (isBuild) {
			yield* _(bundler.build(bundlerConfig));
		} else {
			yield* _(bundler.watch(bundlerConfig));
		}
	});

	Effect.runPromise(program.pipe(Effect.provide(BundlerLayer))).catch((error) => {
		console.error(`${isBuild ? 'Build' : 'Watch'} error:`, error);
		if (bundlerConfig.onError) bundlerConfig.onError();
	});
}

const args = process.argv.slice(2);
const configArg = args.find((a) => !a.startsWith('-'));
run(configArg);
