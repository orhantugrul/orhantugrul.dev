<script lang="ts">
  import NowPlaying from "./now-playing.svelte";

  // The files a crawler or a model reads instead of the page.
  const files = ["sitemap.xml", "robots.txt", "llms.txt"];

  const commit = __COMMIT__;
  const commitUrl = `https://github.com/orhantugrul/orhantugrul.dev/commit/${commit}`;
</script>

<footer class="flex flex-col gap-6.5 px-8 pt-8 pb-5.5">
  <NowPlaying />
  <div
    class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[11.5px] tracking-[0.06em] text-faint"
  >
    <nav aria-label="Site files" class="flex flex-wrap gap-x-4.5 gap-y-1">
      {#each files as file (file)}
        <a
          href="/{file}"
          rel="external"
          class="link-hover hover:text-foreground">{file}</a
        >
      {/each}
    </nav>
    <a
      href={commitUrl}
      target="_blank"
      rel="external noopener noreferrer"
      class="link-hover tabular-nums hover:text-foreground"
      >build {commit.slice(0, 7)}</a
    >
  </div>
</footer>
