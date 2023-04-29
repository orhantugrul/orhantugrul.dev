<script lang="ts">
  import ArrowIcon from "../Icon/ArrowIcon.svelte";

  export let title: string;
  export let href: string;
</script>

<a
  class="flex items-center hover:text-neutral-200 transition-all"
  target="_blank"
  rel="noopener noreferrer"
  {href}
>
  <ArrowIcon class="mr-2 mb-1" />
  <p class="h-7">{title}</p>
</a>
