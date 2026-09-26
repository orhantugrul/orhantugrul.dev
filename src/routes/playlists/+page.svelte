<script lang="ts">
  import { resolve } from "$app/paths";
  import Navigation from "$lib/components/navigation.svelte";
  import Sleeve from "$lib/components/sleeve.svelte";
  import { runtime } from "$lib/duration";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const title = "Playlists — Orhan Tugrul Sahin";
  const description = "Playlists I made, pressed like records.";

  const catalogue = (n: number) => `Nº ${String(n).padStart(2, "0")}`;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta
    property="og:image"
    content="https://orhantugrul.dev/og/playlists.png"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:image"
    content="https://orhantugrul.dev/og/playlists.png"
  />
</svelte:head>

<header class="flex h-16 shrink-0 items-center justify-end px-8">
  <Navigation />
</header>

<section class="border-b border-rule px-8 pt-10 pb-14">
  <h1 class="text-[24px] font-medium tracking-[-0.02em]">Playlists</h1>
  <p class="mt-2.5 max-w-[50ch] text-dim">{description}</p>

  {#if data.playlists.length}
    <ul class="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 max-sm:gap-x-4">
      {#each data.playlists as { slug, number, title: name, cover, tracks } (slug)}
        <li>
          <a
            href={resolve("/playlists/[slug]", { slug })}
            class="group link-hover block"
          >
            <!-- Headroom for the disc to rise into. -->
            <Sleeve
              {cover}
              class="mt-[14%]"
              discClass="group-hover:-translate-y-[13%] group-focus-visible:-translate-y-[13%]"
            />
            <p
              class="mt-4 flex justify-between gap-3 font-mono text-[11.5px] whitespace-nowrap text-faint tabular-nums"
            >
              <span>{catalogue(number)}</span>
              <span class="max-sm:hidden"
                >{tracks.length} tracks · {runtime(
                  tracks.map((t) => t.length)
                )}</span
              >
            </p>
            <p
              class="mt-1 font-medium tracking-[-0.01em] opacity-82 transition-opacity group-hover:opacity-100"
            >
              {name}
            </p>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="mt-11 border-t border-rule pt-7 font-mono text-[12.5px]">
      <p class="text-dim">$ ls ~/playlists</p>
      <p class="mt-1 text-faint">total 0</p>
    </div>
  {/if}
</section>
