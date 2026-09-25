<script lang="ts">
  import { onMount } from "svelte";
  import type { Attachment } from "svelte/attachments";
  import type { NowPlaying } from "$lib/types";

  const POLL = 30_000;
  // The empty record's dots, in CSS pixels.
  const CELL = 3;

  let data = $state<NowPlaying | null>(null);
  let now = $state(Date.now());
  let loading = false;

  async function load() {
    if (loading) return;
    loading = true;
    try {
      const response = await fetch("/api/now-playing");
      // A null answer never replaces a record already on screen.
      const next: NowPlaying | null = response.ok
        ? await response.json()
        : null;
      if (next) data = next;
    } catch {
      // Offline or blocked: keep whatever is on screen.
    }
    loading = false;
  }

  onMount(() => {
    load();
    const poll = setInterval(() => document.hidden || load(), POLL);
    const clock = setInterval(() => {
      now = Date.now();
      // The song ran out before the next poll: ask what came after it.
      if (data?.state === "playing" && position >= data.length) load();
    }, 1000);
    return () => {
      clearInterval(poll);
      clearInterval(clock);
    };
  });

  const position = $derived(
    data
      ? Math.min(
          data.length,
          data.state === "playing"
            ? data.progress + (now - data.at)
            : data.progress
        )
      : 0
  );

  function clock(ms: number) {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  function ago(at: number) {
    const minutes = Math.max(1, Math.round((now - at) / 60_000));
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
    return `${Math.round(minutes / 1440)}d ago`;
  }

  const status = $derived(
    !data
      ? "Nothing playing"
      : data.state === "playing"
        ? "Now playing"
        : data.state === "paused"
          ? "Paused"
          : `Last played · ${ago(data.at)}`
  );

  const BAYER = (() => {
    const m = new Float32Array(64);
    const b2 = (x: number, y: number) => ((x % 2) / 2 + (y % 2) * 0.75) % 1;
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++)
        m[y * 8 + x] =
          (b2(x >> 2, y >> 2) * 0.25 + b2(x >> 1, y >> 1)) * 0.25 + b2(x, y);
    return m;
  })();

  // No record yet: a blank label, the matrix's lightest even screen.
  const blank: Attachment<HTMLCanvasElement> = (canvas) => {
    const cells = Math.max(8, Math.round(canvas.clientWidth / CELL));
    canvas.width = canvas.height = cells;
    const ctx = canvas.getContext("2d")!;
    const paint = () => {
      const [r, g, b] = getComputedStyle(canvas)
        .color.match(/\d+/g)!
        .map(Number);
      const image = ctx.createImageData(cells, cells);
      for (let i = 0; i < cells * cells; i++)
        if (BAYER[(Math.floor(i / cells) % 8) * 8 + ((i % cells) % 8)] < 0.1)
          image.data.set([r, g, b, 255], i * 4);
      ctx.putImageData(image, 0, 0);
    };
    paint();
    const theme = new MutationObserver(paint);
    theme.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => theme.disconnect();
  };

  const term =
    "text-[10.5px] leading-[1.75] tracking-[0.08em] uppercase text-faint";
  const value = "truncate text-dim";
</script>

<div
  class="grid grid-cols-[132px_minmax(0,1fr)] items-start gap-5.5 max-sm:grid-cols-[96px_minmax(0,1fr)] max-sm:gap-4"
>
  {#if data}
    <a
      href={data.url}
      target="_blank"
      rel="external noopener noreferrer"
      tabindex="-1"
      aria-hidden="true"
    >
      {#if data.cover}
        <img
          src={data.cover}
          alt=""
          width="132"
          height="132"
          class="block size-33 rounded-[3px] object-cover max-sm:size-24"
        />
      {/if}
    </a>
  {:else}
    <canvas
      {@attach blank}
      class="block size-33 text-faint [image-rendering:pixelated] max-sm:size-24"
      aria-hidden="true"
    ></canvas>
  {/if}
  <div class="min-w-0">
    <dl
      class="grid grid-cols-[6.5em_minmax(0,1fr)] gap-x-3.5 gap-y-1.25 font-mono text-[11.5px] tabular-nums"
    >
      <dt class={term}>Status</dt>
      <dd
        class="flex items-center gap-1.75 text-[10.5px] font-medium tracking-[0.1em] whitespace-nowrap text-faint uppercase"
      >
        <span
          class={[
            "size-1.5 rounded-full",
            data?.state === "playing" && "animate-pulse bg-[#1db954]",
            data?.state === "paused" && "bg-dim",
            (!data || data.state === "offline") &&
              "shadow-[inset_0_0_0_1px_var(--faint)]",
          ]}
        ></span>
        {status}
      </dd>
      <dt class={term}>Track</dt>
      <dd class="truncate">
        {#if data}
          <a
            href={data.url}
            target="_blank"
            rel="external noopener noreferrer"
            class="link-hover text-foreground opacity-82 hover:opacity-100"
            ><span class="link-underline">{data.track}</span></a
          >
        {:else}
          <span class="text-faint">—</span>
        {/if}
      </dd>
      <dt class={term}>Artist</dt>
      <dd class={value}>{data?.artist ?? "—"}</dd>
      <dt class={term}>Album</dt>
      <dd class={value}>{data?.album ?? "—"}</dd>
      {#if data && data.state !== "offline"}
        <dt class={term}>Position</dt>
        <dd class={value}>{clock(position)} / {clock(data.length)}</dd>
      {/if}
    </dl>
  </div>
</div>
