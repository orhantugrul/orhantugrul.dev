<script lang="ts">
  import { Calendar, Mail } from "@lucide/svelte";

  let card: HTMLElement;
  let mousePosition = { x: 0, y: 0 };

  function handleMouseMove(event: MouseEvent) {
    if (!card) return;

    const rect = card.getBoundingClientRect();
    mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
</script>

<div
  bind:this={card}
  role="button"
  tabindex="0"
  class="group relative overflow-hidden rounded-xl bg-card p-10 transition-all duration-300"
  onmousemove={handleMouseMove}
>
  <div
    class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    style="
      background: radial-gradient(
        600px circle at {mousePosition.x}px {mousePosition.y}px,
        rgba(29, 78, 216, 0.15),
        transparent 40%
      );
    "
  ></div>
  <div class="relative z-10">
    <div class="mb-6 flex items-center gap-2.5">
      <div class="relative flex h-2.5 w-2.5 items-center justify-center">
        <div
          class="absolute h-full w-full animate-ping rounded-full bg-green-500/40 opacity-75"
        ></div>
        <div class="relative h-1.5 w-1.5 rounded-full bg-green-500"></div>
      </div>
      <span class="text-sm font-medium tracking-wide text-muted-foreground">
        Available for work
      </span>
    </div>
    <h3 class="mb-6 text-xl font-semibold text-foreground">
      Let's build something amazing together
    </h3>
    <div class="flex flex-col gap-2.5 sm:flex-row">
      <a
        href="mailto:hello@orhantugrul.dev"
        class="flex items-center gap-2.5 rounded-lg border border-border bg-card px-5 py-2.5 font-medium text-foreground transition-all duration-200 hover:border-accent-foreground/20 hover:bg-accent"
      >
        <Mail class="h-4 w-4" />
        <span>Email me</span>
      </a>
      <a
        href="https://cal.com/orhantugrul/chitchat"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2.5 rounded-lg border border-border bg-card px-5 py-2.5 font-medium text-foreground transition-all duration-200 hover:border-accent-foreground/20 hover:bg-accent"
      >
        <Calendar class="h-4 w-4 " />
        <span>Book a call</span>
      </a>
    </div>
  </div>
</div>
