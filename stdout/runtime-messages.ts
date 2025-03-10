import chalk from 'chalk';
import { version } from '../package.json';

export const runtimeMessages = {
	'version-notation': chalk.dim(`# v.${version}, Node ${process.version} Support: https://github.com/jsqrt/bun-bundler/issues`),
	'bundler-start': `\n${chalk.reset('| ✨ Bundling...')}`,
	'bundler-refresh': `\n${chalk.reset('| ⏳ Refreshing...')}`,
	'bundler-done': (buildTime) => `${chalk.reset(`| ✅ Done in ${buildTime}ms`)}`,
	'server-started': (localUrl) =>
		`${chalk.reset(`| 👀 Watching started: ${chalk.blue.underline(localUrl)}`)}`,
	'image-processing-start': `${chalk.reset(`| ➕ Image optimization... `)}`,
	'image-building-start': `${chalk.reset(`| ➕ Sprite building... `)}`,
};

