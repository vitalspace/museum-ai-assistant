<script lang="ts">
  import { T } from "@threlte/core";
  import { onMount } from "svelte";

  import {
    controls,
    currentLocation,
    currentLocationId,
    locations,
  } from "../../stores/stores";

  import Text3d from "./scene/Text.svelte";
  import ImageAd from "./scene/Image.svelte";
  import FloatingAd from "./scene/Floating.svelte";
  import Dialog from "./scene/Dialog.svelte";

  import Antropology from "./gltf/antropology.svelte";
  import Cilindro from "./gltf/cilindro.svelte";
  import Soumaya from "./gltf/soumaya.svelte";
  import Mayor from "./gltf/mayor.svelte";
  import Munal from "./gltf/munal.svelte";
  import Revolution from "./gltf/revolution.svelte";

  // let cL = $locations.find(location => location.id === $currentLocationId);
  // let floatingAds = cL?.ads.filter(ad => ad.type === 'floating') || [];

  $: cl = $locations.find((location) => location.id === $currentLocationId);
  $: floatingAds = cl?.ads?.filter((ad) => ad.type === "floating") || [];
  $: bannerAds = cl?.ads?.filter((ad) => ad.type === "banner") || [];
  $: imageAds = cl?.ads?.filter((ad) => ad.type === "image") || [];
  $: gltf = cl?.gltf;

  let map3DElement: any;
  let cameraPosition: any;

  onMount(async () => {
    // Carga dinámica de la biblioteca Maps3D
    const { Map3DElement } = await google.maps.importLibrary("maps3d");

    // Inicializa el mapa
    map3DElement = new Map3DElement({
      center: {
        lat: $currentLocation.lat,
        lng: $currentLocation.lng,
        altitude: $currentLocation.altitude,
      },
      tilt: $currentLocation.tilt,
      range: $currentLocation.range,
      heading: $currentLocation.heading,
      defaultLabelsDisabled: true,
    });

    document.body.append(map3DElement);
  });

  $: if (map3DElement && $currentLocation) {
    map3DElement.flyCameraTo({
      endCamera: {
        center: {
          lat: $currentLocation.lat,
          lng: $currentLocation.lng,
          altitude: $currentLocation.altitude,
        },
        tilt: $currentLocation.tilt,
        range: $currentLocation.range,
        heading: $currentLocation.heading,
      },
      durationMillis: 2000,
    });
  }

  $: if ($controls) {
    console.log($controls);
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-10, 10, 100]}
  fov={15}
  on:create={({ ref }) => {
    cameraPosition = ref;
    ref.lookAt(
      -0.21078151644599502,
      -0.026395356654596934,
      -0.0056468241977863836
    );
  }}
></T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={0} position.y={10} />
<T.AmbientLight intensity={0.2} />

<!-- <div class=" top-0 left-0 right-0 border-2 absolute bg-black z-50">
  <input class="w-full border-2" type="range" min="0" max="360" name="" id="" on:input={foo} />
</div> -->

<!-- <Grid
  position.y={-0.001}
  cellColor="red"
  sectionColor="red"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
/> -->

<!-- <HTML
  transform
  position={[$controls.position.x, $controls.position.y, $controls.position.z]}
  scale={[0.5, 0.5, 0.5]}
  rotation={[$controls.rotation.x, $controls.rotation.y, $controls.rotation.z]}
>
  <div
    class="bg-orange-400 rounded-md px-4 text-center text-white py-2 flex flex-col"
  >
    <span>M</span>
    <span>u</span>
    <span>s</span>
    <span>i</span>
    <span>c</span>
  </div>
</HTML> -->

<!-- <Text3d
  text={"Frida Kahlo Museum"}
  position={$controls.position}
  rotation={$controls.rotation}
/> -->

{#if gltf == "antropology"}
  <Antropology />
{/if}

{#if gltf == "kahlo"}
  <Cilindro />
{/if}

{#if gltf == "soumaya"}
  <Soumaya />
{/if}

{#if gltf == "templo"}
  <Mayor />
{/if}

{#if gltf == "munal"}
  <Munal />
{/if}

{#if gltf == "revolution"}
  <Revolution />
{/if}

{#if bannerAds.length > 0}
  {#each bannerAds as ad}
    <Text3d text={ad.title} position={ad.position} rotation={ad.rotation} />
  {/each}
{/if}

{#if imageAds.length > 0}
  {#each imageAds as ad}
    <ImageAd
      url={ad.url}
      bgColor={ad.bgColor}
      position={ad.position}
      rotation={ad.rotation}
      size={ad.size}
    />
    <Dialog
      title={ad.title}
      description={ad.description}
      buttonPosition={ad.buttonPosition}
      diaglogPosition={ad.diaglogPosition}
    />
  {/each}
{/if}

{#if floatingAds.length > 0}
  {#each floatingAds as ad}
    <FloatingAd
      bgColor={ad.bgColor}
      position={ad.position}
      rotation={ad.rotation}
      size={ad.size}
      text={ad.title}
    />
  {/each}
{/if}

<!-- <ImageAd
  url={"/images/anafrank.avif"}
  bgColor={"#d0a25c"}
  position={$controls.position}
  rotation={$controls.rotation}
  size={1}
/> -->

<!-- <Text3d
  text="Memory and Tolerance Museum"
  position={{
    x: $controls.position.x,
    y: $controls.position.y,
    z: $controls.position.z,
  }}
  rotation={{
    x: $controls.rotation.x,
    y: $controls.rotation.y,
    z: $controls.rotation.z,
  }}
/> -->

<!-- <FloatingAd
  bgColor={"#d0a25c"}
  position={$controls.position}
  rotation={$controls.rotation}
  size={1}
  text={"Art's"}
/> -->
