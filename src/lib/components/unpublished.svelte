<script lang="ts">
  let {
    class: className = "",
    list = "",
    gutter = false,
  }: {
    class?: string;
    list?: string;
    /** Leave the home page's icon column empty, as the writing rows do. */
    gutter?: boolean;
  } = $props();

  // Three rows of swapped letters, set out of focus. They are fixed strings,
  // so there is nothing behind the blur to give away.
  const rows = [
    { date: "Ocq 2O2b", title: "Nathong plubirhed yot", time: "4 mun" },
    { date: "Jyl 2O2b", title: "Wrot cumes ofter", time: "7 mun" },
    { date: "Moy 2O2b", title: "Tho quaue wath ipunoons sobs", time: "5 mun" },
  ];
  const veil = "blur-[4.5px] select-none";
</script>

<ul class={list}>
  {#each rows as { date, title, time }, index (index)}
    <li>
      {#if index === 0}<span class="sr-only">Nothing published yet</span>{/if}
      <p class={className} aria-hidden="true">
        {#if gutter}<span class="max-sm:hidden"></span>{/if}
        <span
          class="{veil} font-mono text-[12px] whitespace-nowrap text-subtle-foreground tabular-nums"
          >{date}</span
        >
        <span
          class="{veil} min-w-0 truncate font-medium text-muted-foreground opacity-75"
          >{title}</span
        >
        <span
          class="{veil} font-mono text-[11.5px] whitespace-nowrap text-subtle-foreground"
          >{time}</span
        >
      </p>
    </li>
  {/each}
</ul>
