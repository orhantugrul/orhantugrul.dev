<script lang="ts">
  import type { ResolvedPathname } from "$app/types";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  type Props = HTMLAnchorAttributes & {
    href: ResolvedPathname | `https://${string}` | `mailto:${string}`;
  };

  const { href, children, ...rest }: Props = $props();
</script>

{#if href.startsWith("/")}
  <a href={href as ResolvedPathname} {...rest}>
    {@render children?.()}
  </a>
{:else}
  <a
    {href}
    target={href.startsWith("https:") ? "_blank" : undefined}
    rel="external"
    {...rest}
  >
    {@render children?.()}
  </a>
{/if}
