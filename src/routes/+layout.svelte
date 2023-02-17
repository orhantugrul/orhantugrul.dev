<script>
  import "../app.css";
  import Navbar from "$lib/components/Navbar";
</script>

<Navbar />
<slot />

<style lang="postcss">
  :global(body) {
    background-color: theme(colors.gray.900);
  }
</style>
