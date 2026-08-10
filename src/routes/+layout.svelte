<script lang="ts">
  import "./app.css";
  import favicon from "$lib/assets/favicon.svg";
  import SiteFooter from "$lib/components/site-footer.svelte";
  import SiteNav from "$lib/components/site-nav.svelte";
  import { site } from "$lib/data";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="author" content={site.name} />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta property="og:site_name" content="{site.name} — {site.role}" />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<div class="flex min-h-svh flex-col">
  <SiteNav />
  <main class="shell flex-1 pt-16 pb-24 md:pt-20">
    {@render children()}
  </main>
  <SiteFooter />
</div>
