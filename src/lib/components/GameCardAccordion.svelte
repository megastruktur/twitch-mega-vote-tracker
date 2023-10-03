<script lang="ts">
	import type { GamesResponse, SteamGameDataResponse } from "$lib/pocketbase-types";

  export let game: GamesResponse
  export let steamGameData: SteamGameDataResponse

</script>

<div class="w-full">
  <img
    src="{steamGameData.header_image}" alt="{steamGameData.name}" />

  <div class="mx-3">
    <h3 class="h3">{game.name}</h3>
    <article><p>{steamGameData.short_description}</p></article>
  
    <hr class="opacity-50 mt-1" />
  
    <!-- Genres -->
    <div
      class="flex flex-row flex-wrap mt-3"
      >
      {#each steamGameData.genres as genre}
        <span class="chip text-xs variant-filled mr-3 mb-3">{genre.description}</span>
      {/each}
    </div>
  </div>

</div>
