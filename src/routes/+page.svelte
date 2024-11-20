<script lang="ts">
  import App from "$lib/components/App.svelte";
</script>

<div>
  <App />
</div>

<style>
  :global(body) {
    margin: 0;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  gmp-map-3d {
    height: 100%
  }

  /* div {
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  } */
</style>
