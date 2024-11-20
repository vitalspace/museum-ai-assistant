<script lang="ts">
  import {
    locations,
    currentLocationId,
    infoModalIsOpen,
    isFocused,
    currentLocation,
  } from "../../../stores/stores";
  import { type Museum } from "../../../types/types.d";

  let searchText = ""; // Texto del input de búsqueda
  let selectedFilters: string[] = []; // Filtros seleccionados
  let filteredMuseums: Museum[] = []; // Museos filtrados

  // Declaración reactiva para recalcular los museos filtrados
  $: {
    filteredMuseums = $locations.filter((museum) => {
      // Filtrado por texto
      const matchesSearch =
        searchText.trim() === "" ||
        museum.title.toLowerCase().includes(searchText.toLowerCase()) ||
        museum.description.toLowerCase().includes(searchText.toLowerCase());

      // Filtrado por categorías seleccionadas
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.some((filter) =>
          museum.category.toLowerCase().includes(filter.toLowerCase())
        ) ||
        selectedFilters.some((filter) =>
          museum.tags.some((tag) =>
            tag.toLowerCase().includes(filter.toLowerCase())
          )
        ) ||
        selectedFilters.some((filter) =>
          museum.generalAdmission.toLowerCase().includes(filter.toLowerCase())
        ) ||
        selectedFilters.some((filter) => {
          if (filter.toLocaleLowerCase() == "more views") {
            return museum.reviews >= 1300;
          }
        }) ||
        selectedFilters.some((filter) => {
          if (filter.toLocaleLowerCase() == "more stars") {
            return museum.stars >= 4;
          }
        });

      return matchesSearch && matchesFilters;
    });
  }

  // Alternar filtros seleccionados
  function toggleFilter(filter: string) {
    if (selectedFilters.includes(filter)) {
      selectedFilters = selectedFilters.filter((f) => f !== filter); // Remover filtro
    } else {
      selectedFilters = [...selectedFilters, filter]; // Agregar filtro
    }
  }

  // Manejar el cambio en el input de búsqueda
  function handleSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    searchText = input.value;
  }
</script>

<div class="w-[420px] border-r border-b left-20 fixed z-40 bg-white">
  <div class="flex place-items-center space-x-2 p-4">
    <div class="flex border rounded-md space-x-2 px-2 w-full">
      <div class="flex place-items-center space-x-2 w-full">
        <img class="w-6" src="search.svg" alt="" />
        <input
          on:focus={() => ($isFocused = true)}
          on:input={handleSearchInput}
          class="py-2 w-full outline-none"
          type="text"
          placeholder="Search Museums"
        />
      </div>
      <button
        on:click={() => {
          $isFocused = false;
          searchText = ""; // Limpiar búsqueda
        }}
        class=""
      >
        <img width="10" src="close.svg" alt="" />
      </button>
    </div>
    <button class="border rounded-md p-3">
      <img class="w-6" src="filter.svg" alt="" />
    </button>
  </div>

  {#if $isFocused}
    <!--MENU FILTER -->
    <div class="space-y-2 mt-2 px-4">
      {#each ["Free", "More Views", "More Stars", "Guides available", "Art", "History", "Science", "Economy", "Technology"] as filter}
        <button
          style={selectedFilters.includes(filter)
            ? "background-color: #131314; color: #fff;"
            : ""}
          on:click={() => toggleFilter(filter)}
          class="font-semibold px-2 bg-gray-100 rounded-2xl text-sm"
        >
          {filter}
        </button>
      {/each}
    </div>
  {/if}

  <!-- RESULTADOS -->
  {#if $isFocused}
    <div class="scrollbar-thumb-gray-800 scrollbar-track-gray-200">
      <div
        class="mt-4 h-[calc(100vh-160px)] overflow-y-auto border-t scroll-smooth scrollbar-thin pb-4"
      >
        {#if filteredMuseums.length > 0}
          {#each filteredMuseums as museum}
            <button
              class="w-full"
              on:click={() => {
                //@ts-ignore
                currentLocationId.set(museum.id);
                infoModalIsOpen.set(true);
                currentLocation.set({
                  lat: museum.lat,
                  lng: museum.lng,
                  altitude: museum.altitude,
                  tilt: museum.tilt,
                  range: museum.range,
                  heading: museum.heading,
                });
              }}
            >
              <div
                class="hover:bg-gray-100 px-4 transition-colors flex place-items-center justify-between space-x-2 border-b"
              >
                <div class="p-2 text-start">
                  <h3 class="font-bold">{museum.title}</h3>
                  <p class="text-xs text-gray-500">{museum.category}</p>
                  <div class="flex space-x-2 place-items-center">
                    {#each Array(museum.stars) as _}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
                        />
                      </svg>
                    {/each}
                    <p class="font-medium text-xs">{museum.reviews} reviews</p>
                  </div>
                  <div>
                    <p class="text-xs">{museum.address}</p>
                  </div>
                </div>
                <img class="rounded-md w-24 h-20" src={museum.image} alt="" />
              </div>
            </button>
          {/each}
        {:else}
          <p>No results found</p>
        {/if}
      </div>
    </div>
  {/if}
</div>
