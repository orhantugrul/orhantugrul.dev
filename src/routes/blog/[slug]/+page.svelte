<script lang="ts">
  import Footer from "$components/footer.svelte";
  import { ArrowLeft } from "@lucide/svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.post.metadata.title} | Orhan Tugrul Sahin</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.post.metadata.title} />
</svelte:head>

<header class="mb-12">
  <a
    href="/blog"
    class="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:bg-muted"
  >
    <ArrowLeft class="h-4 w-4" />
    <span>Back</span>
  </a>
</header>
<section class="mb-24">
  <article class="prose max-w-none lg:prose-lg dark:prose-invert">
    <data.post.content />
  </article>
</section>
<Footer />
