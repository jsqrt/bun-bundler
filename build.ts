#!/usr/bin/env bun
import { rmSync, existsSync, renameSync, readFileSync, writeFileSync, chmodSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

const root = import.meta.dir;
const dist = join(root, 'dist');

const external = [
	'effect',
	'browser-sync',
	'jsdom',
	'ora',
	'sharp',
	'pug',
	'sass',
	'chalk',
	'bun',
];

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });

console.log('[build] bundling JS entries...');

const apiBuild = await Bun.build({
	entrypoints: [join(root, 'src/api.ts')],
	outdir: dist,
	target: 'bun',
	format: 'esm',
	minify: true,
	sourcemap: 'linked',
	external,
	naming: 'index.[ext]',
});

if (!apiBuild.success) {
	for (const log of apiBuild.logs) console.error(log);
	throw new Error('API bundle failed');
}

const cliBuild = await Bun.build({
	entrypoints: [join(root, 'src/cli.ts')],
	outdir: dist,
	target: 'bun',
	format: 'esm',
	minify: true,
	sourcemap: 'linked',
	external,
	naming: 'cli.[ext]',
});

if (!cliBuild.success) {
	for (const log of cliBuild.logs) console.error(log);
	throw new Error('CLI bundle failed');
}

console.log('[build] emitting .d.ts...');

const tsc = spawnSync(
	process.platform === 'win32' ? 'npx.cmd' : 'npx',
	['tsc', '-p', 'tsconfig.build.json'],
	{ stdio: 'inherit', cwd: root },
);

if (tsc.status !== 0) throw new Error('tsc failed');

const apiDts = join(dist, 'api.d.ts');
const indexDts = join(dist, 'index.d.ts');
if (existsSync(apiDts)) renameSync(apiDts, indexDts);

console.log('[build] injecting CLI shebang...');

const cliPath = join(dist, 'cli.js');
const cliContent = readFileSync(cliPath, 'utf8');
const shebang = '#!/usr/bin/env bun\n';
if (!cliContent.startsWith('#!')) {
	writeFileSync(cliPath, shebang + cliContent);
}

try {
	chmodSync(cliPath, 0o755);
} catch {
	// Windows — chmod is a no-op
}

console.log('[build] done.');
