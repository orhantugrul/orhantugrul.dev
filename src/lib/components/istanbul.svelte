<script lang="ts">
  import { onMount } from "svelte";

  // Turkey has stayed on UTC+3 all year since 2016, so the offset is fixed.
  const OFFSET = 180;
  const LAT = 41.0082;
  const LON = 28.9784;

  let now = $state<Date | null>(null);

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
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  });

  /** Minutes since Istanbul midnight. */
  function minutesOf(date: Date): number {
    return (date.getUTCHours() * 60 + date.getUTCMinutes() + OFFSET) % 1440;
  }

  function clock(minutes: number): string {
    const h = Math.floor(minutes / 60) % 24;
    const m = Math.floor(minutes % 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  /** NOAA's approximate sunrise equation, in Istanbul minutes. */
  function sunTimes(date: Date): [number, number] {
    const start = Date.UTC(date.getUTCFullYear(), 0, 1);
    const g = ((2 * Math.PI) / 365) * Math.floor((+date - start) / 864e5);
    const eq =
      229.18 *
      (0.000075 +
        0.001868 * Math.cos(g) -
        0.032077 * Math.sin(g) -
        0.014615 * Math.cos(2 * g) -
        0.040849 * Math.sin(2 * g));
    const decl =
      0.006918 -
      0.399912 * Math.cos(g) +
      0.070257 * Math.sin(g) -
      0.006758 * Math.cos(2 * g) +
      0.000907 * Math.sin(2 * g) -
      0.002697 * Math.cos(3 * g) +
      0.00148 * Math.sin(3 * g);
    const lat = (LAT * Math.PI) / 180;
    const ha =
      (Math.acos(
        Math.cos((90.833 * Math.PI) / 180) / (Math.cos(lat) * Math.cos(decl)) -
          Math.tan(lat) * Math.tan(decl)
      ) *
        180) /
      Math.PI;
    return [
      720 - 4 * (LON + ha) - eq + OFFSET,
      720 - 4 * (LON - ha) - eq + OFFSET,
    ];
  }

  /** How Istanbul sits against the visitor's own clock. */
  function relative(date: Date): string {
    const diff = OFFSET + date.getTimezoneOffset();
    if (diff === 0) return "same time as you";
    const hours = Math.abs(diff) / 60;
    const amount = `${Number.isInteger(hours) ? hours : hours.toFixed(1)} ${hours === 1 ? "hour" : "hours"}`;
    return `${amount} ${diff > 0 ? "ahead of" : "behind"} you`;
  }

  /** A point on the sky's arc, from the left horizon (0) to the right (1). */
  function arc(t: number): [number, number] {
    return [3 + t * 58, 16 - Math.sin(t * Math.PI) * 12];
  }

  /** The arc between two points along it, as a path. */
  function trace(from: number, to: number): string {
    const steps = Math.max(1, Math.ceil((to - from) * 32));
    return Array.from({ length: steps + 1 }, (_, i) => {
      const [x, y] = arc(from + ((to - from) * i) / steps);
      return `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join("");
  }

  const view = $derived.by(() => {
    if (!now) return null;
    const minutes = minutesOf(now);
    const [rise, set] = sunTimes(now);
    const day = minutes >= rise && minutes <= set;
    // The sun crosses the arc from sunrise to sunset; after dark the moon
    // crosses the same arc from sunset round to the next sunrise.
    const f = day
      ? (minutes - rise) / (set - rise)
      : ((minutes - set + 1440) % 1440) / (1440 - (set - rise));
    return {
      time: clock(minutes),
      relative: relative(now),
      day,
      // The part of the arc already crossed is drawn solid, the rest dotted.
      done: trace(0, f),
      ahead: trace(f, 1),
      at: arc(f),
      rays: Array.from({ length: 8 }, (_, i) => {
        const [x, y] = arc(f);
        const a = (i * Math.PI) / 4;
        const [c, s] = [Math.cos(a), Math.sin(a)];
        return `M${x + c * 3.2} ${y + s * 3.2}L${x + c * 4.4} ${y + s * 4.4}`;
      }).join(""),
    };
  });
</script>

<!-- A button, so the card opens on tap and on keyboard focus as well as hover. -->
<span class="group relative inline-block">
  <button
    type="button"
    class="cursor-default text-inherit underline decoration-faint decoration-dotted underline-offset-[0.25em] transition-colors duration-150 group-hover:text-foreground focus-visible:text-foreground"
    aria-describedby="istanbul-now"
  >
    Istanbul
  </button>
  <span
    id="istanbul-now"
    role="tooltip"
    class="pointer-events-none invisible absolute top-full left-0 z-10 mt-2.5 w-max translate-y-1 rounded-lg border border-rule bg-panel px-3.5 py-3 font-mono text-[11.5px] leading-normal tracking-[0.02em] text-faint tabular-nums opacity-0 transition-[opacity,translate,visibility] duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
  >
    {#if view}
      <span class="flex items-center gap-3">
        <span class="text-[15px] tracking-normal text-foreground"
          >{view.time}</span
        >
        <svg
          class="h-5 w-17"
          viewBox="-2 -2 68 20"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <!-- The track stops short of the sun or moon instead of running
               through it. -->
          <mask id="istanbul-gap">
            <rect x="-2" y="-2" width="68" height="20" fill="white" />
            <circle
              cx={view.at[0]}
              cy={view.at[1]}
              r={view.day ? 6 : 4.8}
              fill="black"
            />
          </mask>
          <g mask="url(#istanbul-gap)">
            <path d={view.done} stroke-width="1" />
            <path d={view.ahead} stroke-width="1" stroke-dasharray="0 3" />
            <path d="M0 16.5H64" stroke-width="0.75" opacity="0.5" />
          </g>
          {#if view.day}
            <!-- Sun: a disc with eight short rays. -->
            <circle
              cx={view.at[0]}
              cy={view.at[1]}
              r="1.9"
              fill="currentColor"
              stroke="none"
            />
            <path d={view.rays} stroke-width="0.9" />
          {:else}
            <!-- Moon: a crescent, cut from a disc by an offset one. -->
            <mask id="istanbul-moon">
              <rect x="-2" y="-2" width="68" height="20" fill="white" />
              <circle
                cx={view.at[0] + 1.5}
                cy={view.at[1] - 1.2}
                r="2.6"
                fill="black"
              />
            </mask>
            <circle
              cx={view.at[0]}
              cy={view.at[1]}
              r="3"
              fill="currentColor"
              stroke="none"
              mask="url(#istanbul-moon)"
            />
          {/if}
        </svg>
      </span>
      <span class="mt-1.5 block">{view.relative} · UTC+3</span>
    {:else}
      <span class="block">UTC+3</span>
    {/if}
  </span>
</span>
