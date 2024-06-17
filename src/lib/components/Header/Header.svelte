<script lang="ts">
  import { page } from "$app/stores";

  const pages = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Blog",
      link: "/blog",
    },
  ];
</script>

<header
  class="my-5 flex items-center justify-between border-b-[1px] border-outline"
>
  <nav class="flex items-center py-4">
    {#each pages as { title, link }}
      <a href={link}>
        <span
          class="border-b-[1px] border-bright font-mono text-xs dark:text-bright"
        >
          {title}
        </span>
      </a>
    {/each}
  </nav>

  <div>
    <button class="font-mono text-xs text-gray">Lights on</button>
  </div>
</header>
