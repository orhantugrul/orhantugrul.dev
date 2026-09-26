<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowUpRight } from "@lucide/svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import Sleeve from "$lib/components/sleeve.svelte";
  import { clock, runtime } from "$lib/duration";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let playlist = $derived(data.playlist);
  let title = $derived(`${playlist.title} — Orhan Tugrul Sahin`);
  let description = $derived(
    playlist.note || `A playlist of ${playlist.tracks.length} tracks.`
  );
  let url = $derived(`https://orhantugrul.dev/playlists/${playlist.slug}`);

  // Two sides, the first one longer when the count is odd, like a record.
  let sides = $derived.by(() => {
    const half = Math.ceil(playlist.tracks.length / 2);
    return [
      { side: "A", tracks: playlist.tracks.slice(0, half) },
      { side: "B", tracks: playlist.tracks.slice(half) },
    ].filter(({ tracks }) => tracks.length);
  });

  function month(date: string): string {
    return new Date(date).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
      timeZone: "Europe/Istanbul",
    });
  }

  const row =
    "link-hover grid grid-cols-[2.25em_minmax(0,1fr)_minmax(0,13em)_auto] items-baseline gap-3 py-2.5 opacity-82 hover:opacity-100 max-sm:grid-cols-[2.25em_minmax(0,1fr)_auto] max-sm:gap-y-0";
  const mono =
    "font-mono text-[11.5px] whitespace-nowrap text-faint tabular-nums";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="music.playlist" />
  <meta property="og:title" content={playlist.title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  {#if playlist.cover}
    <meta property="og:image" content={playlist.cover} />
  {/if}
  <meta name="twitter:card" content="summary" />
</svelte:head>

<header class="flex h-16 shrink-0 items-center justify-end px-8">
  <Navigation />
</header>

<article class="border-b border-rule px-8 pt-16 pb-18">
  <!-- quiet mono back button — never breadcrumb paths -->
  <a
    class="link-hover mb-6.5 inline-block font-mono text-[12px] text-faint hover:text-foreground"
    href={resolve("/playlists")}
  >
    ← back
  </a>

  <div class="grid items-center gap-x-10 gap-y-8 sm:grid-cols-[16rem_1fr]">
    <!-- The record pulled half out of its sleeve, once, on arrival. -->
    <Sleeve
      cover={playlist.cover}
      class="w-44 sm:w-auto sm:max-w-[11.5rem]"
      discClass="pull"
    />
    <div>
      <p class={mono}>
        Nº {String(playlist.number).padStart(2, "0")}
        {#if playlist.started}· {month(playlist.started)}{/if}
      </p>
      <h1
        class="mt-2 max-w-[24ch] text-[27px] leading-[1.3] font-medium tracking-[-0.022em] text-balance"
      >
        {playlist.title}
      </h1>
      {#if playlist.note}
        <p class="mt-2.5 max-w-[46ch] text-pretty text-dim">{playlist.note}</p>
      {/if}
      <p class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 {mono}">
        <span
          >{playlist.tracks.length} tracks · {runtime(
            playlist.tracks.map((t) => t.length)
          )}</span
        >
        <a
          href={playlist.url}
          target="_blank"
          rel="external noopener noreferrer"
          class="link-hover inline-flex items-center gap-1 hover:text-foreground"
          >open in spotify <ArrowUpRight class="size-3" /></a
        >
      </p>
    </div>
  </div>

  {#each sides as { side, tracks }, s (side)}
    <p class="mt-12 mb-1.5 font-mono text-[11px] tracking-[0.14em] text-faint">
      SIDE {side}
    </p>
    <ol>
      {#each tracks as track, i (track.url + i)}
        <li class="border-b border-rule last:border-0">
          <a
            href={track.url}
            target="_blank"
            rel="external noopener noreferrer"
            class={row}
          >
            <span class={mono}>{side}{i + 1}</span>
            <span class="truncate font-medium">{track.title}</span>
            <span
              class="truncate text-dim max-sm:col-start-2 max-sm:row-start-2 max-sm:text-[13px]"
              >{track.artist}</span
            >
            <span class="{mono} max-sm:col-start-3 max-sm:row-start-1"
              >{clock(track.length)}</span
            >
          </a>
        </li>
      {/each}
    </ol>
    {#if s === sides.length - 1}
      <p class="mt-4 text-right {mono}">
        total {clock(playlist.tracks.reduce((t, x) => t + x.length, 0))}
      </p>
    {/if}
  {/each}
</article>

<style>
  /* Slides out to the right and stays there. */
  :global(.pull) {
    animation: pull 700ms cubic-bezier(0.2, 0.7, 0.2, 1) 150ms both;
  }
  @keyframes pull {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(34%) rotate(40deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    :global(.pull) {
      animation: none;
      transform: translateX(34%);
    }
  }
</style>
