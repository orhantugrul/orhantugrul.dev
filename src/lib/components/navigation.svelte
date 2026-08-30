<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  const pages = $derived([
    {
      label: "Home",
      href: resolve("/"),
      active: page.route.id === "/",
    },
    {
      label: "Writing",
      href: resolve("/writing"),
      active: page.route.id?.startsWith("/writing") ?? false,
    },
  ]);
</script>

<nav class="mx-auto flex w-full max-w-160 justify-end gap-6 px-6 pt-8 md:px-10">
  {#each pages as { label, href, active } (href)}
    <a
      {href}
      aria-current={active ? "page" : null}
      class={[
        "text-meta transition-colors duration-150",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      ]}
    >
      {label}
    </a>
  {/each}
</nav>
