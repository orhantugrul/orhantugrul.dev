<script lang="ts">
  export let href: string;
</script>

<a
  class="underline hover:no-underline duration-200"
  target="_blank"
  rel="noopener noreferrer"
  {href}
>
  <slot />

  <span class="inline-flex">
    <svg
      class="w-[14px] h-[14px]"
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
  </span>
</a>
