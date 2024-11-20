<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";
  import {
    infoModalIsOpen,
    currentLocation,
    locations,
    currentLocationId,
  } from "../../../../stores/stores";
</script>

<div class="bg-black">
  <button
    on:click={() => infoModalIsOpen.set(false)}
    class="bg-white absolute top-2 right-2 rounded-full p-2 hover:bg-gray-200 transition-colors"
  >
    <img width="10" src="/close.svg" alt="" />
  </button>

  <div class="h-60">
    {#each $locations as location}
      {#if location.id === $currentLocationId}
        <div>
          <img class="h-60 w-full" src={location.image} alt="" />
        </div>
      {/if}
    {/each}
  </div>
</div>
