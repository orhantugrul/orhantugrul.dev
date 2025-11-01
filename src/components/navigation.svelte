<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import type { NavigationItem } from "$types/navigation";

  const items: NavigationItem[] = [
    { label: "/about", href: resolve("/") },
    { label: "/blog", href: resolve("/blog") },
  ];
</script>

<nav class="fixed top-6 left-1/2 z-50 -translate-x-1/2 transform">
  <div class="flex items-center gap-6 rounded-xl bg-sidebar px-5 py-2">
    {#each items as { href, label } (href)}
      {@const active = page.url.pathname === href}
      <a {href} class="font-mono text-sm text-muted-foreground hover:bg-muted">
        <span class={active ? "font-medium text-foreground" : ""}>
          {label}
        </span>
      </a>
    {/each}
  </div>
</nav>
