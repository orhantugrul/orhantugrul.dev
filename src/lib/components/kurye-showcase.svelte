<script lang="ts">
  import dark from "$lib/assets/kurye-dark.webp";
  import light from "$lib/assets/kurye.webp";
</script>

<div
  class="relative flex justify-center overflow-hidden rounded-xl border
         border-border bg-muted pt-10 before:absolute before:inset-0
         before:bg-[radial-gradient(58%_42%_at_50%_0%,color-mix(in_oklab,var(--primary)_13%,transparent),transparent_72%)]
         before:content-[''] md:-mx-8 md:pt-14"
>
  <div
    role="img"
    aria-label="The Kurye courier app mid-shift: a live delivery map above a
                sheet showing delivery progress, the queued orders, and the
                current drop-off."
    class="relative -mb-12 aspect-976/1826 w-full max-w-52 bg-(image:--light)
           bg-contain bg-top bg-no-repeat
           drop-shadow-[0_18px_30px_rgb(16_15_15/0.22)] md:-mb-16
           md:max-w-64 dark:bg-(image:--dark)
           dark:drop-shadow-[0_18px_34px_rgb(0_0_0/0.55)]"
    style="--light: url({light}); --dark: url({dark})"
  ></div>
</div>
