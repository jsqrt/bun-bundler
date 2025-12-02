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
} from './src/index.ts';

const BaseLayer = Layer.mergeAll(ReporterLive(false), ConstantsLive);

const BundlerLayer = BundlerLive.pipe(Layer.provide(BaseLayer));
const ServerLayer = ServerLive.pipe(Layer.provide(BaseLayer));
const ImageProcessorLayer = ImageProcessorLive.pipe(Layer.provide(BaseLayer));
const SpriteBuilderLayer = SpriteBuilderLive.pipe(Layer.provide(BaseLayer));

export class Bundler {
	build(config) {
		const program = Effect.gen(function* (_) {
			const bundler = yield* _(BundlerService);
			yield* _(bundler.build(config));
		});

		Effect.runPromise(program.pipe(Effect.provide(BundlerLayer))).catch((error) => {
			console.error('Build error:', error);
			if (config.onError) config.onError();
		});
	}

	watch(config) {
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
	constructor() {
		this.serverInstance = null;
	}

	start(config) {
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

	stop() {
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

	restart(config) {
		this.stop();
		return this.start(config);
	}
}

Server.prototype.startServer = Server.prototype.start;
Server.prototype.stopServer = Server.prototype.stop;
Server.prototype.restartServer = Server.prototype.restart;

export class ImageProcessor {
	start(config) {
		const program = Effect.gen(function* (_) {
			const processor = yield* _(ImageProcessorService);
			yield* _(processor.process(config));
		});

		Effect.runPromise(program.pipe(Effect.provide(ImageProcessorLayer))).catch((error) => {
			console.error('Image processing error:', error);
		});
	}
}

ImageProcessor.prototype.process = ImageProcessor.prototype.start;

export class SpriteBuilder {
	start(config) {
		const program = Effect.gen(function* (_) {
			const builder = yield* _(SpriteBuilderService);
			yield* _(builder.build(config));
		});

		Effect.runPromise(program.pipe(Effect.provide(SpriteBuilderLayer))).catch((error) => {
			console.error('Sprite building error:', error);
		});
	}
}

SpriteBuilder.prototype.build = SpriteBuilder.prototype.start;

export default Bundler;
