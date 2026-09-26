<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowUpRight } from "@lucide/svelte";
  import kuryeDark from "$lib/assets/kurye-dark.webp";
  import kuryeLight from "$lib/assets/kurye.webp";
  import GitHubIcon from "$lib/components/icons/github.svelte";
  import ItservIcon from "$lib/components/icons/itserv.svelte";
  import LinkedInIcon from "$lib/components/icons/linkedin.svelte";
  import PaketMutfakIcon from "$lib/components/icons/paket-mutfak.svelte";
  import SpinexIcon from "$lib/components/icons/spinex.svelte";
  import SpotifyIcon from "$lib/components/icons/spotify.svelte";
  import XIcon from "$lib/components/icons/x.svelte";
  import YapiKrediIcon from "$lib/components/icons/yapi-kredi.svelte";
  import Dither from "$lib/components/dither.svelte";
  import Istanbul from "$lib/components/istanbul.svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import { writings } from "$lib/writings";

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
      company: "ITServ Technology",
      icon: ItservIcon,
      href: "https://www.itservtechnology.com/",
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
  ];

  const connectLinks = [
    {
      label: "GitHub",
      icon: GitHubIcon,
      href: "https://github.com/orhantugrul",
    },
    {
      label: "X (Twitter)",
      icon: XIcon,
      href: "https://x.com/orhantuurul",
    },
    {
      label: "LinkedIn",
      icon: LinkedInIcon,
      href: "https://www.linkedin.com/in/orhantugrul",
    },
    {
      label: "Spotify",
      icon: SpotifyIcon,
      href: "https://open.spotify.com/user/gntu0y8a2id5en2bh6hvxheo2",
    },
  ] as const;

  const recent = writings.slice(0, 3);

  function shortDate(date: string): string {
    return date.slice(0, 10);
  }

  /** The username is already in the link, so no row declares it twice. */
  function pathOf(href: string): string {
    return new URL(href).pathname.replace(/\/$/, "");
  }

  const section = "border-b border-rule px-8 pt-10 pb-14";
  const label =
    "font-mono text-[11px] font-medium tracking-[0.1em] uppercase text-faint";
  // One row shape for every list below: icon gutter, label, body, a mono
  // token, then a fixed slot for the outbound mark — so both the token and
  // the arrow keep their own rail. Sections opt cells out on small screens,
  // never resize them.
  const row =
    "grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5";
  const rowLink = "link-hover opacity-82 hover:opacity-100";
  const rowIcon = "flex h-5 items-center text-faint";
  const rowMono = "font-mono text-[12px] whitespace-nowrap text-faint";
  const rowMeta = "font-mono text-[11.5px] whitespace-nowrap text-faint";
  const rowLift = "transition-colors duration-150 group-hover:text-foreground";

  // Callouts on the Kurye capture. Each label sits at a fixed offset from the
  // panel's centre line and its leader ends in a tick where it meets the
  // device, the way a dimension line lands on an edge. The `top` values are
  // measured off the capture, not guessed: it is 739x1510, so at w-55 it
  // renders 449.5px tall under the panel's 36px of padding, and the bands land
  // at 0.309 (map), 0.623 ("0/4 delivered") and 0.832 (Start Route). The crop
  // at max-h-111 slices through the tab icons at 0.908. A new screenshot means
  // re-measuring all four.
  const callout =
    "absolute flex items-center gap-2.5 font-mono text-[11px] whitespace-nowrap text-dim max-sm:hidden";
  const lead =
    "relative block h-px w-9.5 bg-faint after:absolute after:top-[-3px] after:h-[7px] after:w-px after:bg-faint after:content-['']";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://orhantugrul.dev" />
  <meta property="og:image" content="https://orhantugrul.dev/og/home.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://orhantugrul.dev/og/home.png" />
</svelte:head>

<header
  class="relative min-h-122 overflow-hidden border-b border-rule md:min-h-132"
>
  <Dither />

  <div class="relative z-2 flex min-h-122 flex-col px-8 md:min-h-132">
    <div class="flex h-16 shrink-0 items-center justify-end">
      <Navigation />
    </div>
    <div class="flex flex-1 items-center pb-11 md:pb-14">
      <div class="w-full">
        <h1
          class="text-[26px] leading-tight font-medium tracking-[-0.04em] sm:text-[30px]"
        >
          Hi, I’m Orhan
        </h1>
        <p class="mt-1.5 text-[13.5px] tracking-[-0.012em] text-dim">
          Software engineer in <Istanbul />
        </p>

        <div
          class="mt-7 max-w-[52ch] space-y-3.5 text-[15px] leading-[1.6] tracking-[-0.012em] text-pretty text-dim sm:text-[16px]"
        >
          <p>
            I build software at <a
              href={paketMutfakUrl}
              target="_blank"
              rel="external noopener noreferrer"
              class="link-hover font-medium whitespace-nowrap text-foreground opacity-82 hover:opacity-100"
              ><PaketMutfakIcon
                class="mr-1 inline size-[0.95em] align-[-0.12em]"
              /><span class="link-underline">Paket Mutfak</span></a
            >, from the app a courier holds at the door to the service behind it
            that keeps dispatch, orders and payments in step.
          </p>
          <p>Before this, treasury and leasing systems for banks.</p>
        </div>

        <p class="mt-7 max-w-[52ch] text-[13px] text-pretty text-dim">
          If that sounds familiar, <a
            href="https://cal.com/orhantugrul/chitchat"
            target="_blank"
            rel="external noopener noreferrer"
            class="link-hover font-medium text-foreground opacity-82 hover:opacity-100"
            ><span class="link-underline">book a chat</span></a
          >
          or
          <a
            href="mailto:hello@orhantugrul.dev"
            class="link-hover font-medium text-foreground opacity-82 hover:opacity-100"
            ><span class="link-underline">say hello</span></a
          >.
        </p>
      </div>
    </div>
  </div>
</header>

<section class={section}>
  <span class="{label} mb-7 block">Recent work</span>
  <div
    class="relative flex max-h-111 items-start justify-center overflow-hidden rounded-[10px] bg-panel pt-9"
  >
    <img
      class="w-55 light:hidden"
      src={kuryeDark}
      alt="The Kurye courier app mid-shift: a live delivery map above a sheet showing delivery progress, the queued orders, and the current drop-off."
      loading="lazy"
    />
    <img
      class="hidden w-55 light:block"
      src={kuryeLight}
      alt="The Kurye courier app mid-shift: a live delivery map above a sheet showing delivery progress, the queued orders, and the current drop-off."
      loading="lazy"
    />

    <span class="{callout} top-[166px] right-[calc(50%_+_118px)]">
      live position<i class="{lead} after:right-0" aria-hidden="true"></i>
    </span>
    <span class="{callout} top-[307px] left-[calc(50%_+_118px)]">
      <i class="{lead} after:left-0" aria-hidden="true"></i>batch progress
    </span>
    <span class="{callout} top-[401px] left-[calc(50%_+_118px)]">
      <i class="{lead} after:left-0" aria-hidden="true"></i>one tap to nav
    </span>
  </div>
  <p class="mt-4 font-mono text-[11.5px] text-dim sm:hidden">
    live position · batch progress · one tap to nav
  </p>
  <div class="mt-6.5 flex items-baseline gap-3">
    <h3 class="text-[16px] font-medium tracking-[-0.01em]">Kurye</h3>
  </div>
  <p class="mt-3 max-w-[58ch]">
    Kurye is the app couriers at Paket Mutfak work their shift from. One screen
    holds the orders assigned to them, the route between them, and what is left
    of the batch.
  </p>
  <p class="mt-3 max-w-[58ch] text-dim">
    The handover at the door is where the job used to stall. A card payment now
    reaches the terminal the courier already carries with the order attached to
    it, and the phone does not wait for the card to clear, so nobody stands at a
    door watching a spinner.
  </p>
  <p class="mt-3 max-w-[58ch] text-dim">
    The money has to be right every time. When a terminal goes quiet mid
    payment, the system finds out what actually happened instead of guessing, so
    no customer is charged twice and no delivery ends with money nobody can
    account for.
  </p>
</section>

<section class={section}>
  <span class="{label} mb-7 block">Writing</span>
  {#if writings.length > 0}
    <ul class="space-y-1">
      {#each recent as { slug, title: writingTitle, date, readingTime } (slug)}
        <li class="last:border-0">
          <a
            href={resolve("/writing/[slug]", { slug })}
            class="{row} {rowLink} max-sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <span class="{rowMono} col-start-2 tabular-nums max-sm:hidden"
              >{shortDate(date)}</span
            >
            <span class="font-medium">{writingTitle}</span>
            <span class={rowMeta}>{readingTime} min</span>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="py-7">
      <p class="text-[16px] font-medium tracking-[-0.012em]">
        Notes are taking shape.
      </p>
      <p class="mt-2.5 max-w-[52ch] text-pretty text-dim">
        I’m collecting thoughts on building products, engineering decisions, and
        the lessons worth keeping. The first one will land here soon.
      </p>
    </div>
  {/if}
</section>

<section class={section}>
  <span class="{label} mb-7 block">Experience</span>
  <ul class="space-y-1">
    {#each experiences as { period, role, company, href, icon: Icon } (company)}
      <li>
        <a
          {href}
          target="_blank"
          rel="external noopener noreferrer"
          class="{row} {rowLink} group max-sm:grid-cols-[1.5rem_minmax(0,1fr)_auto_0.875rem] max-sm:gap-y-0"
        >
          <span class="{rowIcon} {rowLift}">
            <Icon class="size-4" />
          </span>
          <span class="truncate font-medium text-foreground max-sm:col-start-2"
            >{company}</span
          >
          <span class="truncate text-dim max-sm:col-start-2 max-sm:row-start-2"
            >{role}</span
          >
          <span class="{rowMeta} max-sm:col-start-3 max-sm:row-start-1"
            >{period}</span
          >
          <ArrowUpRight
            class="{rowLift} size-3.5 text-faint max-sm:col-start-4 max-sm:row-start-1"
          />
        </a>
      </li>
    {/each}
  </ul>
</section>

<section class={section} id="connect">
  <span class="{label} mb-7 block">Connect</span>
  <ul class="space-y-1">
    {#each connectLinks as { label: network, href, icon: Icon } (href)}
      <li>
        <a
          {href}
          target="_blank"
          rel="external noopener noreferrer"
          class="{row} {rowLink} group max-sm:grid-cols-[1.5rem_minmax(0,1fr)_0.875rem]"
        >
          <span class="{rowIcon} {rowLift}">
            <Icon class="size-4" />
          </span>
          <span class="font-medium max-sm:hidden">{network}</span>
          <span class="truncate text-dim">{pathOf(href)}</span>
          <ArrowUpRight
            class="{rowLift} col-start-5 size-3.5 text-faint max-sm:col-start-3"
          />
        </a>
      </li>
    {/each}
  </ul>
</section>
