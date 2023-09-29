<script lang="ts">
	import type { GamesResponse } from "$lib/pocketbase-types";
	import type { SteamGameData } from "$lib/types";
	import { popup, ProgressRadial, type PopupSettings } from "@skeletonlabs/skeleton";
	import GameCard from "./GameCard.svelte";
  import { PUBLIC_CORS_PROXY_URL } from "$env/static/public"

  export let game: GamesResponse
  let steamGameData: SteamGameData

  const popupHover: PopupSettings = {
    event: 'hover',
    target: `popupHover-${game.id}`,
    placement: 'top'
  }

	async function getSteamGameData(steamAppId: number) {

    const language = "russian"

    const steamUrl = `${PUBLIC_CORS_PROXY_URL}/https://store.steampowered.com/api/appdetails?appids=${steamAppId}&l=${language}`
    // Fetch the data from url
    try {
      const response = await fetch(steamUrl);
      const steamGameDataResponse = await response.json()

      if (steamGameDataResponse[steamAppId] !== undefined) {
        const steamGameData = steamGameDataResponse[steamAppId].data
        if (steamGameData) {
          return steamGameData
        }
        else {
          throw new Error(`Failed to get steam game data for ${steamAppId}`)
        }
      }
      else {
        throw new Error(`Failed to get steam game data for ${steamAppId}`)
      }

    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get steam game data for ${steamAppId}`)
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

  async function gameHover() {
    if (steamGameData === undefined) {
      steamGameData = await getSteamGameData(getGameAppId(game))
    }
  }

</script>

<div
  class="w-full [&>*]:pointer-events-none text-3xl cursor-pointer"
  use:popup={popupHover}
  >
  {game.name}
</div>

<div class="card p-4 variant-filled-surface" data-popup="popupHover-{game.id}">
  {#await gameHover()}
    <ProgressRadial />
  {:then}
    {#if steamGameData !== undefined}
      <GameCard {steamGameData} />
    {/if}
  {/await}
</div>
