<script lang="ts">
	import { getAllGames } from "$lib/models/games";
	import { pb } from "$lib/pocketbase"
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { onDestroy, onMount } from "svelte";
	import GameCard from "$lib/components/GameCard.svelte";
	import { Splide, SplideSlide, type Options } from "@splidejs/svelte-splide";
	import '@splidejs/svelte-splide/css/skyblue';
	import type { MoveEventDetail, SlideEventDetail } from "@splidejs/svelte-splide/types";
	import { getModalStore, Modal, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import GameInfoModal from "$lib/components/GameInfoModal.svelte";
	import { flip } from "svelte/animate";
			
	const modalStore = getModalStore();

	let games: GamesResponse[]

	const splideConfig: Options  = {
		type: "loop",
		perPage: 5,
		perMove: 1,
		focus: "center",
		pagination: false,
	}

	function openGameInfoModal(game: GamesResponse) {
		const modal: ModalSettings = {
			type: 'component',
			// Pass the component registry key as a string:
			component: 'GameInfoModal',
			meta: {
				game: game,
			}
		}
		modalStore.trigger(modal);
	}

	// Slides are pre-rendered as invisible elements so there is no way to
	//	attach Click events. Using the visible event to add click handler
	function slideVisible(e: CustomEvent<SlideEventDetail> | undefined) {

		if (e !== undefined) {
			// Get the Game by slide index
			let index = (e.detail.Slide.index >= 0) ? e.detail.Slide.index : games.length + e.detail.Slide.index;
			let game: GamesResponse = games[index];
			
			e.detail.Slide.slide.addEventListener("click", (e) => {
				e.preventDefault()
				openGameInfoModal(game)
			});
		}
	}

	async function loadGames() {
		games = await getAllGames()
	}

	onMount(async () => {
		loadGames()
		// Listen to Game changes and update the list accordingly.
		pb.collection("games").subscribe("*", async (e) => {
			games = await getAllGames()
		})
	})

	onDestroy(() => {
    pb.realtime.unsubscribe("games");
  })

</script>

{#if games !== undefined }
<div class="absolute bottom-0 bg-surface-900/80 w-screen">

	<Splide options={ splideConfig } aria-label="Games" on:visible={slideVisible}>
		{#each games as game(game.id)}
		<SplideSlide>
			<GameCard {game} />
		</SplideSlide>
		{/each}
	</Splide>

</div>
{/if}
