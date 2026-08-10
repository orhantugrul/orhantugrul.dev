<script lang="ts">
  import { clockQuips, site } from "$lib/data";
  import { onMount } from "svelte";
  import ThemeToggle from "./theme-toggle.svelte";

  function currentTime() {
    return new Date().toLocaleTimeString("en-GB", {
      timeZone: site.timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /*
   * Deliberately empty on the server. Every page is prerendered, so any time
   * rendered here would be frozen at build time and shown to every visitor
   * until hydration corrected it — wrong clock, wrong quip. Better to start
   * blank and fill in once, than to flash a stale value.
   */
  let time = $state("");
  const year = new Date().getFullYear();

  // "23" of "23:47" — parsing the formatted string keeps one source of truth.
  let quip = $derived(
    time
      ? (clockQuips.find(([until]) => Number(time.slice(0, 2)) < until)?.[1] ??
          "")
      : ""
  );

  onMount(() => {
    time = currentTime();
    const id = setInterval(() => (time = currentTime()), 30_000);
    return () => clearInterval(id);
  });
</script>

<footer class="shell pb-12">
  <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
    <!-- The line holds its height whether or not the clock has arrived. -->
    <p class="text-meta text-fg-muted tabular-nums">
      {site.location}
      {#if time}<span>{time} — {quip}</span>{/if}
    </p>
    <div class="flex items-center gap-4">
      <ThemeToggle />
      <p class="text-meta text-fg-muted tabular-nums">{year}</p>
    </div>
  </div>
</footer>
