<script lang="ts">
	import '../app.postcss'
	import { initializeStores, type ModalComponent } from '@skeletonlabs/skeleton';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { Modal, storePopup } from '@skeletonlabs/skeleton';

	import GameInfoModal from "$lib/components/GameInfoModal.svelte";

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


	const modalComponentRegistry: Record<string, ModalComponent> = {

		GameInfoModal: {
			// Pass a reference to your custom component
			ref: GameInfoModal,
		},
	}
	
</script>
<svelte:head>
	<script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></script>
</svelte:head>
<slot />

<Modal components={modalComponentRegistry} />
