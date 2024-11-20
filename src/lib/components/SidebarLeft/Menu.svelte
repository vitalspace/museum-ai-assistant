<script lang="ts">
  import IaChat from './IaChat.svelte'

  let activeTabValue: number = 1
  let items = [
    {
      value: 1,
      label: "Museums",
      component: "",
      icon: "https://svgmix.com/uploads/xicons/2ec896-museum.svg",
    },
    {
      value: 2,
      label: "Museum AI Assistant",
      component: IaChat,
      icon: "gemini.svg",
    },
    // {
    //   value: 3,
    //   label: "Museum AI Assistant Route Planner",
    //   component: "",
    //   icon: "route-ai.svg",
    // },
  ];

  const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<div class="fixed bottom-0 top-0 w-20 border-2 z-40 bg-white">
  <div class="flex flex-col justify-center place-items-center gap-y-4 py-4">
    {#each items as item}
      <button on:click={handleClick(item.value)} class="py-4 w-full justify-center flex {activeTabValue == item.value ? 'bg-gray-100' : ''}" title={item.label}>
        <img class="w-8" src={item.icon} alt="" />
      </button>
    {/each}
  </div>
</div>

{#each items as item}
  {#if activeTabValue == item.value}
    <div class="w-[420px] border-r fixed z-40 right-0 top-0 bottom-0">
      <svelte:component this={item.component} />
      <!-- {item.label} -->
    </div>
  {/if}
{/each}
