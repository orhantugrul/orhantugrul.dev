<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  // Compare against route.id, not resolve() — resolve() returns relative
  // paths ("./writing"), so matching it to pathname ("/writing") never fires.
  let items = $derived([
    { label: "Home", href: resolve("/"), active: page.route.id === "/" },
    {
      label: "Writing",
      href: resolve("/writing"),
      active: page.route.id?.startsWith("/writing") ?? false,
    },
  ]);
</script>

<!-- Plain text, right-aligned. No bar, no border, scrolls away with the page. -->
<nav class="shell flex justify-end gap-6 pt-8">
  {#each items as { label, href, active } (href)}
    <a
      {href}
      aria-current={active ? "page" : null}
      class="text-meta transition-colors duration-150
             {active ? 'text-fg' : 'text-fg-muted hover:text-fg'}"
    >
      {label}
    </a>
  {/each}
</nav>
