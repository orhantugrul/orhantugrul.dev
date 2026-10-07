<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowRight } from "@lucide/svelte";
  import Link from "$lib/components/link.svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import { drafts, posts, published } from "$lib/writing";

  const title = "Writing / Orhan Tugrul";
  const description =
    posts.length > 0
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
  <meta property="og:image" content="https://orhantugrul.dev/og.png" />
  <meta property="og:image:width" content="2400" />
  <meta property="og:image:height" content="1260" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<header class="flex h-16 shrink-0 items-center justify-end px-8">
  <Navigation />
</header>

<section class="border-b border-border px-8 py-12">
  <h1 class="text-2xl font-medium">
    {posts.length > 0 ? "Things I wrote" : "Writing"}
  </h1>
  <p class="mt-2.5 max-w-lg text-pretty text-muted-foreground">
    {description}
  </p>

  {#if posts.length > 0}
    <ul class="mt-10">
      {#each posts as { slug, date, title: postTitle, readingTime } (slug)}
        <li>
          <Link
            href={resolve("/writing/[slug]", { slug })}
            class="group grid grid-cols-[6.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-4 py-3 opacity-82 transition hover:opacity-100 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem] max-sm:gap-3"
          >
            <span
              class="font-mono text-xs whitespace-nowrap text-subtle-foreground tabular-nums"
            >
              {published(date)}
            </span>
            <span class="truncate font-medium">{postTitle}</span>
            <span
              class="font-mono text-xs whitespace-nowrap text-subtle-foreground"
            >
              {readingTime} min
            </span>
            <ArrowRight
              class="size-3.5 text-subtle-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </Link>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="sr-only">Nothing published yet</p>
    <ul class="mt-10" aria-hidden="true">
      {#each drafts as { date, title: draftTitle, time } (draftTitle)}
        <li
          class="grid grid-cols-[6.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-4 py-3 opacity-82 select-none *:blur-xs max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem] max-sm:gap-3"
        >
          <span
            class="font-mono text-xs whitespace-nowrap text-subtle-foreground tabular-nums"
          >
            {date}
          </span>
          <span class="truncate font-medium text-muted-foreground opacity-75">
            {draftTitle}
          </span>
          <span
            class="font-mono text-xs whitespace-nowrap text-subtle-foreground"
          >
            {time}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</section>
