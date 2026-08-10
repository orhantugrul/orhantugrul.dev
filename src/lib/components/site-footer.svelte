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

  let time = $state(currentTime());
  const year = new Date().getFullYear();

  // "23" of "23:47" — parsing the formatted string keeps one source of truth.
  let quip = $derived(
    clockQuips.find(([until]) => Number(time.slice(0, 2)) < until)?.[1] ?? ""
  );

  onMount(() => {
    // The prerendered markup carries build time, so correct it on hydration.
    time = currentTime();
    const id = setInterval(() => (time = currentTime()), 30_000);
    return () => clearInterval(id);
  });
</script>

<footer class="shell pb-12">
  <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
    <p class="text-meta text-fg-muted tabular-nums">
      {site.location}
      {time} — {quip}
    </p>
    <div class="flex items-center gap-4">
      <ThemeToggle />
      <p class="text-meta text-fg-muted tabular-nums">{year}</p>
    </div>
  </div>
</footer>
