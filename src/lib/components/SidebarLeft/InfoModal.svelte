<script lang="ts">
  import {
    locations,
    infoModalIsOpen,
    currentLocationId,
    isFocused,
  } from "../../../stores/stores";

  import Head from "./Components/Head.svelte";
  import Canvas from "./Components/Canvas.svelte";
  import Tabs from "./Components/Tabs.svelte";
</script>

{#if $infoModalIsOpen && $isFocused}
  <div class="fixed left-[520px] top-0 w-[420px] z-40 bg-white">
    {#each $locations as location}
      {#if location.id === $currentLocationId}
        <!-- {location.title} -->
        <Canvas />
        <div class=" border-r border-l">
          <Head
            title={location.title}
            stars={location.stars}
            reviews={location.reviews}
            top={location.top}
          />
          <Tabs />
        </div>
      {/if}
    {/each}
  </div>
{/if}
