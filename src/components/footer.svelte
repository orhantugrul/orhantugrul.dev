<script lang="ts">
  import socials from "$lib/data/socials";
  import { onMount } from "svelte";

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

  $: localTime = getLocalTime();
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
        <svg
          class="h-3 w-3"
          fill="none"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    {/each}
  </div>
</footer>
