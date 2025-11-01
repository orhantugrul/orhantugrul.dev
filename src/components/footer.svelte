<script lang="ts">
  import type { Social } from "$types/social";
  import { ArrowUpRight } from "@lucide/svelte";
  import { onMount } from "svelte";

  const socials: Social[] = [
    {
      title: "GitHub",
      href: "https://github.com/orhantugrul",
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/orhantugrulsahin",
    },
    {
      title: "Resume",
      href: "/resume.pdf",
    },
  ];

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
  <p class="text-xs text-muted-foreground">
    Istanbul, {localTime}
  </p>
  <div class="flex flex-wrap gap-4">
    {#each socials as { title, href } (href)}
      <a
        class="flex items-center gap-2 text-muted-foreground hover:bg-muted"
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
