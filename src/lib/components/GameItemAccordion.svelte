<script lang="ts">
	import type { GamesResponse, SteamGameDataResponse } from "$lib/pocketbase-types";
	import type { SteamGameData } from "$lib/types";
	import { AccordionItem, ProgressRadial } from "@skeletonlabs/skeleton";
  import { PUBLIC_CORS_PROXY_URL } from "$env/static/public"
	import GameCardAccordion from "./GameCardAccordion.svelte";
	import { pb } from "$lib/pocketbase";

  export let game: GamesResponse
  let steamGameData: SteamGameDataResponse | null = null

	async function getSteamGameData(): Promise<SteamGameDataResponse | null> {

    try {
      return pb.collection("steam_game_data").getFirstListItem(`game="${game.id}"`)
    }
    catch (e) {
      console.log(e)
      return null
    }
	}

	function getGameAppId(game: GamesResponse): number {
		// Parse the URL and get the second path
    const gameId = new URL(game.steamLink).pathname?.split("/")[2]
		if (gameId !== undefined) {
			return parseInt(gameId)
		}
		else {
			return 0
		}
	}

  async function loadData() {
    if (steamGameData === null) {
      steamGameData = await getSteamGameData()
    }
  }

</script>

<AccordionItem id={game.id}>
  <svelte:fragment slot="summary">
    <div>{game.name}</div>
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#await loadData()}
      <ProgressRadial />
    {:then}
      {#if steamGameData !== null}
        <GameCardAccordion {game} {steamGameData} />
      {/if}
    {/await}
  </svelte:fragment>
</AccordionItem>
