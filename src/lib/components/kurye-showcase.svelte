<script lang="ts">
  import dark from "$lib/assets/kurye-dark.webp";
  import light from "$lib/assets/kurye.webp";
</script>

<!--
  Breaks a little wider than the reading measure on desktop, which is what
  makes it read as a showcase rather than an inline image. The -mx-8 stays
  inside the shell's own 2.5rem padding, so nothing can overflow sideways.
-->
<div
  class="panel relative flex justify-center overflow-hidden rounded-xl border
         border-line bg-bg-subtle pt-10 md:-mx-8 md:pt-14"
>
  <!--
    background-image, not two <img> tags: a hidden <img> is still fetched, so
    the obvious version costs ~2MB to show one screenshot. A custom property
    is only resolved by the rule that matches, so exactly one ever loads.
  -->
  <div
    class="device"
    role="img"
    aria-label="The Kurye courier app mid-shift: a live delivery map above a
                sheet showing delivery progress, the queued orders, and the
                current drop-off."
    style="--light: url({light}); --dark: url({dark})"
  ></div>
</div>

<style>
  /* A wash of the accent ink behind the device, so the panel has depth. */
  .panel::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      58% 42% at 50% 0%,
      color-mix(in oklab, var(--accent) 13%, transparent),
      transparent 72%
    );
  }

  .device {
    position: relative;
    width: 100%;
    max-width: 13rem;
    /* Runs off the bottom edge, so the phone reads as entering the frame. */
    margin-bottom: -3rem;
    aspect-ratio: 976 / 1826;
    background-image: var(--light);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top center;
    filter: drop-shadow(0 18px 30px rgb(16 15 15 / 0.22));
  }

  @media (min-width: 48rem) {
    .device {
      max-width: 16rem;
      margin-bottom: -4rem;
    }
  }

  :global(.dark) .device {
    background-image: var(--dark);
    filter: drop-shadow(0 18px 34px rgb(0 0 0 / 0.55));
  }
</style>
