<script lang="ts">
  import { onMount } from "svelte";
  import Link from "$lib/components/link.svelte";

  const TIME_ZONE = "Europe/Istanbul";

  const files = ["sitemap.xml", "robots.txt", "llms.txt"];

  const commit = __COMMIT__;
  const commitUrl =
    `https://github.com/orhantugrul/orhantugrul.dev/commit/${commit}` as const;
  const committed = __COMMITTED__ ? new Date(__COMMITTED__) : null;
  const date = committed?.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: TIME_ZONE,
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
      60_000 - (Date.now() % 60_000),
    );

    if (committed) {
      // Calendar days on Istanbul's clock, so last night's commit is yesterday.
      const day = (date: Date) =>
        Date.parse(date.toLocaleDateString("en-CA", { timeZone: TIME_ZONE }));
      const days = Math.round((day(new Date()) - day(committed)) / 86_400_000);
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
      timeZone: TIME_ZONE,
    }),
  );
  const today = $derived(
    now?.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: TIME_ZONE,
    }),
  );
</script>

<footer class="grid grid-cols-3 gap-x-6 gap-y-8 px-8 py-10 max-sm:grid-cols-2">
  <div class="flex min-w-0 flex-col gap-2.5">
    <span
      class="font-mono text-2xs tracking-widest text-subtle-foreground uppercase"
    >
      Local time
    </span>
    {#if time}
      {@const [hours, minutes] = time.split(":")}
      <span class="flex font-mono text-xl leading-none tabular-nums">
        {hours}
        <span class="animate-blink">:</span>
        {minutes}
      </span>
    {:else}
      <span class="font-mono text-xl leading-none tabular-nums">—</span>
    {/if}
    <span class="font-mono text-xs text-muted-foreground">
      {today ? `${today} · ` : ""}UTC+3
    </span>
  </div>
  <div class="flex min-w-0 flex-col gap-2.5">
    <span
      class="font-mono text-2xs tracking-widest text-subtle-foreground uppercase"
    >
      Revision
    </span>
    {#if commit === "unknown"}
      <span class="font-mono text-xl leading-none tabular-nums">—</span>
    {:else}
      <Link
        href={commitUrl}
        class="self-start font-mono text-xl leading-none tabular-nums transition hover:text-foreground"
      >
        {commit.slice(0, 7)}
      </Link>
    {/if}
    {#if date}
      <span class="font-mono text-xs text-muted-foreground">
        {date}{age && ` · ${age}`}
      </span>
    {/if}
  </div>
  <div class="flex min-w-0 flex-col gap-2.5">
    <span
      class="font-mono text-2xs tracking-widest text-subtle-foreground uppercase"
    >
      For machines
    </span>
    <nav
      aria-label="Site files"
      class="flex flex-col font-mono text-xs text-muted-foreground"
    >
      {#each files as file (file)}
        <a
          href="/{file}"
          rel="external"
          class="self-start transition hover:text-foreground"
        >
          {file}
        </a>
      {/each}
    </nav>
  </div>
</footer>
