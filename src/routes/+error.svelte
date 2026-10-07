<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import Bios from "$lib/components/bios/bios.svelte";
  import Link from "$lib/components/link.svelte";

  const is404 = $derived(page.status === 404);
  const requestedPath = $derived(
    decodeURIComponent(page.url.pathname).replace(/^\//, "") || "index",
  );
</script>

<svelte:head>
  <title>{page.status} / {is404 ? "Not found" : "Something went wrong"}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

{#if is404}
  <Bios path={requestedPath} />
{:else}
  <section
    class="border-b border-border px-8 pt-28 pb-36 font-mono text-xs text-subtle-foreground"
  >
    <p class="text-muted-foreground">$ GET /{requestedPath}</p>
    <p class="mt-1.5">
      HTTP {page.status}: {page.error?.message ?? "Something went wrong"}
    </p>
    <p class="mt-8">
      <Link
        href={resolve("/")}
        class="inline-block transition hover:text-foreground"
      >
        ← home
      </Link>
    </p>
  </section>
{/if}
