import { Effect, Context, Layer, Console } from 'effect';
import chalk from 'chalk';

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
			if (typeof message === 'string') {
				console.error(chalk.red('! ' + message));
			} else {
				console.error(chalk.red('! ' + message.message));
				console.error(message);
			}
		}),

	warn: (message: string) =>
		Effect.sync(() => {
			console.warn(chalk.yellow('! ' + message));
		}),

	table: (data: any) => Console.table(data),

	error: (message: string, error?: unknown) => Effect.fail(new ReporterError(message, error)),
});

export const ReporterLive = (debug: boolean = false) => Layer.succeed(ReporterService, makeReporter(debug));
