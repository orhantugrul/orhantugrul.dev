<script lang="ts">
  import { resolve } from "$app/paths";
  import Navigation from "$lib/components/navigation.svelte";
  import type { Writing } from "$lib/types";
  import { writings } from "$lib/writings";

  const title = "Writing — Orhan Tugrul Sahin";
  const description = writings.length
    ? "Notes to my future self, published by accident."
    : "A place for notes, ideas, and things worth remembering.";

  const grouped: [number, Writing[]][] = [];
  for (const writing of writings) {
    const year = new Date(writing.date).getFullYear();
    const current = grouped.at(-1);
    if (current?.[0] === year) current[1].push(writing);
    else grouped.push([year, [writing]]);
  }

  function monthDay(date: string): string {
    return date.slice(5, 10);
  }

  /* list rows: date · title · meta */
  const row =
    "link-hover grid grid-cols-[7.5em_1fr_auto] items-baseline gap-4.5 py-3.5 opacity-82 hover:opacity-100 max-sm:grid-cols-[1fr_auto]";
  const rowLabel =
    "font-mono text-[12px] whitespace-nowrap text-faint tabular-nums max-sm:hidden";
  const rowMeta = "font-mono text-[11.5px] whitespace-nowrap text-faint";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://orhantugrul.dev/og/writing.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://orhantugrul.dev/og/writing.png" />
</svelte:head>

<header class="flex h-16 shrink-0 items-center justify-end px-8">
  <Navigation />
</header>

<section class="border-b border-rule px-8 pt-10 pb-14">
  <h1 class="text-[24px] font-medium tracking-[-0.02em]">
    {writings.length ? "Things I wrote" : "Writing"}
  </h1>
  <p class="mt-2.5 max-w-[50ch] text-dim">{description}</p>

  {#each grouped as [year, yearly] (year)}
    <p class="mt-10 mb-1.5 font-mono text-[11px] tracking-[0.14em] text-faint">
      {year}
    </p>
    <ul>
      {#each yearly as { slug, title: writingTitle, date, readingTime } (slug)}
        <li class="border-b border-rule last:border-0">
          <a href={resolve("/writing/[slug]", { slug })} class={row}>
            <span class={rowLabel}>{monthDay(date)}</span>
            <span class="font-medium">{writingTitle}</span>
            <span class={rowMeta}>{readingTime} min</span>
          </a>
        </li>
      {/each}
    </ul>
  {/each}

  {#if writings.length === 0}
    <div class="mt-11 border-t border-rule pt-7">
      <p class="text-[16px] font-medium tracking-[-0.012em]">
        Nothing published—yet.
      </p>
      <p class="mt-2.5 max-w-[52ch] text-pretty text-dim">
        I’m collecting thoughts on building products, engineering decisions, and
        the lessons worth keeping. The first one will arrive here soon.
      </p>
      <p class="mt-5 font-mono text-[11px] tracking-[0.04em] text-faint">
        First note / in progress
      </p>
    </div>
  {/if}
</section>
