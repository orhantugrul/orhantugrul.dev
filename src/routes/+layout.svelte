<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar";
  import Footer from "$lib/components/Footer";
</script>

<svelte:head>
  <title>Orhan Tugrul &bull; A Software Developer</title>
  <meta
    name="description"
    content="Highly motivated software developer with experience in building high-quality applications using Java, Kotlin, and JavaScript."
  />
</svelte:head>

<Navbar />
<slot />
<Footer />

<style lang="postcss">
  :global(body) {
    background-color: theme(colors.gray.900);
  }
</style>
