<script lang="ts">
  import "./app.css";
  import geist from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
  import geistMono from "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import { browser } from "$app/environment";
  import Footer from "$lib/components/footer.svelte";

  const { children } = $props();

  const queryClient = new QueryClient({
    defaultOptions: { queries: { enabled: browser } },
  });
</script>

<svelte:head>
  <!-- Fetched before first paint, so the fallback face never swaps out and
       shifts the hero on a first visit. -->
  {#each [geist, geistMono] as font (font)}
    <link
      rel="preload"
      href={font}
      as="font"
      type="font/woff2"
      crossorigin=""
    />
  {/each}
  <meta name="author" content="Orhan Tugrul Sahin" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta
    property="og:site_name"
    content="Orhan Tugrul Sahin — Software Engineer"
  />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<QueryClientProvider client={queryClient}>
  <div
    class="relative mx-auto flex min-h-svh max-w-3xl flex-col border-x border-border"
  >
    <main class="flex flex-1 flex-col *:last:flex-1">
      {@render children()}
    </main>
    <Footer />
  </div>
</QueryClientProvider>
