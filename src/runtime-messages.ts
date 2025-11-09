import chalk from 'chalk';

export const runtimeMessages = {
	'version-notation': (version: string) =>
		chalk.dim(`# v.${version}, Bun ${process.version} Support: https://github.com/jsqrt/bun-bundler/issues`),
	'bundler-start': `\n${chalk.reset('Bundling...')}`,
	'bundler-refresh': `\n${chalk.reset('Refreshing...')}`,
	'bundler-done': (buildTime: number) => `${chalk.cyan(`Done in ${buildTime}ms`)}`,
	'server-started': (localUrl: string) =>
		`${chalk.reset(`Watching started: ${chalk.blue.underline(localUrl)}`)}`,
	'image-processing-start': `${chalk.reset(`Image optimization `)}`,
	'image-building-start': `${chalk.reset(`Sprite building `)}`,
};
