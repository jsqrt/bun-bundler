import { Effect, Layer } from 'effect';
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
import type { BundlerConfig } from './bundler-types';
import type { ServerConfig } from './server';
import type { ImageProcessorConfig } from './image-processor';
import type { SpriteBuilderConfig } from './sprite-builder';

const BaseLayer = Layer.mergeAll(ReporterLive(false), ConstantsLive);

const BundlerLayer = BundlerLive.pipe(Layer.provide(BaseLayer));
const ServerLayer = ServerLive.pipe(Layer.provide(BaseLayer));
const ImageProcessorLayer = ImageProcessorLive.pipe(Layer.provide(BaseLayer));
const SpriteBuilderLayer = SpriteBuilderLive.pipe(Layer.provide(BaseLayer));

export class Bundler {
	build(config: BundlerConfig): void {
		const program = Effect.gen(function* (_) {
			const bundler = yield* _(BundlerService);
			yield* _(bundler.build(config));
		});

		Effect.runPromise(program.pipe(Effect.provide(BundlerLayer))).catch((error) => {
			console.error('Build error:', error);
			if (config.onError) config.onError();
		});
	}

	watch(config: BundlerConfig): void {
		const program = Effect.gen(function* (_) {
			const bundler = yield* _(BundlerService);
			yield* _(bundler.watch(config));
		});

		Effect.runPromise(program.pipe(Effect.provide(BundlerLayer))).catch((error) => {
			console.error('Watch error:', error);
			if (config.onError) config.onError();
		});
	}
}

export class Server {
	private serverInstance: unknown = null;

	start(config: ServerConfig): unknown {
		const program = Effect.gen(function* (_) {
			const server = yield* _(ServerService);
			return yield* _(server.start(config));
		});

		try {
			this.serverInstance = Effect.runSync(program.pipe(Effect.provide(ServerLayer)));
			return this.serverInstance;
		} catch (error) {
			console.error('Server start error:', error);
			throw error;
		}
	}

	stop(): void {
		if (!this.serverInstance) return;

		const program = Effect.gen(function* (_) {
			const server = yield* _(ServerService);
			yield* _(server.stop());
		});

		try {
			Effect.runSync(program.pipe(Effect.provide(ServerLayer)));
			this.serverInstance = null;
		} catch (error) {
			console.error('Server stop error:', error);
		}
	}

	restart(config: ServerConfig): unknown {
		this.stop();
		return this.start(config);
	}

	startServer(config: ServerConfig): unknown {
		return this.start(config);
	}

	stopServer(): void {
		this.stop();
	}

	restartServer(config: ServerConfig): unknown {
		return this.restart(config);
	}
}

export class ImageProcessor {
	start(config: ImageProcessorConfig): Promise<void> {
		const program = Effect.gen(function* (_) {
			const processor = yield* _(ImageProcessorService);
			yield* _(processor.process(config));
		});

		return Effect.runPromise(program.pipe(Effect.provide(ImageProcessorLayer))).catch((error) => {
			console.error('Image processing error:', error);
		});
	}

	process(config: ImageProcessorConfig): Promise<void> {
		return this.start(config);
	}
}

export class SpriteBuilder {
	start(config: SpriteBuilderConfig): Promise<void> {
		const program = Effect.gen(function* (_) {
			const builder = yield* _(SpriteBuilderService);
			yield* _(builder.build(config));
		});

		return Effect.runPromise(program.pipe(Effect.provide(SpriteBuilderLayer))).catch((error) => {
			console.error('Sprite building error:', error);
		});
	}

	build(config: SpriteBuilderConfig): Promise<void> {
		return this.start(config);
	}
}

export default Bundler;

export type { BundlerConfig, ServerConfig, ImageProcessorConfig, SpriteBuilderConfig };
