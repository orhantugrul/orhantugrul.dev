<script lang="ts">
  import { onMount } from "svelte";

  let time = timeOfTrabzon();

  onMount(() => {
    const interval = setInterval(() => {
      time = timeOfTrabzon();
    }, 1000);

    return () => clearInterval(interval);
  });

  function timeOfTrabzon() {
    const options = {
      timeZone: "Europe/Istanbul",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    } as Intl.DateTimeFormatOptions;

    return new Date().toLocaleString("en-US", options);
  }
</script>

<footer class="my-5 flex justify-between gap-2">
  <p class="font-mono text-xs text-gray">
    Trabzon, {time}
  </p>

  <p class="font-mono text-xs text-gray">
    © {new Date().getFullYear()} Orhan Tuğrul Şahin
  </p>
</footer>
