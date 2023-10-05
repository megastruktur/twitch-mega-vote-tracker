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

<div class="flex relative">
  <div class="w-96">
    <GameInfoScreenshotsSlider screenshots={steamGameData.screenshots} />
  </div>
  <div class="flex flex-col w-96 space-y-3">
    <img src={steamGameData.header_image} alt={game.name} />
    <div class="px-2">{steamGameData.short_description}</div>
    <div class="flex justify-between">
      <p class="flex w-48">Жанр:</p>
      <div class="flex flex-wrap w-48">
        {#each steamGameData.genres as genre}
        <span class="mr-2">{genre.description}</span>
        {/each}
      </div>
    </div>
    <div class="flex justify-between">
      <p class="flex w-48">Разработчик:</p>
      <div class="flex flex-wrap w-48">
        {#each steamGameData.developers as dev}
        <a class="mr-2 text-secondary-500 hover:text-tertiary-900" href="{steamUrlBase}?developer={dev}">{dev}</a>
        {/each}
      </div>
    </div>
    <div class="flex justify-between">
      <p class="flex w-48">Издатель:</p>
      <div class="flex flex-wrap w-48">
        {#each steamGameData.publishers as pub}
        <a class="mr-2 text-secondary-500 hover:text-tertiary-900" href="{steamUrlBase}?publisher={pub}">{pub}</a>
        {/each}
      </div>
    </div>

    <div class="flex flex-wrap">
      {#each steamGameData.categories as category}
        <span class="chip variant-filled mr-1 mb-1">{category.description}</span>
      {/each}
    </div>

    <!-- Close button -->
    <button
      class="btn btn-icon-sm variant-filled absolute -top-7 -right-4 m-0 p-0"
      on:click={() => modalStore.close()}
      >x</button>
  </div>
</div>
