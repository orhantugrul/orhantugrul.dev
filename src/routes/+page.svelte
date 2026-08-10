<script lang="ts">
  import { resolve } from "$app/paths";
  import Actions from "$lib/components/actions.svelte";
  import Dot from "$lib/components/dot.svelte";
  import Arrow from "$lib/components/icons/arrow.svelte";
  import KuryeShowcase from "$lib/components/kurye-showcase.svelte";
  import PaketMutfak from "$lib/components/paket-mutfak.svelte";
  import { elsewhere, jobs, kurye, site } from "$lib/data";
  import { formatDate } from "$lib/posts";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const title = `${site.name} — ${site.role}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={site.description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={site.description} />
  <meta property="og:url" content={site.url} />
</svelte:head>

<!-- Off-site and mailto hrefs throughout; nothing here for resolve() to check. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class="stagger">
  <div>
    <h1 class="text-[1.5rem] leading-[1.4] font-semibold md:text-[1.75rem]">
      Hi. I'm Orhan, a software engineer building courier operations software at
      <PaketMutfak />.
    </h1>
    {#if site.available}
      <p class="mt-4 flex items-center gap-2 text-fg-muted">
        <span
          class="size-1.5 shrink-0 rounded-full bg-accent"
          aria-hidden="true"
        ></span>
        Open to new opportunities.
      </p>
    {/if}
    <div class="mt-8">
      <Actions />
    </div>
  </div>

  <section class="mt-16">
    <h2 class="mb-6 text-[1.0625rem] font-semibold">Recent Work</h2>
    <KuryeShowcase />
    <!-- Sentence case, not the uppercase kicker: brand names need their own
         casing, and `label` would render "iOS" as "IOS". -->
    <ul
      class="mt-8 mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-meta
             text-fg-muted"
    >
      {#each kurye.meta ?? [] as { label, icon: Icon } (label)}
        <li class="inline-flex items-center gap-1.5">
          {#if Icon}<Icon class="size-3.5" />{/if}
          {label}
        </li>
      {/each}
    </ul>
    <h3 class="font-semibold">{kurye.title}</h3>
    <div class="mt-1.5 space-y-4">
      <p>{kurye.summary}</p>
      {#if kurye.detail}
        <p class="text-fg-muted">{kurye.detail}</p>
      {/if}
    </div>
  </section>

  <section class="mt-16">
    <h2 class="mb-5 text-[1.0625rem] font-semibold">Things I wrote</h2>
    <ul class="space-y-5">
      {#each data.posts as { slug, title: postTitle, date, readingTime } (slug)}
        <li>
          <a
            href={resolve("/writing/[slug]", { slug })}
            class="font-medium link">{postTitle}</a
          >
          <p
            class="flex items-center gap-2 text-meta text-fg-muted tabular-nums"
          >
            <time datetime={date}>{formatDate(date)}</time>
            <Dot />
            <span>{readingTime} min read</span>
          </p>
        </li>
      {/each}
    </ul>
    {#if data.total > data.posts.length}
      <p class="mt-5">
        <a href={resolve("/writing")} class="text-meta text-fg-muted link">
          All {data.total} posts →
        </a>
      </p>
    {/if}
  </section>

  <section class="mt-16">
    <h2 class="mb-6 text-[1.0625rem] font-semibold">Past Experience</h2>
    <ol class="space-y-5">
      {#each jobs as { role, company, period, location } (company)}
        <li>
          <p class="font-medium">{role} at {company}</p>
          {#if period || location}
            <p
              class="flex items-center gap-2 text-meta text-fg-muted
                     tabular-nums"
            >
              {#if period}<span>{period}</span>{/if}
              {#if period && location}<Dot />{/if}
              {#if location}<span>{location}</span>{/if}
            </p>
          {/if}
        </li>
      {/each}
    </ol>
  </section>

  <!-- The one dashed rule on the site, capping the page before the footer. -->
  <section
    class="mt-20 flex flex-col gap-8 border-y border-dashed border-line py-10
           sm:flex-row sm:items-start sm:justify-between"
  >
    <div>
      <h2 class="text-[1.0625rem] font-semibold">Ping me</h2>
      <p class="mt-2 max-w-[30ch] text-fg-muted">
        Want to build something together? Or just tell me this site is broken
        somewhere. Both welcome.
      </p>
    </div>
    <ul class="flex flex-col gap-2.5 sm:items-end">
      {#each elsewhere as { label, href, external } (href)}
        <li>
          <a
            {href}
            target={external ? "_blank" : null}
            rel={external ? "noopener noreferrer" : null}
            class="inline-flex items-baseline gap-1.5 active:opacity-60"
          >
            <span class="link">{label}</span>
            <Arrow class="text-fg-muted" />
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
