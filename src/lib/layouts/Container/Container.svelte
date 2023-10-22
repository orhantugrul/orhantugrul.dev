<script lang="ts">
  import "../../../app.css";

  export let title: string;
  export let description: string;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<main class="flex flex-col flex-auto">
  <slot />
</main>
