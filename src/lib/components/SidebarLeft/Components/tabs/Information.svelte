<script lang="ts">
  export let description: string;
  export let address: string;
  export let transportation: {
    bus?: string;
    metro?: string;
    car?: string;
  };
  export let nearbyLandmarks: string[];
  export let category: string;
  export let facilities: string[];
</script>

<div class="scrollbar-thumb-gray-800 scrollbar-track-gray-200">
  <div class="overflow-y-auto scroll-smooth scrollbar-thin h-[calc(100vh-400px)] ">
    <div class="text-justify px-4 py-4 border-b space-y-4">
      <h3 class="font-semibold tracking-tight text-2xl">General Information</h3>
      <p class="text-sm text-muted-foreground">{description}</p>
    </div>

    <div class="grid gap-y-2 text-justify border-b px-4 py-4 space-y-4">
      <h3 class="font-semibold tracking-tight text-2xl">
        Location & How to Get There
      </h3>

      <div>
        <p class="font-medium mb-2">Address</p>
        <p class="text-sm text-muted-foreground">{address}</p>
      </div>

      <div>
        <p class="font-medium mb-2">How to get there:</p>
        <p class="text-sm text-muted-foreground">Bus: {transportation.bus}</p>
        <p class="text-sm text-muted-foreground">
          Metro: {transportation.metro}
        </p>
        <p class="text-sm text-muted-foreground">Car: {transportation.car}</p>
      </div>

      <div>
        <p class="font-medium mb-2">Nearby landmarks:</p>
        <ul class="space-y-1">
          {#each nearbyLandmarks as landmark}
            <li class="text-sm text-muted-foreground">{landmark}</li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="text-justify px-4 py-4  border-b space-y-4">
      <h3 class="font-semibold tracking-tight text-lg">Category</h3>
      <p class="text-sm text-muted-foreground">{category}</p>
    </div>

    <div class="text-justify px-4 py-4 border-b space-y-4">
      <h3 class="font-semibold tracking-tight text-lg">Facilities</h3>
      <ul class="space-y-1">
        {#each facilities as facility}
          <li class="text-sm text-muted-foreground">{facility}</li>
        {/each}
      </ul>
    </div>
  </div>
</div>
