<script lang="ts">
  import appleTouchIcon from "$assets/apple-touch-icon.png";
  import favicon16x16 from "$assets/favicon-16x16.png";
  import favicon32x32 from "$assets/favicon-32x32.png";
  import favicon from "$assets/favicon.ico";
  import { onMount } from "svelte";
  import "../app.css";

  let { children } = $props();

  onMount(() => {
    const preferredDarkSchema = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const updateColorScheme = () => {
      document.documentElement.classList.toggle(
        "dark",
        preferredDarkSchema.matches
      );
    };

    updateColorScheme();
    preferredDarkSchema.addEventListener("change", updateColorScheme);
    return () => {
      preferredDarkSchema.removeEventListener("change", updateColorScheme);
    };
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
  <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
  <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
  <link rel="manifest" href="/manifest.json" />
  <meta name="author" content="Orhan Tugrul Sahin" />
  <meta name="keywords" content="Software Crafter, Software Developer" />
  <meta
    name="robots"
    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <meta name="language" content="English" />
  <meta
    name="theme-color"
    media="(prefers-color-scheme: light)"
    content="hsl(0, 0%, 100%)"
  />
  <meta
    name="theme-color"
    media="(prefers-color-scheme: dark)"
    content="hsl(220, 7%, 9%)"
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:site_name"
    content="Orhan Tugrul Sahin - Software Crafter"
  />
  <meta property="og:locale" content="en_US" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
</svelte:head>

{@render children?.()}
