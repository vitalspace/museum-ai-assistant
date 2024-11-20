<script>
  let fill = "black";
  let isHovered = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class=""
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
>
 <span class="font-semibold px-2 text-lg {isHovered ? 'text-[#1a73e8]' : 'text-black'}">X</span>

</div>