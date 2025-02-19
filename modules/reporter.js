import chalk from 'chalk';

export class Reporter {
	debugLog(message) {
		if (this.config?.debug) console.log(message);
	}

	log(message) {
		console.log(message);
	}

	errThrow(message) {
		throw new Error(message);
	}

	errLog(message) {
		console.error(chalk.red('! ' + message));
	}

	warn(message) {
		console.warn(chalk.yellow('! ' + message));
	}

	table(message) {
		console.table(message);
	}
}

export default Reporter;
