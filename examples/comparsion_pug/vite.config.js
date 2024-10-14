import { defineConfig } from "vite"
import pugPlugin from "vite-plugin-pug"
import path from "path"

const options = { pretty: true } // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" }

export default defineConfig({
	plugins: [pugPlugin(options, locals)],
	build: {
	rollupOptions: {
		input: {
			masin: path.resolve(__dirname, './src/images/alive.png'),
			smzxxasin: path.resolve(__dirname, './src/scss/app.scss'),
			mzxxasin: path.resolve(__dirname, './src/js/app.js'),
			main: path.resolve(__dirname, './src/pug/index.html'),
			ma31in1: path.resolve(__dirname, './src/pug/index.html'),
			maiads123n2: path.resolve(__dirname, './src/pug/index.html'),
			m2dsaz13xvain: path.resolve(__dirname, './src/pug/index.html'),
			ma3in: path.resolve(__dirname, './src/pug/index.html'),
			mxvzxain: path.resolve(__dirname, './src/pug/index.html'),
			m6312: path.resolve(__dirname, './src/pug/index.html'),
			maxvi5n: path.resolve(__dirname, './src/pug/index.html'),
			mai53n: path.resolve(__dirname, './src/pug/index.html'),
			123: path.resolve(__dirname, './src/pug/index.html'),
			maisad12n: path.resolve(__dirname, './src/pug/index.html'),
			masa122n: path.resolve(__dirname, './src/pug/index.html'),
			mai2231n: path.resolve(__dirname, './src/pug/index.html'),
			ma23213in: path.resolve(__dirname, './src/pug/index.html'),
		}
	}
}
})