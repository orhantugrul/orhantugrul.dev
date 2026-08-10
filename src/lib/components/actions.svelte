<script lang="ts">
  import { actions } from "$lib/data";
  import Arrow from "./icons/arrow.svelte";
</script>

<!-- Plain inline links, the way the dead-simple sites do it. No chrome. -->
<!-- Both actions are an off-site booking page or a mailto, so there is no
     internal route for resolve() to check. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class="flex flex-wrap items-baseline gap-x-5 gap-y-2">
  {#each actions as { label, href, external, primary } (href)}
    <a
      {href}
      target={external ? "_blank" : null}
      rel={external ? "noopener noreferrer" : null}
      class="inline-flex items-baseline gap-1.5 link {primary
        ? 'font-medium text-accent'
        : ''}"
    >
      {label}
      <Arrow class="text-fg-muted" />
    </a>
  {/each}
</div>
