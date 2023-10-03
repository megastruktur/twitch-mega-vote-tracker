<script lang="ts">
	import type { GamesResponse, SteamGameDataResponse } from "$lib/pocketbase-types";

  export let game: GamesResponse

  let steamGameData: SteamGameDataResponse = game.expand["steam_game_data(game)"][0]

</script>


{#if steamGameData !== undefined}
  <a target="_blank" class="shrink-0 w-[28%] snap-start">
    <img
      class="hover:brightness-125"
      src={steamGameData.header_image}
      alt={game.name}
      title={game.name}
      loading="lazy"
    />
  </a>
{/if}
