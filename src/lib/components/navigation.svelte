<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import ThemeToggle from "./theme-toggle.svelte";

  const pages = $derived([
    {
      label: "home",
      href: resolve("/"),
      active: page.route.id === "/",
    },
    {
      label: "writing",
      href: resolve("/writing"),
      active: page.route.id?.startsWith("/writing") ?? false,
    },
  ]);
</script>

<span class="flex items-center gap-4">
  <nav class="flex gap-4.5">
    {#each pages as { label, href, active } (href)}
      <a
        {href}
        aria-current={active ? "page" : null}
        class="font-mono text-[12px] text-muted-foreground transition hover:text-foreground aria-[current=page]:text-foreground"
      >
        {label}
      </a>
    {/each}
  </nav>
  <ThemeToggle />
</span>
