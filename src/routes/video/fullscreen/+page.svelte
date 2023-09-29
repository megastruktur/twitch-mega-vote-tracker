<script lang="ts">
	import GameItem from "$lib/components/GameItem.svelte";
	import { getAllGames } from "$lib/models/games";
	import { pb } from "$lib/pocketbase"
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { ProgressRadial } from "@skeletonlabs/skeleton";
	import { onDestroy, onMount } from "svelte";
	import { flip } from "svelte/animate";
	import { quintOut } from "svelte/easing";

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
	<ul class="list flex flex-col items-end mr-3">
		{#each games as game(game.id)}
			<li
				animate:flip={{ delay: 250, duration: 250, easing: quintOut }}
				>
				<GameItem {game} />
			</li>
		{/each}
	</ul>
{/await}
