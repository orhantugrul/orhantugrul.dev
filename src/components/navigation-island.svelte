<script lang="ts">
  import { page } from "$app/state";

  interface NavItem {
    href: string;
    label: string;
  }

  const pages: NavItem[] = [
    {
      href: "/",
      label: "/about",
    },
    {
      href: "/library",
      label: "/library",
    },
  ];
</script>

<nav class="fixed top-4 left-1/2 z-50 -translate-x-1/2 transform sm:top-6">
  <div
    class="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-2 shadow-lg backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-900/20"
  >
    {#each pages as item (item.href)}
      {@const active = page.url.pathname === item.href}

      <a
        href={item.href}
        class="flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 {active
          ? 'bg-white/20 shadow-sm dark:bg-white/10'
          : 'hover:bg-white/10 dark:hover:bg-white/5'}"
      >
        <span
          class="font-mono text-sm {active
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-600 dark:text-gray-300'}"
        >
          {item.label}
        </span>
      </a>
    {/each}
  </div>
</nav>
