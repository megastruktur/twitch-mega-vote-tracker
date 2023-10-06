<script lang="ts">
	import type { Screenshot } from "$lib/types";
	import { Splide, type Options, SplideSlide } from "@splidejs/svelte-splide";
	import type { MoveEventDetail } from "@splidejs/svelte-splide/types";

  export let screenshots: Screenshot[]

  let activeScreenshot: Screenshot = screenshots[0]

  const splideConfig: Options  = {
		type: "loop",
		perPage: 5,
		perMove: 1,
		focus: "center",
		pagination: false,
		gap: 3,
	}

  function sliderModedHandler(e: CustomEvent<MoveEventDetail> | undefined) {
    if (e !== undefined) {
      activeScreenshot = screenshots[e.detail.index]
    }
  }

</script>
<div>
	{#if screenshots !== undefined && screenshots.length > 0}
		<img class="mb-2" src={activeScreenshot.path_full} alt={activeScreenshot.id.toString()} />
		<Splide options={ splideConfig } aria-label="Games" on:moved={sliderModedHandler}>
			{#each screenshots as screenshot(screenshot.id)}
			<SplideSlide>
				<img data-screenshot-id={screenshot.id} src={screenshot.path_thumbnail} alt={screenshot.id.toString()} />
			</SplideSlide>
			{/each}
		</Splide>
	{/if}
</div>
