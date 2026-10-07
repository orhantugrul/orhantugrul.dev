<script lang="ts">
  import PaketMutfakIcon from "$lib/components/icons/paket-mutfak.svelte";
  import Link from "$lib/components/link.svelte";
  import Navigation from "$lib/components/navigation.svelte";
  import Dither from "./dither.svelte";
</script>

<header class="relative overflow-hidden border-b border-border">
  <Dither />
  <div class="relative z-2 flex min-h-120 flex-col px-8 md:min-h-128">
    <div class="flex h-16 shrink-0 items-center justify-end">
      <Navigation />
    </div>
    <div class="flex flex-1 flex-col justify-center pb-12 md:pb-16">
      <h1 class="text-2xl font-medium sm:text-3xl">Orhan Tugrul</h1>
      <p class="mt-1.5 text-sm text-muted-foreground">
        Software engineer in Istanbul
      </p>
      <div class="mt-8 max-w-lg space-y-4 text-pretty text-muted-foreground">
        <p>
          I build software at <Link
            href="https://paketmutfak.com.tr/?ref=orhantugrul.dev"
            class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
          >
            <PaketMutfakIcon class="inline size-[0.95em] align-[-0.12em]" />
            <span
              class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
            >
              Paket Mutfak
            </span>
          </Link>, from the app a courier holds at the door to the service
          behind it that keeps dispatch, orders and payments in step.
        </p>
        <p>Before this, treasury and leasing systems for banks.</p>
      </div>
      <p class="mt-8 max-w-lg text-sm text-pretty text-muted-foreground">
        If that sounds familiar, <Link
          href="https://cal.com/orhantugrul/chitchat"
          class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
        >
          <span
            class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
          >
            book a chat
          </span>
        </Link>
        or
        <Link
          href="mailto:hello@orhantugrul.dev"
          class="group font-medium whitespace-nowrap text-foreground opacity-80 transition hover:opacity-100"
        >
          <span
            class="underline decoration-foreground/40 decoration-1 underline-offset-4 transition-colors group-hover:decoration-foreground"
          >
            say hello
          </span>
        </Link>.
      </p>
    </div>
  </div>
</header>
