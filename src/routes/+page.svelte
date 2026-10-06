<script lang="ts">
  import Connect from "$lib/components/connect.svelte";
  import Experience from "$lib/components/experience.svelte";
  import Hero from "$lib/components/hero.svelte";
  import RecentWork from "$lib/components/recent-work.svelte";
  import Writing from "$lib/components/writing.svelte";

  const title = "Orhan Tugrul Sahin — Software Engineer";
  const description =
    "Software engineer in Istanbul building thoughtful products and dependable systems.";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://orhantugrul.dev" />
  <meta property="og:image" content="https://orhantugrul.dev/og.png" />
  <meta property="og:image:width" content="2400" />
  <meta property="og:image:height" content="1260" />
  <meta
    property="og:image:alt"
    content="Hi, I’m Orhan. Software engineer in Istanbul, over dithered light."
  />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Hero />
<RecentWork />
<Writing />
<Experience />
<Connect />
