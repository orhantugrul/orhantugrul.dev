<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import GitHubIcon from "$lib/components/icons/github.svelte";
  import LinkedInIcon from "$lib/components/icons/linkedin.svelte";
  import SpotifyIcon from "$lib/components/icons/spotify.svelte";
  import XIcon from "$lib/components/icons/x.svelte";
  import Link from "$lib/components/link.svelte";
  import { player } from "$lib/now-playing.svelte";

  const links = [
    {
      label: "GitHub",
      icon: GitHubIcon,
      href: "https://github.com/orhantugrul",
      handle: "/orhantugrul",
    },
    {
      label: "X (Twitter)",
      icon: XIcon,
      href: "https://x.com/orhantuurul",
      handle: "/orhantuurul",
    },
    {
      label: "LinkedIn",
      icon: LinkedInIcon,
      href: "https://www.linkedin.com/in/orhantugrul",
      handle: "/in/orhantugrul",
    },
    {
      label: "Spotify",
      icon: SpotifyIcon,
      href: "https://open.spotify.com/user/gntu0y8a2id5en2bh6hvxheo2",
      handle: "/user/gntu0y8a2id5en2bh6hvxheo2",
    },
  ] as const;

  const stateLabels = {
    playing: "Now playing:",
    paused: "Paused:",
    offline: "Last played:",
  };

  $effect(() => player.use());
</script>

<section id="connect" class="border-b border-border px-8 py-12">
  <h2
    class="mb-8 font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
  >
    Connect
  </h2>
  <ul class="space-y-1">
    {#each links as { label, href, handle, icon: Icon } (href)}
      {@const live = Icon === SpotifyIcon ? player.data : null}
      <li>
        <Link
          {href}
          class="group grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-80 transition hover:opacity-100 max-sm:grid-cols-[1.5rem_minmax(0,1fr)_0.875rem]"
        >
          <span
            class="flex h-5 items-center text-subtle-foreground transition-colors group-hover:text-foreground"
          >
            <Icon class="size-4" />
          </span>
          <span class="font-medium max-sm:hidden">{label}</span>
          {#if live}
            <span class="flex min-w-0 items-center gap-2.5">
              <span
                class="flex h-2.5 shrink-0 items-end gap-0.5"
                aria-hidden="true"
              >
                {#each [0, -0.4, -0.75] as delay (delay)}
                  <span
                    class={[
                      "h-full w-0.5 origin-bottom transition-transform duration-300",
                      live.state === "offline"
                        ? "scale-y-20 bg-subtle-foreground"
                        : "animate-equalizer",
                      live.state === "playing" && "bg-green-500",
                      live.state === "paused" &&
                        "bg-muted-foreground [animation-play-state:paused]",
                    ]}
                    style:animation-delay="{delay}s"
                  ></span>
                {/each}
              </span>
              <span
                class={[
                  "truncate",
                  live.state === "offline"
                    ? "text-muted-foreground"
                    : "text-foreground",
                ]}
              >
                <span class="sr-only">{stateLabels[live.state]}</span>
                {live.track}
              </span>
            </span>
          {:else}
            <span class="truncate text-muted-foreground">{handle}</span>
          {/if}
          <ArrowUpRight
            class="-col-end-1 row-start-1 size-3.5 text-subtle-foreground transition-colors group-hover:text-foreground"
          />
        </Link>
      </li>
    {/each}
  </ul>
</section>
