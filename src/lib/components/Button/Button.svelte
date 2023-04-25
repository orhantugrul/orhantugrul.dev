<script lang="ts">
  import ArrowIcon from "../Icon/ArrowIcon.svelte";

  export let href: string;
</script>

<a
  class="flex w-full border border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-200 hover:bg-neutral-900 transition-all justify-between"
  target="_blank"
  rel="noopener noreferrer"
  {href}
>
  <slot />
  <ArrowIcon class={"mr-2"} />
</a>
