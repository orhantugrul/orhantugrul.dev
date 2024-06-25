<script lang="ts">
  export let href: string;
</script>

<a
  class="dark:hover:bg-raisin dark:text-smoke hover:bg-solitude inline-flex items-center gap-1 rounded px-1 text-black"
  target="_blank"
  rel="noopener noreferrer"
  {href}
>
  <slot />

  <svg
    class="h-[14px] w-[14px]"
    fill="none"
    shape-rendering="geometricPrecision"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
</a>
