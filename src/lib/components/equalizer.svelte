<script lang="ts">
  import type { NowPlaying } from "$lib/types";

  const { state }: { state: NowPlaying["state"] } = $props();
</script>

<!-- Moving while it plays, frozen mid-move when paused, flat once closed. -->
<span class="flex h-2.5 shrink-0 items-end gap-0.5" aria-hidden="true">
  {#each [0, -0.4, -0.75] as delay (delay)}
    <span
      class={[
        "h-full w-0.5 origin-bottom transition-transform duration-300",
        state === "offline"
          ? "scale-y-20 bg-subtle-foreground"
          : "animate-equalizer",
        state === "playing" && "bg-green-500",
        state === "paused" &&
          "bg-muted-foreground [animation-play-state:paused]",
      ]}
      style:animation-delay="{delay}s"
    ></span>
  {/each}
</span>
