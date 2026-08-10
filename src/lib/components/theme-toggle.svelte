<script lang="ts">
  import { toggleTheme } from "$lib/theme";
</script>

<!--
  Both icons ship in the markup and CSS picks one off the `.dark` class, which
  the inline script sets before paint. No state, no hydration mismatch.
-->
<button
  type="button"
  onclick={toggleTheme}
  aria-label="Toggle color scheme"
  title="Toggle color scheme"
  class="flex size-9 cursor-pointer items-center justify-center rounded-full
         text-fg-muted transition duration-150 hover:bg-bg-subtle hover:text-fg
         active:scale-90"
>
  <svg
    class="size-4 dark:hidden"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    stroke-linecap="round"
    aria-hidden="true"
  >
    <path d="M13.5 9.6A5.6 5.6 0 0 1 6.4 2.5a5.6 5.6 0 1 0 7.1 7.1Z" />
  </svg>
  <svg
    class="hidden size-4 dark:block"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    stroke-width="1.25"
    stroke-linecap="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="3.1" />
    <path
      d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3.05 3.05l1.13 1.13
         M11.82 11.82l1.13 1.13M3.05 12.95l1.13-1.13M11.82 4.18l1.13-1.13"
    />
  </svg>
</button>
