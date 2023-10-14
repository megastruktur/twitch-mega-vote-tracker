<script lang="ts">
	import { getAllGames } from "$lib/models/games";
	import { pb } from "$lib/pocketbase"
	import type { GamesResponse } from "$lib/pocketbase-types";
	import { onDestroy, onMount } from "svelte";
	import GameCard from "$lib/components/GameCard.svelte";
	import { Splide, SplideSlide, type Options } from "@splidejs/svelte-splide";
	import '@splidejs/svelte-splide/css/skyblue';
	import type { SlideEventDetail } from "@splidejs/svelte-splide/types";
	import { Drawer, getDrawerStore, getModalStore, type DrawerSettings, type ModalSettings } from '@skeletonlabs/skeleton';import FaAngleUp from 'svelte-icons/fa/FaAngleUp.svelte'
			
	const modalStore = getModalStore();
	const drawerStore = getDrawerStore();

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

	async function loadGames() {
		games = await getAllGames()
	}

	function splideClickedHandler(e: CustomEvent<SlideEventDetail> | undefined) {
		if (e !== undefined && e.detail.Slide !== undefined) {

			const gameId: string | null = e.detail.Slide.slide.children[0].getAttribute("data-game-id")

			if (gameId !== undefined && gameId !== null && gameId !== "") {
				let game: GamesResponse | undefined = games.find((game) => game.id === gameId);

				if (game !== undefined) {
					openGameInfoModal(game)
				}
			}
		}
	}

	function openVotedGamesDrawer() {
		const settings: DrawerSettings = {
			id: 'voted-games-drawer',
			height: "h-auto",
			position: "bottom"
		};
		drawerStore.open(settings);
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


<div class="flex w-screen justify-center absolute bottom-10">
	<button
		class="flex bg-surface-900/50 rounded-full p-2 border border-1 border-surface-200 opacity-30 hover:opacity-80"
		on:click={openVotedGamesDrawer}>
		<div class="w-5 h-5"><FaAngleUp /></div>
	</button>
</div>


<Drawer>

	{#if $drawerStore.id === 'voted-games-drawer'}
		{#if games !== undefined }
			<div class="absolute bottom-0 bg-surface-900/80 w-screen"  >
			
				<Splide options={ splideConfig } aria-label="Games" on:click={splideClickedHandler}>
					{#each games as game(game.id)}
					<SplideSlide>
						<GameCard {game} />
					</SplideSlide>
					{/each}
				</Splide>
			
			</div>
		{/if}
	{/if}
	
</Drawer>
