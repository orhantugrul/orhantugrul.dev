<script lang="ts">
  import { onMount } from "svelte";
  import ThemeToggle from "./theme-toggle.svelte";

  function currentTime() {
    return new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/Istanbul",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  let time = $state("");
  const year = new Date().getFullYear();

  onMount(() => {
    time = currentTime();
    const interval = setInterval(() => (time = currentTime()), 30_000);
    return () => clearInterval(interval);
  });
</script>

<footer class="mx-auto w-full max-w-[40rem] px-6 pb-12 md:px-10">
  <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
    <p class="text-meta text-muted-foreground tabular-nums">
      Istanbul
      {#if time}<span>{time}</span>{/if}
    </p>
    <div class="flex items-center gap-4">
      <ThemeToggle />
      <p class="text-meta text-muted-foreground tabular-nums">{year}</p>
    </div>
  </div>
</footer>
