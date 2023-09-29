<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>
<svelte:head>
	<script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></script>
</svelte:head>
<slot />
