<script lang="ts">
  import { page } from "$app/stores";
  import NavbarItem from "$lib/components/Navbar/NavbarItem.svelte";

  const navbarItems = [
    { title: "Home", href: "/" },
    { title: "Tech Stack", href: "/tech-stack" },
    { title: "Contact", href: "/contact" },
  ];
</script>

<nav class="flex flex-col px-8 min-w-full">
  <div
    class="w-full max-w-2xl py-8 sm:pb-16 flex flex-col justify-between mx-auto"
  >
    <ul class="flex">
      {#each navbarItems as { title, href }}
        <NavbarItem {title} {href} active={$page.route.id === href} />
      {/each}
    </ul>
  </div>
</nav>
