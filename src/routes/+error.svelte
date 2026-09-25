<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import Zsh from "$lib/components/zsh/zsh.svelte";

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
  <Zsh path={reqPath} />
{:else}
  <section
    class="border-b border-rule px-8 pt-27.5 pb-37.5 font-mono text-[12.5px] text-faint"
  >
    <p class="text-dim">$ GET /{reqPath}</p>
    <p class="mt-1.5">
      HTTP {page.status}: {page.error?.message ?? "Something went wrong"}
    </p>
    <p class="mt-8.5">
      <a
        class="link-hover inline-block text-[12px] hover:text-foreground"
        href={resolve("/")}
      >
        ← home
      </a>
    </p>
  </section>
{/if}
