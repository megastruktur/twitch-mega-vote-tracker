import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [ vitePreprocess()],
	
	vitePlugin: {
		inspector: true,
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			assets: 'build',
		}),
		csp: {
      mode: 'hash',
			directives: {
				"script-src": [
					"self",
					"https://extension-files.twitch.tv"
				],
				"connect-src": [
					"self",
					"http://localhost:8090",
					process.env.PUBLIC_POCKETBASE_URL,
					process.env.PUBLIC_IMAGE_PROXY_URL,
				],
				"img-src": [
					"self",
					process.env.PUBLIC_POCKETBASE_URL,
					process.env.PUBLIC_IMAGE_PROXY_URL,
					"https://windows-cdn.softpedia.com",
				]
			},
    },
	}
};
export default config;
