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
	}

  function sliderModeHandler(e: CustomEvent<MoveEventDetail> | undefined) {
    if (e !== undefined) {
      let index = (e.detail.dest >= 0) ? e.detail.dest : screenshots.length + e.detail.dest;
      activeScreenshot = screenshots[index]
    }
  }

</script>
<div>
  <img src={activeScreenshot.path_full} alt={activeScreenshot.id.toString()} />
  <Splide options={ splideConfig } aria-label="Games" on:move={sliderModeHandler}>
		{#each screenshots as screenshot(screenshot.id)}
		<SplideSlide>
      <img src={screenshot.path_thumbnail} alt={screenshot.id.toString()} />
		</SplideSlide>
		{/each}
	</Splide>
</div>
