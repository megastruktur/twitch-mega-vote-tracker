<script lang="ts">
	import type { SteamGameData } from "$lib/types";


  export let steamGameData: SteamGameData

</script>

<div class="w-96">
  <img class="rounded-xl" src="{steamGameData.header_image}" alt="{steamGameData.name}" />

  <!-- Genres -->
  <div
    class="flex flex-row flex-wrap mt-3"
    >
    {#each steamGameData.genres as genre}
      <span class="chip variant-filled mr-3 mb-3">{genre.description}</span>
    {/each}
  </div>

  <div>
    {steamGameData.short_description}
  </div>

  <!-- Categories -->
  <div
    class="flex flex-row flex-wrap mt-3"
    >
    {#each steamGameData.categories as category}
      <span class="chip variant-filled mr-3 mb-3 text-sm">{category.description}</span>
    {/each}
  </div>

</div>
