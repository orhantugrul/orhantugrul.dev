<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  const {
    side,
    class: className,
    children,
  }: {
    side: "left" | "right";
    class?: ClassValue;
    children: Snippet;
  } = $props();
</script>

<span
  class={[
    "absolute flex items-center gap-2.5 font-mono text-2xs whitespace-nowrap text-muted-foreground max-sm:hidden",
    side === "left"
      ? "right-[calc(50%+118px)] flex-row-reverse"
      : "left-[calc(50%+118px)]",
    className,
  ]}
>
  <span
    class={[
      "relative block h-px w-10 bg-subtle-foreground after:absolute after:-top-0.75 after:h-1.75 after:w-px after:bg-subtle-foreground",
      side === "left" ? "after:right-0" : "after:left-0",
    ]}
    aria-hidden="true"
  ></span>
  {@render children()}
</span>
