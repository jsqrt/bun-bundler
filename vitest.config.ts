import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			bun: path.resolve(__dirname, 'tests/__mocks__/bun.ts'),
		},
	},
	test: {
		globals: true,
		testTimeout: 30000,
		hookTimeout: 30000,
		// macOS writes AppleDouble sidecars ("._build.test.ts") next to every file on
		// non-native volumes; without this vitest collects them as broken test files.
		exclude: ['**/node_modules/**', '**/dist/**', '**/._*'],
	},
});
