<script lang="ts">
  let { class: className = "" }: { class?: string } = $props();
</script>

<svg
  class="inline-block {className}"
  width="10"
  height="10"
  viewBox="0 0 10 10"
  fill="none"
  stroke="currentColor"
  stroke-width="1.3"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M2.6 7.4 7.4 2.6" />
  <path d="M3.7 2.6h3.7v3.7" />
</svg>
