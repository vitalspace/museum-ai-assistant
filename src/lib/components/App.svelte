<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { isFocused } from "../../stores/stores";
  import Scene from "./Scene.svelte";
// import SidebarRight from "./SidebarRight.svelte";
  import SidebarLeft from "./SidebarLeft.svelte";
  // import { Folder, Slider } from "svelte-tweakpane-ui";
</script>

<SidebarLeft />
<!-- <SidebarRight /> -->
<!-- <div class="fixed top-0 right-0 z-20">
  <Folder title="🎛️">
    <Slider
      label="Position X"
      bind:value={$controls.position.x}
    />

    <Slider
      label="Position Y"
      bind:value={$controls.position.y}
    />

    <Slider
      label="Position Z"
      bind:value={$controls.position.z}
    />

    <Slider
      label="Rotation X"
      bind:value={$controls.rotation.x}
      min={0}
      max={10}
    />

    <Slider
      label="Rotation Y"
      bind:value={$controls.rotation.y}
      min={0}
      max={10}
    />

    <Slider
      label="Rotation Z"
      bind:value={$controls.rotation.z}
      min={0}
      max={10}
    />

  </Folder> -->
<!-- </div> -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div on:click={() => isFocused.set(false)} class="z-10 absolute inset-0">
  <Canvas>
    <Scene />
  </Canvas>
</div>
