<script lang="ts">
  let {
    cover,
    class: className = "",
    discClass = "",
  }: { cover: string | null; class?: string; discClass?: string } = $props();
</script>

<!-- A record in its sleeve: the disc sits behind the cover, and the caller
     decides how far it slides out. The cover doubles as the centre label. -->
<div class="relative aspect-square {className}">
  <div
    class="disc absolute inset-[3%] rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none {discClass}"
    aria-hidden="true"
  >
    {#if cover}
      <img
        src={cover}
        alt=""
        class="absolute inset-[32%] size-[36%] rounded-full object-cover opacity-90"
        loading="lazy"
      />
    {/if}
  </div>
  {#if cover}
    <img
      src={cover}
      alt=""
      class="relative size-full rounded-[3px] object-cover shadow-[0_0_0_1px_var(--rule)]"
      loading="lazy"
    />
  {:else}
    <div
      class="relative size-full rounded-[3px] bg-panel shadow-[0_0_0_1px_var(--rule)]"
    ></div>
  {/if}
</div>

<style>
  .disc {
    background: repeating-radial-gradient(
      circle,
      var(--panel-2) 0 1px,
      var(--bg) 1px 3px
    );
    box-shadow: 0 0 0 1px var(--rule);
  }
  /* The spindle hole. */
  .disc::after {
    content: "";
    position: absolute;
    inset: calc(50% - 3px);
    border-radius: 50%;
    background: var(--bg);
    z-index: 1;
  }
</style>
