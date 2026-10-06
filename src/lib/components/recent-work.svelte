<script lang="ts">
  import kuryeDark from "$lib/assets/kurye-dark.webp";
  import kuryeLight from "$lib/assets/kurye.webp";
  import BunIcon from "$lib/components/icons/bun.svelte";
  import ExpoIcon from "$lib/components/icons/expo.svelte";
  import HonoIcon from "$lib/components/icons/hono.svelte";
  import PostgreSQLIcon from "$lib/components/icons/postgresql.svelte";
  import Link from "$lib/components/link.svelte";

  const alt =
    "The Kurye courier app mid-shift: a live delivery map above a sheet showing delivery progress, the queued orders, and the current drop-off.";
</script>

<section class="border-b border-border px-8 py-12">
  <h2
    class="mb-8 font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
  >
    Recent work
  </h2>
  <div class="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-14">
    <div class="space-y-4 text-pretty text-muted-foreground">
      <div>
        <h3 class="text-xl font-medium text-foreground">Kurye</h3>
        <p class="font-mono text-xs text-subtle-foreground">
          Courier app · Paket Mutfak
        </p>
      </div>
      <p>
        <strong class="font-medium text-foreground">
          One screen for the shift.
        </strong>
        The orders assigned to the courier, the route between them, and what is left
        of the batch.
      </p>
      <p>
        <strong class="font-medium text-foreground">
          No waiting at the door.
        </strong>
        Card payments go to the terminal the courier already carries, with the order
        attached, and the app moves on while the card clears.
      </p>
      <p>
        <strong class="font-medium text-foreground">Right every time.</strong>
        If a terminal drops mid-payment, the system checks what actually happened
        instead of guessing. No double charges, no missing money.
      </p>
      <p>
        <strong class="font-medium text-foreground">
          A small stack that scales.
        </strong>
        The courier app and the card-terminal app are both built with
        <Link
          href="https://expo.dev"
          class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
        >
          <ExpoIcon class="inline size-[0.95em] align-[-0.12em]" />
          <span
            class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
          >
            Expo
          </span>
        </Link>, sharing code with an API built on
        <Link
          href="https://hono.dev"
          class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
        >
          <HonoIcon class="inline size-[0.95em] align-[-0.12em]" />
          <span
            class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
          >
            Hono
          </span>
        </Link>, running on
        <Link
          href="https://bun.sh"
          class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
        >
          <BunIcon class="inline size-[0.95em] align-[-0.12em]" />
          <span
            class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
          >
            Bun
          </span>
        </Link>
        with
        <Link
          href="https://www.postgresql.org"
          class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
        >
          <PostgreSQLIcon class="inline size-[0.95em] align-[-0.12em]" />
          <span
            class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
          >
            Postgres
          </span>
        </Link> underneath.
      </p>
    </div>
    <div class="justify-self-center">
      <img
        class="w-55 light:hidden"
        src={kuryeDark}
        {alt}
        width="739"
        height="1510"
        loading="lazy"
      />
      <img
        class="hidden w-55 light:block"
        src={kuryeLight}
        {alt}
        width="739"
        height="1510"
        loading="lazy"
      />
    </div>
  </div>
</section>
