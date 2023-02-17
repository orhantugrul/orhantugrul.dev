<script>
  import Container from "$lib/components/Container";
  import { page } from "$app/stores";

  const navbarItems = [
    { title: "Home", path: "/" },
    { title: "Tech Stack", path: "/tech-stack" },
    { title: "Contact", path: "/contact" },
  ];
</script>

<Container>
  <nav class="navbar">
    <div class="navbar-items">
      {#each navbarItems as { title, path }}
        {#if $page.route.id === path}
          <a class={"navbar-item active"} href={path}>{title}</a>
        {:else}
          <a class={"navbar-item"} href={path}>{title}</a>
        {/if}
      {/each}
    </div>
  </nav>
</Container>

<style lang="postcss">
  .navbar {
    @apply w-full;
    @apply max-w-2xl;
    @apply py-8;
    @apply sm:pb-16;
    @apply flex;
    @apply flex-col;
    @apply justify-between;
    @apply mx-auto;
  }

  .navbar .navbar-items {
    @apply flex;
  }

  .navbar .navbar-items .navbar-item {
    @apply px-3;
    @apply py-2;
    @apply font-semibold;
    @apply text-gray-600;
    @apply hover:bg-gray-800;
    @apply rounded-lg;
    @apply transition-all;
  }

  .navbar .navbar-items .navbar-item.active {
    @apply text-gray-200;
  }
</style>
