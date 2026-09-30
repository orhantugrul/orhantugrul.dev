<script lang="ts">
  import { onMount } from "svelte";

  type Latest = {
    url: string;
    number: number;
    title: string;
    tracks: number;
  };

  const { latest }: { latest: Latest | null } = $props();

  const ZONE = "Europe/Istanbul";

  // The files a crawler or a model reads instead of the page.
  const files = ["sitemap.xml", "robots.txt", "llms.txt"];

  const commit = __COMMIT__;
  const commitUrl = `https://github.com/orhantugrul/orhantugrul.dev/commit/${commit}`;
  const committed = __COMMITTED__ ? new Date(__COMMITTED__) : null;
  const date = committed?.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: ZONE,
  });

  // The page is prerendered, so the clock and how long ago are worked out
  // in the browser.
  let now = $state<Date | null>(null);
  let age = $state("");
  onMount(() => {
    now = new Date();
    // Tick on the minute, not every N seconds, so the clock never lags.
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(
      () => {
        now = new Date();
        interval = setInterval(() => (now = new Date()), 60_000);
      },
      60_000 - (Date.now() % 60_000)
    );

    if (committed) {
      // Calendar days on Istanbul's clock, so last night's commit is yesterday.
      const day = (d: Date) =>
        Date.parse(d.toLocaleDateString("en-CA", { timeZone: ZONE }));
      const days = Math.round((day(new Date()) - day(committed)) / 864e5);
      age = days < 1 ? "today" : days === 1 ? "yesterday" : `${days} days ago`;
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  });

  const time = $derived(
    now?.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: ZONE,
    })
  );
  const today = $derived(
    now?.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: ZONE,
    })
  );

  const cell = "flex min-w-0 flex-col gap-2.5";
  const label =
    "font-mono text-[10.5px] leading-[1.75] tracking-[0.08em] text-faint uppercase";
  const big = "font-mono text-[18px] leading-none tabular-nums";
  const value = "font-mono text-[12px] leading-[1.6] text-dim";
</script>

<footer
  class={[
    "grid gap-x-6 gap-y-8 px-8 pt-9 pb-10 max-sm:grid-cols-2",
    latest ? "grid-cols-4" : "grid-cols-3",
  ]}
>
  <div class={cell}>
    <span class={label}>Local time</span>
    {#if time}
      {@const [hours, minutes] = time.split(":")}
      <!-- The colon ticks once a second, so the clock reads as live. -->
      <span class={big}
        >{hours}<span class="animate-tick motion-reduce:animate-none">:</span
        >{minutes}</span
      >
    {:else}
      <span class={big}>—</span>
    {/if}
    <span class={value}>{today ? `${today} · ` : ""}UTC+3</span>
  </div>
  <div class={cell}>
    <span class={label}>Revision</span>
    {#if commit === "unknown"}
      <!-- Built without git: no hash to show or link to. -->
      <span class={big}>—</span>
    {:else}
      <a
        href={commitUrl}
        target="_blank"
        rel="external noopener noreferrer"
        class="link-hover self-start {big} hover:text-foreground"
        >{commit.slice(0, 7)}</a
      >
    {/if}
    {#if date}
      <span class={value}>{date}{age && ` · ${age}`}</span>
    {/if}
  </div>
  {#if latest}
    <div class={cell}>
      <span class={label}>Latest playlist</span>
      <a
        href={latest.url}
        target="_blank"
        rel="external noopener noreferrer"
        class="link-hover line-clamp-2 self-start text-[16px] leading-tight font-medium tracking-[-0.01em] hover:text-foreground"
        >{latest.title}</a
      >
      <span class={value}
        >Nº {String(latest.number).padStart(2, "0")} · {latest.tracks} tracks</span
      >
    </div>
  {/if}
  <div class={cell}>
    <span class={label}>For machines</span>
    <nav aria-label="Site files" class="flex flex-col {value}">
      {#each files as file (file)}
        <a
          href="/{file}"
          rel="external"
          class="link-hover self-start hover:text-foreground">{file}</a
        >
      {/each}
    </nav>
  </div>
</footer>
