<script lang="ts">
  import { get } from "svelte/store";
  import {
    currentLocationId,
    locations,
    isFocused,
  } from "../../../../stores/stores";
  import IaChat from "../Components/tabs/IaChat.svelte";
  import Information from "../Components/tabs/Information.svelte";
  import Reviews from "../Components/tabs/Reviews.svelte";

  let activeTab = 1;

  const handleClick = (tabValue: number) => {
    activeTab = tabValue;
  };

  let items = [
    {
      value: 1,
      label: "Information",
      icon: "info-circle.svg",
      component: Information,
      props: {
        description:
          get(locations)?.find((location) => location.id === $currentLocationId)
            ?.description ?? "",
        address:
          get(locations)?.find((location) => location.id === $currentLocationId)
            ?.address ?? "",
        transportation:
          get(locations)?.find((location) => location.id === $currentLocationId)
            ?.transportation ?? [],
        nearbyLandmarks:
          get(locations)?.find((location) => location.id === $currentLocationId)
            ?.nearbyLandmarks ?? [],
        category:
          get(locations)?.find((location) => location.id === $currentLocationId)
            ?.category ?? "",
        facilities:
          get(locations)?.find((location) => location.id === $currentLocationId)
            ?.facilities ?? [],
      },
    },
    // {
    //   value: 2,
    //   label: "Tickets",
    //   icon: "ticket.svg",
    //   component: IaChat,
    // },
    {
      value: 2,
      label: "Reviews",
      icon: "message.svg",
      component: Reviews,
      props: {
        place_id:
          get(locations)?.find((location) => location.id === $currentLocationId)
            ?.place_id ?? "",
      },
    },
  ];
</script>

<div class="flex justify-between space-x-2 rounded-md bg-[#f4f4f5] p-1">
  {#each items as item}
    <button
      class="flex place-items-center justify-center w-full space-x-2 rounded-md py-2 px-2
    {activeTab === item.value
        ? 'active-tab animate text-black'
        : 'bg-[#f4f4f5] text-gray-600'}"
      on:click={() => handleClick(item.value)}
      on:animationend={(e) => e.target.classList.remove("animate")}
      class:animate={activeTab === item.value}
    >
      <img class="w-4 h-4" src={item.icon} alt="" />
      <span class="font-semibold text-sm">{item.label}</span>
    </button>
  {/each}
</div>

{#each items as item}
  {#if activeTab === item.value}
    <svelte:component this={item.component} {...item.props} />
  {/if}
{/each}

<style>
  /* Animación de escala para hacer que el botón crezca */
  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate {
    animation: scaleAnimation 0.3s ease-in-out;
  }

  /* Estilos para el botón activo */
  .active-tab {
    background-color: white;
  }
</style>
