<script lang="ts">
  import { page } from "$app/stores";
  import NavbarItem from "$lib/components/Navbar/NavbarItem.svelte";

  const navbarItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
  ];
</script>

<nav class="md:w-[150px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 font-serif">
  <div class="lg:sticky lg:top-20">
    <div
      class="ml-2 md:ml-[5px] mb-2 px-4 md:px-0 md:mb-8 space-y-10 flex flex-col md:flex-row items-start"
    >
      <a class="text-5xl text-neutral-200" aria-label="Orhan Tugrul" href="/"
        >O</a
      >
    </div>

    <div
      class="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
    >
      <div class="flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
        {#each navbarItems as { title, href }}
          <NavbarItem {title} {href} active={$page.route.id === href} />
        {/each}
      </div>
    </div>
  </div>
</nav>
