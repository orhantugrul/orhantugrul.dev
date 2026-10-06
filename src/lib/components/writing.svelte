<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowRight } from "@lucide/svelte";
  import Link from "$lib/components/link.svelte";
  import { drafts, posts, published } from "$lib/writing";

  const recent = posts.slice(0, 3);
</script>

<section class="border-b border-border px-8 py-12">
  <div class="mb-8 flex items-baseline justify-between">
    <h2
      class="font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
    >
      Writing
    </h2>
    <Link
      href={resolve("/writing")}
      class="group flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition hover:text-foreground"
    >
      See all
      <ArrowRight
        class="size-3.5 text-subtle-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground"
      />
    </Link>
  </div>
  {#if recent.length > 0}
    <ul class="space-y-1">
      {#each recent as { slug, date, title, readingTime } (slug)}
        <li>
          <Link
            href={resolve("/writing/[slug]", { slug })}
            class="group grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-82 transition hover:opacity-100 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem]"
          >
            <span
              class="col-start-2 font-mono text-xs whitespace-nowrap text-subtle-foreground tabular-nums max-sm:col-start-1"
            >
              {published(date)}
            </span>
            <span class="truncate font-medium">{title}</span>
            <span
              class="font-mono text-xs whitespace-nowrap text-subtle-foreground"
            >
              {readingTime} min
            </span>
            <ArrowRight
              class="size-3.5 text-subtle-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </Link>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="sr-only">Nothing published yet</p>
    <ul class="space-y-1" aria-hidden="true">
      {#each drafts as { date, title, time } (title)}
        <li
          class="grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-82 select-none *:blur-xs max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem]"
        >
          <span
            class="col-start-2 font-mono text-xs whitespace-nowrap text-subtle-foreground tabular-nums max-sm:col-start-1"
          >
            {date}
          </span>
          <span class="truncate font-medium text-muted-foreground opacity-75">
            {title}
          </span>
          <span
            class="font-mono text-xs whitespace-nowrap text-subtle-foreground"
          >
            {time}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</section>
