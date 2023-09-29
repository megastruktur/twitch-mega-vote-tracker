<script lang="ts">
	import type { SteamGameData } from "$lib/types";


  export let steamGameData: SteamGameData

</script>

<div class="card overflow-hidden w-72">
  <header>
    <img
      class="w-full"
      src="{steamGameData.header_image}" alt="{steamGameData.name}" />
  </header>

  <div class="p-4 space-y-4">
    <h3 class="h3">{steamGameData.name}</h3>
    <article><p>{steamGameData.short_description}</p></article>
  </div>

  <hr class="opacity-50" />

  <footer class="card-footer">
    <!-- Genres -->
    <div
      class="flex flex-row flex-wrap mt-3"
      >
      {#each steamGameData.genres as genre}
        <span class="chip text-xs variant-filled mr-3 mb-3">{genre.description}</span>
      {/each}
    </div>
  
  
    <!-- Categories -->
    <!-- <div
      class="flex flex-row flex-wrap mt-3"
      >
      {#each steamGameData.categories as category}
        <span class="chip variant-filled mr-3 mb-3 text-sm">{category.description}</span>
      {/each}
    </div> -->
  </footer>

</div>
