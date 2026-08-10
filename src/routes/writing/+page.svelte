<script lang="ts">
  import { resolve } from "$app/paths";
  import Dot from "$lib/components/dot.svelte";
  import { site } from "$lib/data";
  import { formatDate } from "$lib/posts";
  import type { Post } from "$lib/types";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const title = `Writing — ${site.name}`;
  const description = "Notes to my future self, published by accident.";

  // Posts arrive newest first, so same-year posts are already contiguous.
  let grouped = $derived.by(() => {
    const years: [number, Post[]][] = [];
    for (const post of data.posts) {
      const year = new Date(post.date).getFullYear();
      const current = years.at(-1);
      if (current?.[0] === year) current[1].push(post);
      else years.push([year, [post]]);
    }
    return years;
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
</svelte:head>

<div>
  <h1 class="text-[1.5rem] font-semibold md:text-[1.75rem]">Things I wrote</h1>
  <p class="mt-3 text-fg-muted">{description}</p>

  {#each grouped as [year, posts] (year)}
    <section class="mt-14">
      <h2 class="mb-6 label text-fg-muted">{year}</h2>
      <ul class="space-y-8">
        {#each posts as { slug, title: postTitle, description: summary, date, readingTime } (slug)}
          <li>
            <a
              href={resolve("/writing/[slug]", { slug })}
              class="font-medium link">{postTitle}</a
            >
            <p class="mt-1 text-fg-muted">{summary}</p>
            <p
              class="mt-1 flex items-center gap-2 text-meta text-fg-muted
                     tabular-nums"
            >
              <time datetime={date}>{formatDate(date)}</time>
              <Dot />
              <span>{readingTime} min read</span>
            </p>
          </li>
        {/each}
      </ul>
    </section>
  {/each}

  {#if data.posts.length === 0}
    <p class="mt-8 text-fg-muted">Nothing published yet.</p>
  {/if}
</div>
