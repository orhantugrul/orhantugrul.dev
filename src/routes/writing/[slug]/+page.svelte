<script lang="ts">
  import { resolve } from "$app/paths";
  import { formatDate } from "$lib/writings";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let metadata = $derived(data.metadata);
  let title = $derived(`${metadata.title} — Orhan Tugrul Sahin`);
  let url = $derived(`https://orhantugrul.dev/writing/${data.slug}`);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={metadata.description} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:description" content={metadata.description} />
  <meta property="og:url" content={url} />
  <meta property="article:published_time" content={metadata.date} />
</svelte:head>

<div>
  <a
    href={resolve("/writing")}
    class="text-meta text-muted-foreground underline decoration-border-strong decoration-1 underline-offset-3 transition-colors duration-150 hover:decoration-primary"
  >
    ← Writing
  </a>
  <article class="mt-12">
    <h1
      class="font-display text-[1.5rem] leading-[1.3] font-semibold text-balance md:text-[1.75rem]"
    >
      {metadata.title}
    </h1>
    <p
      class="mt-3 flex flex-wrap items-center gap-2 text-meta text-muted-foreground tabular-nums"
    >
      <time datetime={metadata.date}>{formatDate(metadata.date)}</time>
      <span
        class="inline-block size-0.75 shrink-0 rounded-full bg-muted-foreground/50"
        aria-hidden="true"
      ></span>
      <span>{metadata.readingTime} min read</span>
      {#if metadata.tags?.length}
        <span
          class="inline-block size-0.75 shrink-0 rounded-full bg-muted-foreground/50"
          aria-hidden="true"
        ></span>
        <span>{metadata.tags.join(", ")}</span>
      {/if}
    </p>
    <div
      class="prose mt-12 max-w-none
             prose-headings:font-display prose-headings:font-semibold
             prose-headings:tracking-[-0.015em]
             prose-h2:mt-12 prose-h2:text-xl prose-h3:text-body
             prose-a:decoration-border-strong prose-a:decoration-1
             prose-a:underline-offset-3 prose-a:transition-colors
             prose-a:duration-150 prose-a:hover:decoration-primary
             prose-code:font-mono prose-code:before:content-none
             prose-code:after:content-none prose-pre:rounded
             prose-pre:border prose-pre:border-border
             prose-pre:text-[0.8125rem] prose-img:rounded-[3px]
             prose-img:border prose-img:border-border
             [&_:not(pre)>code]:rounded-[3px] [&_:not(pre)>code]:border
             [&_:not(pre)>code]:border-border [&_:not(pre)>code]:bg-muted
             [&_:not(pre)>code]:px-[0.32em] [&_:not(pre)>code]:py-[0.1em]
             [&_:not(pre)>code]:text-[0.875em]"
    >
      <data.content />
    </div>
  </article>
</div>
