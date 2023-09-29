import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { PUBLIC_POCKETBASE_URL, PUBLIC_CORS_PROXY_URL }

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [ vitePreprocess()],
	
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
					PUBLIC_POCKETBASE_URL,
					PUBLIC_CORS_PROXY_URL,
					"https://cdn.akamai.steamstatic.com",
				],
				"img-src": [
					"self",
					PUBLIC_POCKETBASE_URL,
					"https://cdn.akamai.steamstatic.com"
				]
			},
    },
	}
};
export default config;
