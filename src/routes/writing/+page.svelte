<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Writing } from "$lib/types";
  import { formatDate, writings } from "$lib/writings";

  const title = "Writing — Orhan Tugrul Sahin";
  const description = "Notes to my future self, published by accident.";

  // Writings arrive newest first, so same-year ones are already contiguous.
  const grouped: [number, Writing[]][] = [];
  for (const writing of writings) {
    const year = new Date(writing.date).getFullYear();
    const current = grouped.at(-1);
    if (current?.[0] === year) current[1].push(writing);
    else grouped.push([year, [writing]]);
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<div>
  <h1 class="font-display text-[1.5rem] font-semibold md:text-[1.75rem]">
    Things I wrote
  </h1>
  <p class="mt-3 text-muted-foreground">{description}</p>

  {#each grouped as [year, yearly] (year)}
    <section class="mt-14">
      <h2
        class="mb-6 font-display text-label font-medium text-muted-foreground uppercase tabular-nums"
      >
        {year}
      </h2>
      <ul class="space-y-8">
        {#each yearly as { slug, title: writingTitle, description: summary, date, readingTime } (slug)}
          <li>
            <a
              href={resolve("/writing/[slug]", { slug })}
              class="font-medium underline decoration-border-strong decoration-1 underline-offset-3 transition-colors duration-150 hover:decoration-primary"
            >
              {writingTitle}
            </a>
            <p class="mt-1 text-muted-foreground">{summary}</p>
            <p
              class="mt-1 flex items-center gap-2 text-meta text-muted-foreground tabular-nums"
            >
              <time datetime={date}>{formatDate(date)}</time>
              <span
                class="inline-block size-0.75 shrink-0 rounded-full bg-muted-foreground/50"
                aria-hidden="true"
              ></span>
              <span>{readingTime} min read</span>
            </p>
          </li>
        {/each}
      </ul>
    </section>
  {/each}

  {#if writings.length === 0}
    <p class="mt-8 text-muted-foreground">Nothing published yet.</p>
  {/if}
</div>
