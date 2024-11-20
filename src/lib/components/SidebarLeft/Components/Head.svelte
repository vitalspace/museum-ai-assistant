<script lang="ts">
    export let title: string;
    export let stars: number;
    export let reviews: number;
    export let top: number;
  </script>
  
  <div class="space-y-4 px-4 py-2">
    <div>
      <h1 class="text-[1.4rem] font-bold">{title}</h1>
    </div>
  
    <div class="flex space-x-2 w-full justify-between place-items-center">
      <div>
        <div>
          <h2 class="text-md py-1 font-bold">
            N.{top} of 768 in Mexico City
          </h2>
        </div>
  
        <div class="flex place-items-center space-x-2">
          <div class="flex">
            {#each Array(stars) as _}  
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
          <p class="font-medium text-sm">{reviews} reviews</p>
        </div>
      </div>
  
      <div class="flex place-items-center space-x-2">
        <button>
          <img
            class="w-10 h-10 px-2 py-2 rounded-md border"
            src="heart.svg"
            alt=""
          />
        </button>
        <button>
          <img
            class="w-10 h-10 px-2 py-2 border rounded-md"
            src="share-android.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
  