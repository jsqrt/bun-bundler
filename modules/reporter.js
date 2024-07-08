/**
 * A reporter class that provides various logging and error handling utilities.
 */
export class Reporter {
	/**
	 * Logs a debug message if the debug flag is enabled in the configuration.
	 * @param {string} message - The message to log.
	 */
	debugLog(message) {
		if (this.config?.debug) console.log(message);
	}

	/**
	 * Logs a message to the console.
	 * @param {string} message - The message to log.
	 */
	log(message) {
		console.log(message);
	}

	/**
	 * Throws an error with the provided message.
	 * @param {string} message - The error message.
	 * @throws {Error} - The error with the provided message.
	 */
	errThrow(message) {
		throw new Error(message);
	}

	/**
	 * Logs an error message to the console.
	 * @param {string} message - The error message to log.
	 */
	errLog(message) {
		console.error(message);
	}

	/**
	 * Logs a warning message to the console.
	 * @param {string} message - The warning message to log.
	 */
	warn(message) {
		console.warn(message);
	}

	/**
	 * Logs a table-formatted message to the console.
	 * @param {any} message - The message to log as a table.
	 */
	table(message) {
		console.table(message);
	}
}

export default Reporter;
