<script lang="ts">
	import type { GamesResponse, SteamGameDataResponse } from "$lib/pocketbase-types";
  export let game: GamesResponse

  let steamGameData: SteamGameDataResponse = game.expand["steam_game_data(game)"][0]

</script>


{#if steamGameData !== undefined}
  <button class="relative game-card-button w-full h-full" data-game-id={game.id}>
    {#if game.votesTotal !== 0}
      <div class="pl-3 absolute bottom-0 bg-slate-700/70 w-full">Сумма: {game.votesTotal}</div>
    {/if}
    {#if steamGameData.header_image}
      <img
        class="hover:brightness-125"
        src={steamGameData.header_image}
        alt={game.name}
        title={game.name}
        loading="lazy"
      />
    {:else}
      <div class="h3 text-center">{game.name}</div>
    {/if}
  </button>
{/if}
