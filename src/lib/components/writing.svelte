<script lang="ts">
  import { ArrowRight } from "@lucide/svelte";
  import { published, writings } from "$lib/writings";

  // Three rows of swapped letters, set out of focus. They are fixed strings,
  // so there is nothing behind the blur to give away.
  const drafts = [
    { date: "Ocq 2O2b", title: "Nathong plubirhed yot", time: "4 mun" },
    { date: "Jyl 2O2b", title: "Wrot cumes ofter", time: "7 mun" },
    { date: "Moy 2O2b", title: "Tho quaue wath ipunoons sobs", time: "5 mun" },
  ];

  const draft = writings.length === 0;
  const rows = draft
    ? drafts
    : writings.slice(0, 3).map(({ date, title, readingTime }) => ({
        date: published(date),
        title,
        time: `${readingTime} min`,
      }));
</script>

<section class="border-b border-border px-8 py-12">
  <h2
    class="mb-8 font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
  >
    Writing
  </h2>
  {#if draft}<p class="sr-only">Nothing published yet</p>{/if}
  <ul class="space-y-1" aria-hidden={draft}>
    {#each rows as { date, title, time }, index (index)}
      <li
        class={[
          "group grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-82 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem]",
          !draft && "transition hover:opacity-100",
        ]}
      >
        <span
          class={[
            "col-start-2 font-mono text-xs whitespace-nowrap text-subtle-foreground tabular-nums max-sm:col-start-1",
            draft && "blur-xs select-none",
          ]}
        >
          {date}
        </span>
        <span
          class={[
            "truncate font-medium",
            draft && "text-muted-foreground opacity-75 blur-xs select-none",
          ]}
        >
          {title}
        </span>
        <span
          class={[
            "font-mono text-xs whitespace-nowrap text-subtle-foreground",
            draft && "blur-xs select-none",
          ]}
        >
          {time}
        </span>
        {#if !draft}
          <ArrowRight
            class="size-3.5 text-subtle-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        {/if}
      </li>
    {/each}
  </ul>
</section>
