<script lang="ts">
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

<footer class="my-5 flex justify-between gap-2">
  <p class="font-mono text-xs text-gray">
    Istanbul, {localTime}
  </p>

  <p class="font-mono text-xs text-gray">
    © {new Date().getFullYear()} Orhan Tuğrul Şahin
  </p>
</footer>
