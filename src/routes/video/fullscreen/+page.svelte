<script lang="ts">
	import { getAllGames } from "$lib/models/games";
	import { pb } from "$lib/pocketbase"
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { onDestroy, onMount } from "svelte";
	import GameCard from "$lib/components/GameCard.svelte";
	import { Splide, SplideSlide, type Options } from "@splidejs/svelte-splide";
	import '@splidejs/svelte-splide/css/skyblue';
	import type { MoveEventDetail } from "@splidejs/svelte-splide/types";

	let games: GamesResponse[]
	let currentSlide = 0

	const splideConfig: Options  = {
		type: "loop",
		perPage: 4,
		perMove: 1,
		start: 0,
		focus: "center",
		pagination: false,
	}

	async function loadGames() {
		games = await getAllGames()
	}

	function moved(e: CustomEvent<MoveEventDetail> | undefined) {
		
		if (e !== undefined) {
			currentSlide = e.detail.index
		}
		
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

	<Splide on:moved={moved} options={ splideConfig } aria-label="Games">
		{#each games as game(game.id)}
		<SplideSlide>
			<GameCard {game} />
		</SplideSlide>
		{/each}
	</Splide>

</div>
{/if}
