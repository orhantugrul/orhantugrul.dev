<script lang="ts">
  import Connect from "$lib/components/connect.svelte";
  import Experience from "$lib/components/experience.svelte";
  import Header from "$lib/components/header.svelte";
  import RecentWork from "$lib/components/recent-work.svelte";
  import Writing from "$lib/components/writing.svelte";

  const title = "Orhan Tugrul";
  const description =
    "Software engineer in Istanbul, building the courier app and payments behind Paket Mutfak. Before that, treasury and leasing systems for banks.";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Orhan Tugrul",
    alternateName: "Orhan Tugrul Sahin",
    url: "https://orhantugrul.dev",
    email: "mailto:hello@orhantugrul.dev",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Paket Mutfak",
      url: "https://paketmutfak.com.tr",
    },
    homeLocation: { "@type": "Place", name: "Istanbul, Türkiye" },
    sameAs: [
      "https://github.com/orhantugrul",
      "https://x.com/orhantuurul",
      "https://www.linkedin.com/in/orhantugrul",
    ],
  };
  // The closing tag is split so it doesn't end this block.
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(person)}</${"script"}>`;
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
    content="Orhan Tugrul, software engineer in Istanbul, over dithered light."
  />
  <meta name="twitter:card" content="summary_large_image" />
  <!-- A fixed object, so there is nothing a visitor could inject. -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLd}
</svelte:head>

<Header />
<RecentWork />
<Writing />
<Experience />
<Connect />
