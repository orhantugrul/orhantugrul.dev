<script lang="ts">
  import Footer from "$lib/components/Footer/Footer.svelte";
  import Header from "$lib/components/Header/Header.svelte";
  import "../../../app.css";

  export let title: string;
  export let description: string;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<main class="flex flex-col px-4">
  <div class="flex flex-col flex-auto mx-auto max-w-[540px]">
    <Header />
    <slot />
    <Footer />
  </div>
</main>
