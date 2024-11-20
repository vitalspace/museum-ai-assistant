<script lang="ts">
  import { T } from "@threlte/core";
  import { Text3DGeometry, Environment, interactivity } from "@threlte/extras";
  import { spring } from "svelte/motion";
  interactivity();
  const scale = spring(1);

  export let text: string;
  export let rotation = { x: 0, y: 0, z: 0 };
  export let position = { x: 0, y: 0, z: 0 };
</script>

<Environment files="/hdr/shanghai_riverside_1k.hdr" />

<T.Mesh
  scale={$scale}
  on:pointerenter={() => scale.set(1.1)}
  on:pointerleave={() => scale.set(1)}
  position={[position.x, position.y, position.z]}
  rotation={[rotation.x, rotation.y, rotation.z]}
>
  <Text3DGeometry size={1} height={0.2} {text} />

  <T.MeshStandardMaterial
    color="white"
    toneMapped={false}
    metalness={1.0}
    roughness={2}
  />
</T.Mesh>
