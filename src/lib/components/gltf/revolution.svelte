<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 .\revolution.glb -T
-->

<script>
  import { T, forwardEventHandlers } from "@threlte/core";
  import { useGltf, interactivity, HTML } from "@threlte/extras";
  import { Group } from "three";
  // import { controls } from "../../../stores/stores";
  import { spring } from "svelte/motion";
  interactivity();
  const scale_1 = spring(1);
  const scale_2 = spring(1);

  export const ref = new Group();

  const gltf = useGltf("assets/revolution-transformed.glb", {
    useDraco: true,
  });

  const component = forwardEventHandlers();

  let controls = {
    position: {
      x: -9,
      y: -9.5,
      z: -32,
    },
    rotation: {
      x: 0,
      y: 5.5,
      z: 0,
    },
  };

  let showModalZapata = false;
  let showModalPancho = false;
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}
    <T.Group
      position={[controls.position.x, controls.position.y, controls.position.z]}
      rotation={[controls.rotation.x, controls.rotation.y, controls.rotation.z]}
      scale={[5, 5, 5]}
    >
      <T.Mesh
        scale={$scale_1}
        on:pointerenter={() => scale_1.set(1.01)}
        on:pointerleave={() => scale_1.set(1)}
        geometry={gltf.nodes["tripo_mesh_10f9859d-a799-4ea1-ba2a-f8293dede9fc"]
          .geometry}
        material={gltf.materials[
          "tripo_mat_10f9859d-a799-4ea1-ba2a-f8293dede9fc"
        ]}
      />

      <T.Mesh
        scale={$scale_2}
        on:pointerenter={() => scale_2.set(1.01)}
        on:pointerleave={() => scale_2.set(1)}
        geometry={gltf.nodes[
          "tripo_mesh_10f9859d-a799-4ea1-ba2a-f8293dede9fc_1"
        ].geometry}
        material={gltf.materials[
          "tripo_mat_612f58ac-9665-4c02-b0f2-5205531d88aa"
        ]}
      />
    </T.Group>

    <T.Group position={[-13, -4, 0]}>
      <HTML transform rotation={[0, 0, 0]}>
        <button
          on:click={() => (showModalZapata = !showModalZapata)}
          class=" cursor-pointer bg-black text-white font-bold rounded-md px-4 py-2"
          >Pancho Villa</button
        >
      </HTML>

      {#if showModalZapata}
        <HTML transform position={[-4.3, -3, 0]} rotation={[0, 0, 0]}>
          <div
            class="w-[500px] bg-black text-white font-semibold p-2 rounded-md"
          >
            <p>
              <span class="text-yellow-400">Pancho Villa</span> was a prominent leader
              of the Mexican Revolution (1910–1920), known for his military skill
              and efforts to overthrow the dictatorship of Porfirio Díaz. Born as
              Doroteo Arango, he led the Division of the North, playing a key role
              in battles for social reform and justice. Villa is remembered as a
              revolutionary hero and a symbol of resistance against oppression.
            </p>
          </div>
        </HTML>
      {/if}
    </T.Group>

    <T.Group position={[10, -4, 0]}>
      <HTML transform rotation={[0, 0, 0]}>
        <button
          on:click={() => (showModalPancho = !showModalPancho)}
          class=" cursor-pointer bg-black text-white font-bold rounded-md px-4 py-2"
          >Emiliano Zapata</button
        >
      </HTML>

      {#if showModalPancho}
        <HTML transform position={[4.3, -3, 0]} rotation={[0, 0, 0]}>
          <div
            class="w-[500px] bg-black text-white font-semibold p-2 rounded-md"
          >
            <p>
              <span class="text-yellow-400">Emiliano Zapata</span> was a key leader
              in the Mexican Revolution (1910–1920), known for advocating land reform
              and the rights of peasants. He led the Liberation Army of the South
              and championed the Plan of Ayala, calling for land redistribution.
              His slogan, "Tierra y Libertad" ("Land and Freedom"), symbolizes the
              fight for social justice in Mexico.
            </p>
          </div>
        </HTML>
      {/if}
    </T.Group>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
