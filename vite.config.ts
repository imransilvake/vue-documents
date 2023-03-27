import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { configDefaults } from 'vitest/config';

const configuration = defineConfig(({ mode }) => {
	// load env file based on `mode` in the current working directory.
	// set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [vue()],
		logLevel: 'error',
		server: { port: +env.VITE_PORT, open: false },
		preview: { port: +env.VITE_PORT_PREVIEW, open: false },
		build: { sourcemap: false },
		test: {
			globals: true,
			environment: 'jsdom',
			exclude: [...configDefaults.exclude]
		},
		resolve: { alias: { '@': path.resolve(__dirname, './src/app') } },
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@import "./src/assets/scss/mixins.scss";
						`
				}
			}
		}
	};
});
export default configuration;
