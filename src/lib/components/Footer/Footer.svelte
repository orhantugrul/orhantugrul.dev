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

<footer class="flex border-t-[1px] border-solid border-outline">
  <div class="flex flex-col py-4">
    <p class="mb-3 font-mono text-xs text-gray">
      Trabzon, {time}
    </p>

    <p class="font-mono text-xs text-gray">
      © {new Date().getFullYear()} Orhan Tuğrul Şahin
    </p>
  </div>
</footer>
