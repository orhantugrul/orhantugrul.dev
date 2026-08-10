<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>{page.status} — Not found</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div>
  <h1 class="text-[1.5rem] font-semibold md:text-[1.75rem]">
    {page.status} — {page.error?.message ?? "Something went wrong"}
  </h1>
  <p class="mt-3 text-fg-muted">
    This one's on me. Nothing lives at that address.
  </p>
  <p class="mt-8">
    <a href={resolve("/")} class="link">← Back to the start</a>
  </p>
</div>
