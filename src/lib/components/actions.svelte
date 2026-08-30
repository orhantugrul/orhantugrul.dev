<script lang="ts">
  import type { Link } from "$lib/types";
  import Arrow from "./icons/arrow.svelte";

  const actions: Link[] = [
    {
      label: "Chit chat with me",
      href: "https://cal.com/orhantugrul/chitchat",
      primary: true,
    },
    { label: "Email me", href: "mailto:hello@orhantugrul.dev" },
  ];
</script>

<div class="flex flex-wrap items-baseline gap-x-5 gap-y-2">
  {#each actions as { label, href, primary } (href)}
    <a
      {href}
      target="_blank"
      rel="external noopener noreferrer"
      class={[
        "inline-flex items-baseline gap-1.5 underline decoration-border-strong decoration-1 underline-offset-3 transition-colors duration-150 hover:decoration-primary",
        primary && "font-medium text-primary",
      ]}
    >
      {label}
      <Arrow class="text-muted-foreground" />
    </a>
  {/each}
</div>
