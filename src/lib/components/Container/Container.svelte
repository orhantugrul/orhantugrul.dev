<div class="container">
  <slot />
</div>

<style lang="postcss">
  .container {
    @apply flex;
    @apply flex-col;
    @apply px-8;
    @apply min-w-full;
  }
</style>
