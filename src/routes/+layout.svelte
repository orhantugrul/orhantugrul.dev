<script lang="ts">
  import "./app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Footer from "$lib/components/footer.svelte";
  import Navigation from "$lib/components/navigation.svelte";

  const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="author" content="Orhan Tugrul Sahin" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta
    property="og:site_name"
    content="Orhan Tugrul Sahin — Software Engineer"
  />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<div class="flex min-h-svh flex-col">
  <Navigation />
  <main
    class="mx-auto w-full max-w-[40rem] flex-1 px-6 pt-16 pb-24 md:px-10 md:pt-20"
  >
    {@render children()}
  </main>
  <Footer />
</div>
