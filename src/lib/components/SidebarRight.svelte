<script lang="ts">
  import { onMount } from "svelte";
  import { currentLocationId, locations, isFocused } from "../../stores/stores";
  import Canvas from "./SidebarRight/Canvas.svelte";
  import CardTitle from "./SidebarRight/CardTitle.svelte";
  import Schedule from "./SidebarRight/Schedule.svelte";
  import Tabs from "./SidebarRight/Tabs.svelte";

  let title: string;
  let stars: number;
  let top: number;
  let reviews: number;
  let schedule: string;
  let category: string;
  let price: number;
  let isOpen = true; // Estado para abrir/cerrar el sidebar

  onMount(() => {
    locations.subscribe((value) => {
      value.forEach((location) => {
        if (location.id === $currentLocationId) {
          title = location.title;
          top = location.top;
          stars = location.stars;
          reviews = location.reviews;
          schedule = location.schedule;
          category = location.category;
          price = location.generalAdmission as unknown as number;
        }
      });
    });
  });

  function toggleSidebar() {
    isOpen = !isOpen; // Alternar el estado del sidebar
  }
</script>

<!-- Sidebar -->
<div
  class="fixed right-0 top-0 border-2 bottom-0 w-[450px] p-4 overflow-y-auto space-y-4 z-20 bg-white transition-all duration-300"
  style="right: {isOpen ? '0' : '-450px'}"
>
  {#if !$isFocused}
    <CardTitle {top} {stars} {reviews} {title} />
    <Canvas />
    <Schedule {schedule} {category} />
  {/if}
  <Tabs />
</div>

<!-- Botón -->
<button
  class="fixed top-1/2 -translate-y-1/2 z-30 px-4 py-2 bg-[#131314] text-white rounded-md hover:bg-gray-800 toggle-btn transition-all"
  style="right: {isOpen ? '450px' : '0'}; transition: right 0.25s ease-in-out;"
  on:click={toggleSidebar}
>
  {isOpen ? "Close" : "Open"}
</button>

<style>
  /* Botón: misma transición que el sidebar */
  .toggle-btn {
    transform: rotate(-90deg);
    transform-origin: center;
    transition: right 0.3s ease-in-out; /* Suavidad en el movimiento */
  }
</style>
