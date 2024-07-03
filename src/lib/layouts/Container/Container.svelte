<script lang="ts">
  import Footer from "$lib/components/Footer/Footer.svelte";
  import "../../../app.css";

  export let title: string;
  export let description: string;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<main class="mx-auto my-5 flex max-w-xl flex-col px-4">
  <slot />
  <Footer />
</main>
