<script lang="ts">
  import { ArrowUpRight } from "@lucide/svelte";
  import Itoc360Icon from "$lib/components/icons/itoc360.svelte";
  import PaketMutfakIcon from "$lib/components/icons/paket-mutfak.svelte";
  import SpinexIcon from "$lib/components/icons/spinex.svelte";
  import YapiKrediIcon from "$lib/components/icons/yapi-kredi.svelte";
  import Link from "$lib/components/link.svelte";

  const experiences = [
    {
      period: "Now",
      role: "Software Engineer",
      company: "Paket Mutfak",
      icon: PaketMutfakIcon,
      href: "https://paketmutfak.com.tr/?ref=orhantugrul.dev",
    },
    {
      period: "2024",
      role: "Software Engineer",
      company: "ITOC360",
      icon: Itoc360Icon,
      href: "https://www.itoc360.com/",
    },
    {
      period: "2023",
      role: "Software Engineer",
      company: "Yapı Kredi Leasing",
      icon: YapiKrediIcon,
      href: "https://www.ykleasing.com.tr/",
    },
    {
      period: "2021",
      role: "Software Engineer",
      company: "SpineX",
      icon: SpinexIcon,
      href: "https://www.thespinex.com/",
    },
  ] as const;
</script>

<section class="border-b border-border px-8 py-12">
  <h2
    class="mb-8 font-mono text-2xs font-medium tracking-widest text-subtle-foreground uppercase"
  >
    Experience
  </h2>
  <ul class="space-y-1">
    {#each experiences as { period, role, company, href, icon: Icon } (company)}
      <li>
        <Link
          {href}
          class="group grid grid-cols-[1.5rem_9.5em_minmax(0,1fr)_auto_0.875rem] items-center gap-3 py-2.5 opacity-80 transition hover:opacity-100 max-sm:grid-cols-[1.5rem_minmax(0,1fr)_auto_0.875rem] max-sm:gap-y-0"
        >
          <span
            class="flex h-5 items-center text-subtle-foreground transition-colors group-hover:text-foreground"
          >
            <Icon class="size-4" />
          </span>
          <span class="truncate font-medium text-foreground max-sm:col-start-2">
            {company}
          </span>
          <span
            class="truncate text-muted-foreground max-sm:col-start-2 max-sm:row-start-2"
          >
            {role}
          </span>
          <span
            class="font-mono text-xs whitespace-nowrap text-subtle-foreground max-sm:col-start-3 max-sm:row-start-1"
          >
            {period}
          </span>
          <ArrowUpRight
            class="-col-end-1 row-start-1 size-3.5 text-subtle-foreground transition-colors group-hover:text-foreground"
          />
        </Link>
      </li>
    {/each}
  </ul>
</section>
