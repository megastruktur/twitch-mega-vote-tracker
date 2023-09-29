<script lang="ts">
	import { getAllGames } from "$lib/models/games";
	import { pb } from "$lib/pocketbase"
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import { onDestroy, onMount } from "svelte";
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";
	import { Accordion } from '@skeletonlabs/skeleton';
	import GameItemAccordion from "$lib/components/GameItemAccordion.svelte";

	let games: GamesResponse[]

	async function loadGames() {
		games = await getAllGames()
	}

	onMount(async () => {
		// Listen to Game changes and update the list accordingly.
		pb.collection("games").subscribe("*", async (e) => {
			games = await getAllGames()
		})
	})

	onDestroy(() => {
    pb.realtime.unsubscribe("games");
  })

</script>

{#await loadGames()}
	<ProgressRadial />
{:then}
<div class="absolute right-0 top-0 bg-surface-900/80 w-72">
		<Accordion
			padding="px-0"
			rounded="rounded-none"
			regionControl="px-2 py-2"
			hover=""
			transitions={true}
			>
			{#each games as game(game.id)}
					<GameItemAccordion {game} />
			{/each}
		</Accordion>
</div>
{/await}
