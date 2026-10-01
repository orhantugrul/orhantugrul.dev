<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowRight, ArrowUpRight } from "@lucide/svelte";
  import kuryeDark from "$lib/assets/kurye-dark.webp";
  import kuryeLight from "$lib/assets/kurye.webp";
  import GitHubIcon from "$lib/components/icons/github.svelte";
  import Itoc360Icon from "$lib/components/icons/itoc360.svelte";
  import LinkedInIcon from "$lib/components/icons/linkedin.svelte";
  import PaketMutfakIcon from "$lib/components/icons/paket-mutfak.svelte";
  import SpinexIcon from "$lib/components/icons/spinex.svelte";
  import SpotifyIcon from "$lib/components/icons/spotify.svelte";
  import XIcon from "$lib/components/icons/x.svelte";
  import YapiKrediIcon from "$lib/components/icons/yapi-kredi.svelte";
  import Callout from "$lib/components/callout.svelte";
  import Dither from "$lib/components/dither.svelte";
  import Equalizer from "$lib/components/equalizer.svelte";
  import Link from "$lib/components/link.svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import Unpublished from "$lib/components/unpublished.svelte";
  import { published, writings } from "$lib/writings";
  import { player } from "$lib/now-playing.svelte";

  const title = "Orhan Tugrul Sahin — Software Engineer";
  const description =
    "Software engineer in Istanbul building thoughtful products and dependable systems.";

  const paketMutfakUrl = "https://paketmutfak.com.tr/?ref=orhantugrul.dev";

  const experiences = [
    {
      period: "Now",
      role: "Software Engineer",
      company: "Paket Mutfak",
      icon: PaketMutfakIcon,
      href: paketMutfakUrl,
    },
    {
      period: "2024",
      role: "Software Engineer",
      company: "ITOC360",
      icon: Itoc360Icon,
      href: "https://www.itoc360.com/",
    },
    {
      period: "2023",
      role: "Software Engineer",
      company: "Yapı Kredi Leasing",
      icon: YapiKrediIcon,
      href: "https://www.ykleasing.com.tr/",
    },
    {
      period: "2021",
      role: "Software Engineer",
      company: "SpineX",
      icon: SpinexIcon,
      href: "https://www.thespinex.com/",
    },
  ] as const;

  const connectLinks = [
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

  const recent = writings.slice(0, 3);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://orhantugrul.dev" />
</svelte:head>

<header
  class="relative min-h-120 overflow-hidden border-b border-border md:min-h-128"
>
  <Dither />

  <div class="relative z-2 flex min-h-120 flex-col px-8 md:min-h-128">
    <div class="flex h-16 shrink-0 items-center justify-end">
      <Navigation />
    </div>
    <div class="flex flex-1 items-center pb-12 md:pb-16">
      <div class="w-full">
        <h1 class="text-2xl font-medium sm:text-3xl">Hi, I’m Orhan</h1>
        <p class="mt-1.5 text-sm text-muted-foreground">
          Software engineer in Istanbul
        </p>
        <div
          class="mt-8 max-w-lg space-y-4 text-base text-pretty text-muted-foreground sm:text-lg"
        >
          <p>
            I build software at <Link
              href={paketMutfakUrl}
              class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
              ><PaketMutfakIcon
                class="mr-1 inline size-[0.95em] align-[-0.12em]"
              /><span
                class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
                >Paket Mutfak</span
              ></Link
            >, from the app a courier holds at the door to the service behind it
            that keeps dispatch, orders and payments in step.
          </p>
          <p>Before this, treasury and leasing systems for banks.</p>
        </div>

        <p class="mt-8 max-w-lg text-sm text-pretty text-muted-foreground">
          If that sounds familiar, <Link
            href="https://cal.com/orhantugrul/chitchat"
            class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
            ><span
              class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
              >book a chat</span
            ></Link
          >
          or
          <Link
            href="mailto:hello@orhantugrul.dev"
            class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
            ><span
              class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
              >say hello</span
            ></Link
          >.
        </p>
      </div>
    </div>
  </div>
</header>

<section class="border-b border-border px-8 py-12">
  <h2
    class="mb-8 font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
  >
    Recent work
  </h2>
  <div
    class="relative flex max-h-102 items-start justify-center overflow-hidden"
  >
    <img
      class="w-55 light:hidden"
      src={kuryeDark}
      alt="The Kurye courier app mid-shift: a live delivery map above a sheet showing delivery progress, the queued orders, and the current drop-off."
      width="739"
      height="1510"
      loading="lazy"
    />
    <img
      class="hidden w-55 light:block"
      src={kuryeLight}
      alt="The Kurye courier app mid-shift: a live delivery map above a sheet showing delivery progress, the queued orders, and the current drop-off."
      width="739"
      height="1510"
      loading="lazy"
    />

    <!-- Tops are measured off the 739x1510 capture at w-55; a new screenshot
         means re-measuring them. -->
    <Callout side="left" class="top-32.5">live position</Callout>
    <Callout side="right" class="top-67.75">batch progress</Callout>
    <Callout side="right" class="top-91.25">one tap to nav</Callout>
  </div>
  <p class="mt-4 font-mono text-xs text-muted-foreground sm:hidden">
    live position · batch progress · one tap to nav
  </p>
  <h3 class="mt-8 text-lg font-medium">Kurye</h3>
  <div class="mt-3 space-y-3 text-pretty text-muted-foreground">
    <p class="text-lg text-foreground">
      Kurye is the app couriers at Paket Mutfak work their shift from. One
      screen holds the orders assigned to them, the route between them, and what
      is left of the batch.
    </p>
    <p>
      The handover at the door is where the job used to stall. A card payment
      now reaches the terminal the courier already carries with the order
      attached to it, and the phone does not wait for the card to clear, so
      nobody stands at a door watching a spinner.
    </p>
    <p>
      The money has to be right every time. When a terminal goes quiet mid
      payment, the system finds out what actually happened instead of guessing,
      so no customer is charged twice and no delivery ends with money nobody can
      account for.
    </p>
  </div>
</section>

<section class="border-b border-border px-8 py-12">
  <div class="mb-8 flex items-baseline justify-between">
    <h2
      class="font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
    >
      Writing
    </h2>
    <Link
      href={resolve("/writing")}
      class="group flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition hover:text-foreground"
    >
      See all
      <ArrowRight
        class="size-3.5 text-subtle-foreground transition-colors group-hover:text-foreground"
      />
    </Link>
  </div>
  {#if writings.length > 0}
    <ul class="space-y-1">
      {#each recent as { slug, date, title: writingTitle, readingTime } (slug)}
        <li>
          <Link
            href={resolve("/writing/[slug]", { slug })}
            class="group grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-80 transition hover:opacity-100 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem]"
          >
            <span
              class="col-start-2 font-mono text-xs whitespace-nowrap text-subtle-foreground tabular-nums max-sm:col-start-1"
              >{published(date)}</span
            >
            <span class="truncate font-medium">{writingTitle}</span>
            <span
              class="font-mono text-xs whitespace-nowrap text-subtle-foreground"
              >{readingTime} min</span
            >
            <ArrowRight
              class="-col-end-1 row-start-1 size-3.5 text-subtle-foreground transition-colors group-hover:text-foreground"
            />
          </Link>
        </li>
      {/each}
    </ul>
  {:else}
    <Unpublished
      class="space-y-1"
      row="grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-80 max-sm:grid-cols-[5em_minmax(0,1fr)_auto_0.875rem]"
      gutter
    />
  {/if}
</section>

<section class="border-b border-border px-8 py-12">
  <h2
    class="mb-8 font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
  >
    Experience
  </h2>
  <ul class="space-y-1">
    {#each experiences as { period, role, company, href, icon: Icon } (company)}
      <li>
        <Link
          {href}
          class="group grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-80 transition hover:opacity-100 max-sm:grid-cols-[1.5rem_minmax(0,1fr)_auto_0.875rem] max-sm:gap-y-0"
        >
          <span
            class="flex h-5 items-center text-subtle-foreground transition-colors group-hover:text-foreground"
            ><Icon class="size-4" /></span
          >
          <span class="truncate font-medium text-foreground max-sm:col-start-2"
            >{company}</span
          >
          <span
            class="truncate text-muted-foreground max-sm:col-start-2 max-sm:row-start-2"
            >{role}</span
          >
          <span
            class="font-mono text-xs whitespace-nowrap text-subtle-foreground max-sm:col-start-3 max-sm:row-start-1"
            >{period}</span
          >
          <ArrowUpRight
            class="-col-end-1 row-start-1 size-3.5 text-subtle-foreground transition-colors group-hover:text-foreground"
          />
        </Link>
      </li>
    {/each}
  </ul>
</section>

<section id="connect" class="border-b border-border px-8 py-12">
  <h2
    class="mb-8 font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
  >
    Connect
  </h2>
  <ul class="space-y-1">
    {#each connectLinks as { label, href, handle, icon: Icon } (href)}
      {@const live = Icon === SpotifyIcon ? player.data : null}
      <li>
        <Link
          {href}
          class="group grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-80 transition hover:opacity-100 max-sm:grid-cols-[1.5rem_minmax(0,1fr)_0.875rem]"
        >
          <span
            class="flex h-5 items-center text-subtle-foreground transition-colors group-hover:text-foreground"
            ><Icon class="size-4" /></span
          >
          <span class="font-medium max-sm:hidden">{label}</span>
          {#if live}
            <span class="flex min-w-0 items-center gap-2.5">
              <Equalizer state={live.state} />
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
