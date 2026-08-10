import Expo from "$lib/components/icons/expo.svelte";
import Hono from "$lib/components/icons/hono.svelte";
import type { Job, Link, Work } from "$lib/types";

export const site = {
  name: "Orhan Tugrul Sahin",
  role: "Software Engineer",
  location: "Istanbul",
  timeZone: "Europe/Istanbul",
  email: "hello@orhantugrul.dev",
  url: "https://orhantugrul.dev",
  description:
    "Software engineer building courier operations software at Paket Mutfak",
  available: false,
};

/** The one thing worth showing. Three surfaces, one product. */
export const kurye: Work = {
  title: "Kurye",
  meta: [
    { label: "Expo", icon: Expo },
    { label: "Hono", icon: Hono },
  ],
  summary:
    "Courier operations for Paket Mutfak, end to end. Couriers work their " +
    "shift in the app: a live map, the orders assigned to them, and batched " +
    "drop-offs tracked to completion.",
  detail:
    "A second build puts the same job on the PAVO N86 terminals they " +
    "already carry, so card payments happen at the door. Both talk to one " +
    "service that owns dispatch and delivery state and pushes every update " +
    "back to the phone.",
};

/** Newest first. Renders as "{period} · {location}" under each role. */
export const jobs: Job[] = [
  {
    role: "Software Engineer",
    company: "Paket Mutfak",
    period: "2025-Now",
    location: "Remote",
  },
  {
    role: "Software Engineer",
    company: "ITServ Technology",
    period: "2023-2025",
    location: "Remote",
  },
  {
    role: "Software Engineer",
    company: "Yapı Kredi Leasing",
    period: "2022-2023",
    location: "Remote",
  },
  {
    role: "Software Engineer",
    company: "Linktera",
    period: "2021-2022",
    location: "Remote",
  },
];

/** The two that actually matter. First one carries the emphasis. */
export const actions: Link[] = [
  {
    label: "Chit chat with me",
    href: "https://cal.com/orhantugrul/chitchat",
    external: true,
    primary: true,
  },
  { label: "Email me", href: `mailto:${site.email}` },
];

export const elsewhere: Link[] = [
  { label: "GitHub", href: "https://github.com/orhantugrul", external: true },
  { label: "Twitter", href: "https://x.com/orhantuurul", external: true },
  {
    label: "Slopin",
    href: "https://www.linkedin.com/in/orhantugrulsahin",
    external: true,
  },
];

/** Hour ranges are Istanbul local; the footer picks the first match. */
export const clockQuips: [hour: number, quip: string][] = [
  [5, "asleep, probably"],
  [8, "too early to be awake"],
  [12, "first coffee"],
  [14, "lunch, allegedly"],
  [18, "deep in a debugger"],
  [22, "side project hours"],
  [24, "should be asleep"],
];
