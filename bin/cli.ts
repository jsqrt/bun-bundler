#!/usr/bin/env bun
import { parseArgs } from 'node:util';
import { resolve, join } from 'node:path';
import { existsSync } from 'node:fs';
import type { BundlerConfig } from '../src/bundler';

interface CLIConfig extends Partial<BundlerConfig> {
	command?: 'build' | 'watch' | 'dev' | 'init';
	config?: string;
	help?: boolean;
	version?: boolean;
}

const HELP_TEXT = `
Bun-Bundler - Modern, Simple, and Ultra-Fast HTML Bundler

Usage:
  bun-bundler <command> [options]

Commands:
  build       Build project for production
  watch       Watch for changes and rebuild
  dev         Watch mode with development server  
  init        Initialize a new bundler.config.js
  help        Show this help message
  version     Show version number

Options:
  --config, -c      Path to config file (default: bundler.config.js)
  --dist            Output directory
  --production, -p  Build for production
  --debug, -d       Enable debug mode
  --port            Dev server port (default: 8080)
  --help, -h        Show help
  --version, -v     Show version

Examples:
  bun-bundler build
  bun-bundler watch --config my-config.js
  bun-bundler dev --port 3000
  bun-bundler init

Config file (bundler.config.js):
  export default {
    dist: './dist',
    html: './src/html/',
    sass: './src/css/app.css',
    js: './src/js/app.js',
    staticFolders: ['./src/images/', './src/fonts/'],
    production: false,
    debug: false
  };
`;

const VERSION = require('../package.json').version;

async function loadConfig(configPath: string): Promise<Partial<BundlerConfig>> {
	const fullPath = resolve(process.cwd(), configPath);
	
	if (!existsSync(fullPath)) {
		console.warn(`⚠️  Config file not found: ${configPath}`);
		return {};
	}

	try {
		// Use dynamic import for ESM modules
		const config = await import(fullPath);
		return config.default || config;
	} catch (error) {
		console.error(`❌ Failed to load config file: ${configPath}`);
		console.error(error);
		process.exit(1);
	}
}

async function initConfig() {
	const configPath = join(process.cwd(), 'bundler.config.js');
	
	if (existsSync(configPath)) {
		console.error('❌ bundler.config.js already exists');
		process.exit(1);
	}

	const template = `export default {
	dist: './dist',
	html: './src/html/',
	htmlDist: './dist',
	sass: './src/css/app.css',
	cssDist: './dist/css/',
	js: './src/js/app.js',
	jsDist: './dist/js/',
	staticFolders: [
		'./src/images/',
		'./src/fonts/',
		'./src/static/',
	],
	assembleStyles: './dist/css/app.css',
	production: false,
	debug: false,
	onStart: () => {},
	onBuildComplete: () => {},
	onUpdate: ({ changes }) => {},
	onError: () => {},
};
`;

	const fs = await import('node:fs/promises');
	await fs.writeFile(configPath, template, 'utf-8');
	console.log('✅ Created bundler.config.js');
}

async function runBuild(config: BundlerConfig) {
	const { Bundler } = await import('../index.mjs');
	const bundler = new Bundler();
	bundler.build(config);
}

async function runWatch(config: BundlerConfig) {
	const { Bundler } = await import('../index.mjs');
	const bundler = new Bundler();
	bundler.watch(config);
}

async function runDev(config: BundlerConfig, port: number = 8080) {
	const { Bundler, Server } = await import('../index.mjs');
	const bundler = new Bundler();
	const server = new Server();
	
	let serverStarted = false;

	bundler.watch({
		...config,
		production: false,
		onBuildComplete: () => {
			config.onBuildComplete?.();
			
			if (!serverStarted) {
				server.start({
					root: config.dist || './dist',
					port,
					open: true,
					debug: config.debug || false,
				});
				serverStarted = true;
			}
		},
		onUpdate: config.onUpdate,
		onError: () => {
			config.onError?.();
			if (serverStarted) {
				server.stop();
			}
		},
	});
}

async function main() {
	try {
		const { values, positionals } = parseArgs({
			args: process.argv.slice(2),
			options: {
				config: { type: 'string', short: 'c', default: 'bundler.config.js' },
				dist: { type: 'string' },
				production: { type: 'boolean', short: 'p', default: false },
				debug: { type: 'boolean', short: 'd', default: false },
				port: { type: 'string', default: '8080' },
				help: { type: 'boolean', short: 'h', default: false },
				version: { type: 'boolean', short: 'v', default: false },
			},
			allowPositionals: true,
		});

		const command = positionals[0];

		// Handle help
		if (values.help || command === 'help') {
			console.log(HELP_TEXT);
			process.exit(0);
		}

		// Handle version
		if (values.version || command === 'version') {
			console.log(`bun-bundler v${VERSION}`);
			process.exit(0);
		}

		// Handle init
		if (command === 'init') {
			await initConfig();
			process.exit(0);
		}

		// Load config file
		const fileConfig = await loadConfig(values.config as string);

		// Execute command
		switch (command) {
			case 'build':
				await runBuild({
					...fileConfig,
					dist: values.dist || fileConfig.dist || './dist',
					production: true,
					debug: values.debug || fileConfig.debug || false,
				});
				break;

			case 'watch':
				await runWatch({
					...fileConfig,
					dist: values.dist || fileConfig.dist || './dist',
					production: values.production || fileConfig.production || false,
					debug: values.debug || fileConfig.debug || false,
				});
				break;

			case 'dev':
				await runDev({
					...fileConfig,
					dist: values.dist || fileConfig.dist || './dist',
					production: false,
					debug: values.debug || fileConfig.debug || false,
				}, parseInt(values.port as string, 10));
				break;

			default:
				console.error(`❌ Unknown command: ${command}`);
				console.log('\nRun "bun-bundler help" for usage information');
				process.exit(1);
		}
	} catch (error) {
		console.error('❌ Error:', error);
		process.exit(1);
	}
}

main();
