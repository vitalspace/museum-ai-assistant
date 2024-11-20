<script lang="ts">
  import { onMount } from "svelte";

  export let place_id: string;
  let reviews = [];
  onMount(async () => {
    try {
      const { Place } = await google.maps.importLibrary("places");

      const place = new Place({
        id: place_id,
      });

      await place.fetchFields({
        fields: ["reviews"],
      });

      reviews = place.reviews || [];

      console.log(reviews);
    } catch (error) {
      console.error(error);
    }
  });
</script>

<div class=" scrollbar-thumb-gray-800 scrollbar-track-gray-200">
  {#if reviews.length > 0}
    <div
      class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 overflow-y-auto scroll-smooth scrollbar-thin h-[calc(100vh-405px)]"
    >
      {#each reviews as review}
        <div class="bg-white p-4 flex flex-col">
          <div class="flex items-center mb-4">
            <img
              src={review.authorAttribution.photoURI}
              alt={review.authorAttribution.displayName}
              class="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <a
                href={review.authorAttribution.uri}
                target="_blank"
                rel="noopener noreferrer"
                class="text-lg font-semibold text-blue-600 hover:underline"
              >
                {review.authorAttribution.displayName}
              </a>
              <p class="text-sm text-gray-500">
                {review.relativePublishTimeDescription}
              </p>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-700">{review.text}</p>
          </div>

          <div class="mt-auto">
            <p class="text-sm text-gray-600">Calificación:</p>
            <div class="flex items-center">
              <span class="text-yellow-500 text-lg font-bold mr-2"
                >{review.rating}</span
              >
              <div class="flex">
                {#each Array(review.rating) as _}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
                    />
                  </svg>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-gray-500">No reviews available.</p>
  {/if}
</div>
