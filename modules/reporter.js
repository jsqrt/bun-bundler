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
		console.error(message);
	}

	warn(message) {
		console.warn(message);
	}

	table(message) {
		console.table(message);
	}
}

export default Reporter;
