<script lang="ts">
  import { resolve } from "$app/paths";
  import Actions from "$lib/components/actions.svelte";
  import Arrow from "$lib/components/icons/arrow.svelte";
  import Expo from "$lib/components/icons/expo.svelte";
  import Hono from "$lib/components/icons/hono.svelte";
  import KuryeShowcase from "$lib/components/kurye-showcase.svelte";
  import PaketMutfak from "$lib/components/paket-mutfak.svelte";
  import { formatDate, writings } from "$lib/writings";

  const RECENT = 3;

  const title = "Orhan Tugrul Sahin — Software Engineer";
  const description =
    "Software engineer building courier operations software at Paket Mutfak";
  const available = false;

  const recentWork = {
    title: "Kurye",
    meta: [
      { label: "Expo", icon: Expo },
      { label: "Hono", icon: Hono },
    ],
    summary:
      "Courier operations for Paket Mutfak, end to end. Couriers work their " +
      "shift in the app: a live map, the orders assigned to them, and batched " +
      "drop-offs tracked to completion.",
    detail:
      "A second build puts the same job on the PAVO N86 terminals they " +
      "already carry, so card payments happen at the door. Both talk to one " +
      "service that owns dispatch and delivery state and pushes every update " +
      "back to the phone.",
  };

  const experiences = [
    {
      role: "Software Engineer",
      company: "ITServ Technology",
      period: "2023 - 2025",
      location: "Remote",
    },
    {
      role: "Software Engineer",
      company: "Yapı Kredi Leasing",
      period: "2022 - 2023",
      location: "Remote",
    },
    {
      role: "Software Engineer",
      company: "Linktera",
      period: "2021 - 2022",
      location: "Remote",
    },
  ];

  const elsewhere = [
    { label: "GitHub", href: "https://github.com/orhantugrul" },
    { label: "Twitter", href: "https://x.com/orhantuurul" },
    {
      label: "Linkedin",
      href: "https://www.linkedin.com/in/orhantugrulsahin",
    },
  ];

  const recent = writings.slice(0, RECENT);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://orhantugrul.dev" />
</svelte:head>

<div>
  <div>
    <h1
      class="font-display text-[1.5rem] leading-[1.4] font-semibold md:text-[1.75rem]"
    >
      Hi. I'm Orhan, a software engineer building courier operations software at
      <PaketMutfak />.
    </h1>
    {#if available}
      <p class="mt-4 flex items-center gap-2 text-muted-foreground">
        <span
          class="size-1.5 shrink-0 rounded-full bg-primary"
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
    <h2 class="mb-6 font-display text-[1.0625rem] font-semibold">
      Recent Work
    </h2>
    <KuryeShowcase />
    <ul
      class="mt-8 mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-muted-foreground"
    >
      {#each recentWork.meta as { label, icon: Icon } (label)}
        <li class="inline-flex items-center gap-1.5">
          <Icon class="size-3.5" />
          {label}
        </li>
      {/each}
    </ul>
    <h3 class="font-display font-semibold">{recentWork.title}</h3>
    <div class="mt-1.5 space-y-4">
      <p>{recentWork.summary}</p>
      <p class="text-muted-foreground">{recentWork.detail}</p>
    </div>
  </section>
  <section class="mt-16">
    <h2 class="mb-5 font-display text-[1.0625rem] font-semibold">
      Things I wrote
    </h2>
    <ul class="space-y-5">
      {#each recent as { slug, title: writingTitle, date, readingTime } (slug)}
        <li>
          <a
            href={resolve("/writing/[slug]", { slug })}
            class="font-medium underline decoration-border-strong decoration-1 underline-offset-3 transition-colors duration-150 hover:decoration-primary"
            >{writingTitle}</a
          >
          <p
            class="flex items-center gap-2 text-meta text-muted-foreground tabular-nums"
          >
            <time datetime={date}>{formatDate(date)}</time>
            <span
              class="inline-block size-0.75 shrink-0 rounded-full bg-muted-foreground/50"
              aria-hidden="true"
            ></span>
            <span>{readingTime} min read</span>
          </p>
        </li>
      {/each}
    </ul>
    {#if writings.length > recent.length}
      <p class="mt-5">
        <a
          href={resolve("/writing")}
          class="text-meta text-muted-foreground underline decoration-border-strong decoration-1 underline-offset-3 transition-colors duration-150 hover:decoration-primary"
        >
          All {writings.length} writings →
        </a>
      </p>
    {/if}
  </section>
  <section class="mt-16">
    <h2 class="mb-6 font-display text-[1.0625rem] font-semibold">
      Past Experience
    </h2>
    <ol class="space-y-5">
      {#each experiences as { role, company, period, location } (company)}
        <li>
          <p class="font-medium">{role} at {company}</p>
          {#if period || location}
            <p
              class="flex items-center gap-2 text-meta text-muted-foreground
                     tabular-nums"
            >
              {#if period}<span>{period}</span>{/if}
              {#if period && location}<span
                  class="inline-block size-0.75 shrink-0 rounded-full bg-muted-foreground/50"
                  aria-hidden="true"
                ></span>{/if}
              {#if location}<span>{location}</span>{/if}
            </p>
          {/if}
        </li>
      {/each}
    </ol>
  </section>
  <section
    class="mt-20 flex flex-col gap-8 border-y border-dashed border-border py-10
           sm:flex-row sm:items-start sm:justify-between"
  >
    <div>
      <h2 class="font-display text-[1.0625rem] font-semibold">Ping me</h2>
      <p class="mt-2 max-w-[30ch] text-muted-foreground">
        Want to build something together? Or just tell me this site is broken
        somewhere. Both welcome.
      </p>
    </div>
    <ul class="flex flex-col gap-2.5 sm:items-end">
      {#each elsewhere as { label, href } (href)}
        <li>
          <a
            {href}
            target="_blank"
            rel="external noopener noreferrer"
            class="inline-flex items-baseline gap-1.5 active:opacity-60"
          >
            <span
              class="underline decoration-border-strong decoration-1 underline-offset-3 transition-colors duration-150 hover:decoration-primary"
              >{label}</span
            >
            <Arrow class="text-muted-foreground" />
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>
