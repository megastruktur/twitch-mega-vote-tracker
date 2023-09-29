import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

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
					"https://pocketvote.megastruktur.synology.me",
					"https://cors.megastruktur.synology.me",
					"https://cdn.akamai.steamstatic.com",
				],
				"img-src": [
					"self",
					"https://pocketvote.megastruktur.synology.me",
					"https://cdn.akamai.steamstatic.com"
				]
			},
    },
	}
};
export default config;
