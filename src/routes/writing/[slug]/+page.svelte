<script lang="ts">
  import { resolve } from "$app/paths";
  import Link from "$lib/components/link.svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import { published } from "$lib/writing";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

  const metadata = $derived(data.metadata);
  const title = $derived(`${metadata.title} — Orhan Tugrul Sahin`);
  const url = $derived(`https://orhantugrul.dev/writing/${data.slug}`);
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

<article class="border-b border-border px-8 py-16">
  <Link
    href={resolve("/writing")}
    class="mb-6 inline-block font-mono text-xs text-subtle-foreground transition hover:text-foreground"
  >
    ← back
  </Link>
  <h1 class="max-w-sm text-2xl font-medium text-balance">
    {metadata.title}
  </h1>
  <p class="mt-4 font-mono text-xs text-subtle-foreground tabular-nums">
    <time datetime={metadata.date}>{published(metadata.date)}</time>
    · {metadata.readingTime} min read
  </p>

  <div class="prose">
    <data.content />
  </div>
</article>
