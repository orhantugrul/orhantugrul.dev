<script lang="ts">
  import { page } from "$app/state";

  interface NavItem {
    href: string;
    label: string;
  }

  const pages: NavItem[] = [
    { href: "/", label: "/about" },
    { href: "/blog", label: "/blog" },
  ];
</script>

<nav class="fixed top-6 left-1/2 z-50 -translate-x-1/2 transform">
  <div
    class="flex items-center gap-6 rounded-xl bg-sidebar px-5 py-2 font-mono text-sm text-foreground transition-colors duration-300"
  >
    {#each pages as item (item.href)}
      {@const active = page.url.pathname === item.href}
      <a
        href={item.href}
        class="text-muted-foreground transition-colors duration-200 hover:bg-muted"
      >
        <span class={active ? "font-medium text-foreground" : ""}>
          {item.label}
        </span>
      </a>
    {/each}
  </div>
</nav>
