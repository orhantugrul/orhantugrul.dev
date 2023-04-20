<script lang="ts">
  import "../../../app.css";
  import Navbar from "$lib/components/Navbar/Navbar.svelte";
  import Main from "$lib/components/Main/Main.svelte";

  export let title: string;
  export let description: string;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<Navbar />
<Main>
  <slot />
</Main>
