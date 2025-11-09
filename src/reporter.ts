import { Effect, Context, Layer, Console } from 'effect';
import ora, { type Ora } from 'ora';

export class ReporterError {
	readonly _tag = 'ReporterError';
	constructor(readonly message: string, readonly originalError?: unknown) {}
}

export interface Reporter {
	readonly debugLog: (message: string) => Effect.Effect<void>;
	readonly log: (message: string) => Effect.Effect<void>;
	readonly errLog: (message: string | Error) => Effect.Effect<void>;
	readonly warn: (message: string) => Effect.Effect<void>;
	readonly table: (data: any) => Effect.Effect<void>;
	readonly error: (message: string, error?: unknown) => Effect.Effect<never, ReporterError>;
	readonly spinner: (text: string) => Ora;
}

export class ReporterService extends Context.Tag('ReporterService')<ReporterService, Reporter>() {}

export const makeReporter = (debug: boolean = false): Reporter => ({
	debugLog: (message: string) =>
		Effect.sync(() => {
			if (debug) {
				console.log(message);
			}
		}),

	log: (message: string) => Console.log(message),

	errLog: (message: string | Error) =>
		Effect.sync(() => {
			const spinner = ora().fail();
			if (typeof message === 'string') {
				spinner.text = message;
			} else {
				spinner.text = message.message;
				if (debug) console.error(message);
			}
		}),

	warn: (message: string) =>
		Effect.sync(() => {
			ora().warn(message);
		}),

	table: (data: any) => Console.table(data),

	error: (message: string, error?: unknown) => Effect.fail(new ReporterError(message, error)),

	spinner: (text: string) => ora(text),
});

export const ReporterLive = (debug: boolean = false) => Layer.succeed(ReporterService, makeReporter(debug));
