<script lang="ts">
  import { ContactShadows, Float, HTML } from "@threlte/extras";

  export let position = { x: 0, y: 0, z: 0 };
  export let rotation = { x: 0, y: 0, z: 0 };
  export let size = 1;
  export let url: string;
  export let bgColor: string;
</script>

<Float floatIntensity={1} floatingRange={[0, 0.4]}>
  <HTML
    transform
    position={[position.x, position.y, position.z]}
    scale={[size, size, size]}
    rotation={[rotation.x, rotation.y, rotation.z]}
  >
    <div
      style={`background-color: ${bgColor};`}
      class="shadow-2xl shadow-yellow-500/50 rounded-md px-4 text-white py-2 font-semibold flex flex-col text-2xl text-center border-l-8 border-black"
    >
      <img src={url} alt="" />
    </div>
  </HTML>
</Float>
