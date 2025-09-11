<script lang="ts">
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
  class="group relative overflow-hidden rounded-2xl border border-outline bg-solitude p-8 transition-all duration-300 dark:bg-raisin"
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
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-3 w-3 items-center justify-center">
        <div class="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
      </div>
      <span class="text-sm font-medium text-gray">Available for work</span>
    </div>

    <h3 class="mb-6 text-xl font-semibold text-black dark:text-white">
      Let's build something amazing together
    </h3>

    <div class="flex flex-col gap-3 sm:flex-row">
      <a
        href="mailto:hello@orhantugrul.dev"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-outline bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-black hover:text-white dark:bg-raisin dark:text-smoke dark:hover:bg-smoke dark:hover:text-black"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Email me
      </a>

      <a
        href="https://cal.com/orhantugrul/chitchat"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-gray dark:bg-smoke dark:text-black dark:hover:bg-white"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Book a call
      </a>
    </div>
  </div>
</div>
