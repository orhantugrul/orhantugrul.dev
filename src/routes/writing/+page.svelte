<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowRight } from "@lucide/svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import Unpublished from "$lib/components/unpublished.svelte";
  import { published, writings } from "$lib/writings";

  const title = "Writing — Orhan Tugrul Sahin";
  const description = writings.length
    ? "Notes to my future self, published by accident."
    : "A place for notes, ideas, and things worth remembering.";

  /* rows: date · title · reading time · arrow */
  const row =
    "grid grid-cols-[6.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-4 py-3 opacity-82 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem] max-sm:gap-3";
  const rowLabel =
    "font-mono text-[12px] whitespace-nowrap text-faint tabular-nums";
  const rowMeta = "font-mono text-[11.5px] whitespace-nowrap text-faint";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<header class="flex h-16 shrink-0 items-center justify-end px-8">
  <Navigation />
</header>

<section class="border-b border-rule px-8 pt-10 pb-14">
  <h1 class="text-[24px] font-medium tracking-[-0.02em]">
    {writings.length ? "Things I wrote" : "Writing"}
  </h1>
  <p class="mt-2.5 max-w-[50ch] text-dim">{description}</p>

  {#if writings.length > 0}
    <ul class="mt-10">
      {#each writings as { slug, date, title: writingTitle, readingTime } (slug)}
        <li>
          <a
            href={resolve("/writing/[slug]", { slug })}
            class="{row} link-hover group hover:opacity-100"
          >
            <span class={rowLabel}>{published(date)}</span>
            <span class="truncate font-medium">{writingTitle}</span>
            <span class={rowMeta}>{readingTime} min</span>
            <ArrowRight
              class="size-3.5 text-faint transition-colors duration-150 group-hover:text-foreground"
            />
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <Unpublished list="mt-10" class={row} />
  {/if}
</section>
