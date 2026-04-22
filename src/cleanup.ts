type CleanupFn = () => void | Promise<void>;

const cleanups = new Set<CleanupFn>();
let registered = false;
let handling = false;

const runAll = async (exitCode: number) => {
	if (handling) return;
	handling = true;
	const fns = Array.from(cleanups);
	cleanups.clear();
	for (const fn of fns) {
		try {
			await fn();
		} catch {}
	}
	process.exit(exitCode);
};

const ensureSignals = () => {
	if (registered) return;
	registered = true;
	process.once('SIGINT', () => runAll(130));
	process.once('SIGTERM', () => runAll(143));
	process.once('SIGHUP', () => runAll(129));
};

export const onCleanup = (fn: CleanupFn): (() => void) => {
	ensureSignals();
	cleanups.add(fn);
	return () => cleanups.delete(fn);
};
