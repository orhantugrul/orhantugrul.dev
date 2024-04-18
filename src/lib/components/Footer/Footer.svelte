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

<footer class="flex border-t-[1px] border-[#2E3036]">
  <div class="flex flex-col py-4">
    <p class="dark:text-[#CFD1D6] text-xs font-mono mb-3">
      Trabzon, {trabzonTime}
    </p>

    <p class="dark:text-[#CFD1D6] text-xs font-mono">
      © {new Date().getFullYear()} Orhan Tuğrul Şahin
    </p>
  </div>
</footer>
