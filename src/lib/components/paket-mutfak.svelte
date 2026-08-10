<script lang="ts">
  import logo from "$lib/assets/paketmutfak.webp";
</script>

<!--
  The mark is black on transparent, so it would disappear in dark mode as an
  <img>. Masking it and filling with currentColor makes it inherit the text
  colour instead — right in both themes, and it goes accent on hover with the
  words. Costs the logo's red, which is invisible at this size anyway.
-->
<a
  href="https://paketmutfak.com.tr/?ref=orhantugrul.dev"
  target="_blank"
  rel="noopener noreferrer"
  class="brand whitespace-nowrap"
  style="--logo: url({logo})"
>
  <span class="mark" aria-hidden="true"></span>Paket Mutfak</a
>

<style>
  .mark {
    display: inline-block;
    width: 0.95em;
    height: 0.95em;
    margin-right: 0.28em;
    background-color: currentColor;
    -webkit-mask-image: var(--logo);
    mask-image: var(--logo);
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    /* Sits the mark on the text's optical centre, not its baseline. */
    transform: translateY(0.09em);
  }

  .brand {
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    text-decoration-color: var(--line-strong);
    transition: text-decoration-color 150ms ease;
  }

  .brand:hover {
    text-decoration-color: var(--accent);
  }
</style>
