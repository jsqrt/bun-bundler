export abstract class Reporter {
	debugLog(message: string): void;
	errLog(message: string): void;
	errThrow(message: string): never;
	table(message: string): void;
	warn(message: string): void;
}
