<script lang="ts">
  import { T } from "@threlte/core";
  import { HTML } from "@threlte/extras";

  let showDialog = false;

  export let title: string;
  export let description: string;
  export let buttonPosition: { x: number; y: number; z: number };
  export let diaglogPosition: { x: number; y: number; z: number };
</script>

<T.Group position={[buttonPosition.x, buttonPosition.y, buttonPosition.z]}>
  <HTML transform position={[0, 0, 0]} rotation={[0, 0, 0]}>
    <button
      on:click={() => (showDialog = !showDialog)}
      class=" cursor-pointer bg-black text-white font-bold rounded-md px-4 py-2"
      >{title}</button
    >
  </HTML>

  {#if showDialog}
    <HTML
      transform
      position={[diaglogPosition.x, diaglogPosition.y, diaglogPosition.z]}
      rotation={[0, 0, 0]}
    >
      <div class="w-[500px] bg-black text-white font-semibold p-2 rounded-md">
        <p>
          {description}
        </p>
      </div>
    </HTML>
  {/if}
</T.Group>
