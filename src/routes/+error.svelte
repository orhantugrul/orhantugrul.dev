<script lang="ts">
  import { resolve } from "$app/paths";

  let progress = $state(0);

  $effect(() => {
    const duration = 3000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      progress = Math.round(rawProgress);

      if (progress >= 100) {
        clearInterval(timer);
      }
    }, 16); // ~60fps (1000ms / 60fps = 16.67ms)

    return () => clearInterval(timer);
  });
</script>

<div class="flex p-8 font-sans text-foreground">
  <div class="w-full max-w-4xl space-y-8">
    <div class="mb-12 text-8xl font-light">:(</div>
    <h1 class="mb-12 text-2xl font-light">
      Your device ran into a problem and needs to restart. We're just collecting
      some error info, and then you can restart.
    </h1>
    <div class="mb-12 text-2xl font-light">
      {#if progress < 100}
        <p>{progress}% complete</p>
      {:else}
        <a href={resolve("/")} class="flex items-center gap-3 text-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            class="h-5 w-5 scale-x-[-1] -rotate-90"
            fill="currentColor"
            stroke="currentColor"
          >
            <path
              d="M 25 2 A 1.0001 1.0001 0 1 0 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 18.307314 7.130711 12.364806 12 8.5195312 L 12 15 A 1.0001 1.0001 0 1 0 14 15 L 14 6.5507812 L 14 5 L 4 5 A 1.0001 1.0001 0 1 0 4 7 L 10.699219 7 C 5.4020866 11.214814 2 17.712204 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z"
            ></path>
          </svg>
          Restart
        </a>
      {/if}
    </div>
  </div>
</div>
