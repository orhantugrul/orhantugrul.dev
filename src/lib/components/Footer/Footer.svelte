<script lang="ts">
  import { onMount } from "svelte";

  let trabzonTime = getTrabzonTime();

  onMount(() => {
    const interval = setInterval(() => {
      trabzonTime = getTrabzonTime();
    }, 1000);

    return () => clearInterval(interval);
  });

  function getTrabzonTime() {
    const options = {
      timeZone: "Europe/Istanbul",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    } as Intl.DateTimeFormatOptions;

    return new Date().toLocaleString("en-US", options);
  }
</script>

<footer class="flex border-t-[1px] border-outline dark:border-outline-dark">
  <div class="flex flex-col py-4">
    <p class="mb-3 font-mono text-xs text-gray dark:text-gray-dark">
      Trabzon, {trabzonTime}
    </p>

    <p class="font-mono text-xs text-gray dark:text-gray-dark">
      © {new Date().getFullYear()} Orhan Tuğrul Şahin
    </p>
  </div>
</footer>
