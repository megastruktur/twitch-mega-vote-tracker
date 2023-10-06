<script lang="ts">
	import type { GamesResponse, SteamGameDataResponse } from "$lib/pocketbase-types";
	import { getModalStore } from "@skeletonlabs/skeleton";
	import GameInfoScreenshotsSlider from "./GameInfoScreenshotsSlider.svelte";

  export let parent: any;

  const modalStore = getModalStore();
  const steamUrlBase = "https://store.steampowered.com/search/"

  let game: GamesResponse = $modalStore[0].meta?.game
  let steamGameData: SteamGameDataResponse = game.expand["steam_game_data(game)"][0]
</script>

<div class="flex relative bg-surface-900 p-3 w-full md:w-3/4">

  <div class="w-2/3 mr-3">
    <GameInfoScreenshotsSlider screenshots={steamGameData.screenshots} />
  </div>

  <div class="flex flex-col w-1/3 text-xs md:text-sm">
    <img class="mb-3" src={steamGameData.header_image} alt={game.name} />

    <!-- Description -->
    <div class="text-surface-100 mb-3">{steamGameData.short_description}</div>

    <!-- Genre -->
    <!-- <div class="flex justify-between">
      <p class="flex w-1/3 text-surface-400">Жанр:</p>
      <div class="flex flex-wrap w-2/3 text-surface-300">
        {#each steamGameData.genres as genre}
        <span class="mr-2">{genre.description}</span>
        {/each}
      </div>
    </div> -->

    <!-- Developer -->
    <div class="flex justify-between text-xs">
      <p class="flex w-1/3 text-surface-400 uppercase">Разработчик:</p>
      <div class="flex flex-wrap w-2/3">
        {#each steamGameData.developers as dev}
        <a class="mr-2 text-secondary-500 hover:text-tertiary-900" href="{steamUrlBase}?developer={dev}">{dev}</a>
        {/each}
      </div>
    </div>

    <!-- Publisher -->
    <div class="flex justify-between mb-3 text-xs">
      <p class="flex w-1/3 text-surface-400 uppercase">Издатель:</p>
      <div class="flex flex-wrap w-2/3">
        {#each steamGameData.publishers as pub}
        <a class="mr-2 text-secondary-500 hover:text-tertiary-900" href="{steamUrlBase}?publisher={pub}">{pub}</a>
        {/each}
      </div>
    </div>

    <!-- Categories / Tags -->
    <div class="flex flex-wrap">
      {#each steamGameData.genres as category}
        <span class="chip variant-soft-secondary p-1 mr-1 mb-1 text-xs/3">{category.description}</span>
      {/each}
    </div>

    <!-- Close button -->
    <button
      class="btn btn-icon-sm variant-filled absolute -top-7 -right-4 m-0 p-0"
      on:click={() => modalStore.close()}
      >x</button>
  </div>
</div>
