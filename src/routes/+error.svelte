<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>{page.status} — Not found</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div>
  <h1 class="font-display text-[1.5rem] font-semibold md:text-[1.75rem]">
    {page.status} — {page.error?.message ?? "Something went wrong"}
  </h1>
  <p class="mt-3 text-muted-foreground">
    This one's on me. Nothing lives at that address.
  </p>
  <p class="mt-8">
    <a
      href={resolve("/")}
      class="underline decoration-border-strong decoration-1 underline-offset-3 transition-colors duration-150 hover:decoration-primary"
    >
      ← Back to the start
    </a>
  </p>
</div>
