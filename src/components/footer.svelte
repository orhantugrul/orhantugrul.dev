<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import { onMount } from "svelte";

  const { socials } = $props();

  onMount(() => {
    const interval = setInterval(() => {
      localTime = getLocalTime();
    }, 1000);

    return () => clearInterval(interval);
  });

  function getLocalTime() {
    const options = {
      timeZone: "Europe/Istanbul",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    } as Intl.DateTimeFormatOptions;

    return new Date().toLocaleString("en-US", options);
  }

  let localTime = $derived.by(getLocalTime);
</script>

<footer
  class="flex flex-col gap-4 font-mono md:flex-row md:items-center md:justify-between"
>
  <p class="text-xs text-gray">
    Istanbul, {localTime}
  </p>

  <div class="flex flex-wrap gap-6">
    {#each socials as { title, href }}
      <a
        class="group inline-flex items-center gap-1 text-gray hover:text-black dark:hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
        {href}
      >
        <span class="text-xs">{title}</span>
        <ArrowUpRight class="h-3 w-3" />
      </a>
    {/each}
  </div>
</footer>
