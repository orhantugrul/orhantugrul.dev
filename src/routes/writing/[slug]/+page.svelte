<script lang="ts">
  import { resolve } from "$app/paths";
  import Navigation from "$lib/components/navigation.svelte";
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

<header class="flex h-16 shrink-0 items-center justify-end px-8">
  <Navigation />
</header>

<article class="border-b border-border px-8 pt-16 pb-18">
  <!-- quiet mono back button — never breadcrumb paths -->
  <a
    class="mb-6.5 inline-block font-mono text-[12px] text-subtle-foreground transition hover:text-foreground"
    href={resolve("/writing")}
  >
    ← back
  </a>
  <h1
    class="max-w-[24ch] text-[27px] leading-[1.3] font-medium tracking-[-0.022em] text-balance"
  >
    {metadata.title}
  </h1>
  <p class="mt-3.5 font-mono text-[12px] text-subtle-foreground tabular-nums">
    <time datetime={metadata.date}>{metadata.date.slice(0, 10)}</time>
    · {metadata.readingTime} min read
  </p>

  <div class="prose">
    <data.content />
  </div>
</article>
