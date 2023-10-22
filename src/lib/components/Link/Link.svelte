<script lang="ts">
  export let href: string;
</script>

<a
  class="underline hover:no-underline duration-200 after:content-['_↗']"
  target="_blank"
  rel="noopener noreferrer"
  {href}
>
  <slot />
</a>
