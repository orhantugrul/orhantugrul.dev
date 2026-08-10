<script lang="ts">
  import { resolve } from "$app/paths";
  import Dot from "$lib/components/dot.svelte";
  import { site } from "$lib/data";
  import { formatDate } from "$lib/posts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  // Derived, not destructured, so navigating between posts updates the head.
  let metadata = $derived(data.metadata);
  let title = $derived(`${metadata.title} — ${site.name}`);
  let url = $derived(`${site.url}/writing/${data.slug}`);
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

<div class="stagger">
  <a href={resolve("/writing")} class="text-meta text-fg-muted link">
    ← Writing
  </a>

  <article class="mt-12">
    <h1
      class="text-[1.5rem] leading-[1.3] font-semibold text-balance md:text-[1.75rem]"
    >
      {metadata.title}
    </h1>
    <p
      class="mt-3 flex flex-wrap items-center gap-2 text-meta text-fg-muted
             tabular-nums"
    >
      <time datetime={metadata.date}>{formatDate(metadata.date)}</time>
      <Dot />
      <span>{metadata.readingTime} min read</span>
      {#if metadata.tags?.length}
        <Dot />
        <span>{metadata.tags.join(", ")}</span>
      {/if}
    </p>

    <div class="prose mt-12 max-w-none">
      <data.content />
    </div>
  </article>
</div>
