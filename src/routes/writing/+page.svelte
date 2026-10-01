<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowRight } from "@lucide/svelte";
  import Link from "$lib/components/link.svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import Unpublished from "$lib/components/unpublished.svelte";
  import { published, writings } from "$lib/writings";

  const title = "Writing — Orhan Tugrul Sahin";
  const description =
    writings.length > 0
      ? "Notes to my future self, published by accident."
      : "A place for notes, ideas, and things worth remembering.";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://orhantugrul.dev/writing" />
</svelte:head>

<header class="flex h-16 shrink-0 items-center justify-end px-8">
  <Navigation />
</header>

<section class="border-b border-border px-8 py-12">
  <h1 class="text-2xl font-medium">
    {writings.length > 0 ? "Things I wrote" : "Writing"}
  </h1>
  <p class="mt-2.5 max-w-md text-muted-foreground">{description}</p>

  {#if writings.length > 0}
    <ul class="mt-10">
      {#each writings as { slug, date, title: writingTitle, readingTime } (slug)}
        <li>
          <Link
            href={resolve("/writing/[slug]", { slug })}
            class="group grid grid-cols-[6.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-4 py-3 opacity-80 transition hover:opacity-100 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem] max-sm:gap-3"
          >
            <span
              class="font-mono text-xs whitespace-nowrap text-subtle-foreground tabular-nums"
              >{published(date)}</span
            >
            <span class="truncate font-medium">{writingTitle}</span>
            <span
              class="font-mono text-xs whitespace-nowrap text-subtle-foreground"
              >{readingTime} min</span
            >
            <ArrowRight
              class="size-3.5 text-subtle-foreground transition-colors group-hover:text-foreground"
            />
          </Link>
        </li>
      {/each}
    </ul>
  {:else}
    <Unpublished
      class="mt-10"
      row="grid grid-cols-[6.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-4 py-3 opacity-80 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem] max-sm:gap-3"
    />
  {/if}
</section>
