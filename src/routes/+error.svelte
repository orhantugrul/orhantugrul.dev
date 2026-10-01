<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import Bios from "$lib/components/bios/bios.svelte";

  const is404 = $derived(page.status === 404);
  const reqPath = $derived(
    decodeURIComponent(page.url.pathname).replace(/^\//, "") || "index"
  );
</script>

<svelte:head>
  <title>{page.status} — {is404 ? "Not found" : "Something went wrong"}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

{#if is404}
  <Bios path={reqPath} />
{:else}
  <section
    class="border-b border-border px-8 pt-27.5 pb-37.5 font-mono text-[12.5px] text-subtle-foreground"
  >
    <p class="text-muted-foreground">$ GET /{reqPath}</p>
    <p class="mt-1.5">
      HTTP {page.status}: {page.error?.message ?? "Something went wrong"}
    </p>
    <p class="mt-8.5">
      <a
        class="inline-block text-[12px] transition hover:text-foreground"
        href={resolve("/")}
      >
        ← home
      </a>
    </p>
  </section>
{/if}
