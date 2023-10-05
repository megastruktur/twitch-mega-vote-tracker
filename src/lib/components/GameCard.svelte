<script lang="ts">
	import type { GamesResponse, SteamGameDataResponse } from "$lib/pocketbase-types";
	import { onMount } from "svelte";
  export let game: GamesResponse

  let steamGameData: SteamGameDataResponse = game.expand["steam_game_data(game)"][0]

</script>


{#if steamGameData !== undefined}
  <a href="?#" class="relative" on:click>
    <div class="pl-3 absolute bottom-0 bg-slate-700/70 w-full">Сумма: {game.votesTotal}</div>
    <img
      class="hover:brightness-125"
      src={steamGameData.header_image}
      alt={game.name}
      title={game.name}
      loading="lazy"
    />
  </a>
{/if}
