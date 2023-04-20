<script lang="ts">
  export let title: string;
  export let href: string;
  export let active: boolean;

  $: itemClass = active
    ? "transition-all text-neutral-200 flex align-middle font-bold"
    : "transition-all text-neutral-500 hover:text-neutral-200 flex align-middle font-bold";
</script>

<a class={itemClass} {href}>
  <span class="relative py-[5px] px-[10px]">
    {title}
    {#if active}
      <div class="absolute inset-0 bg-gray-800 rounded-md z-[-1]" />
    {/if}
  </span>
</a>
