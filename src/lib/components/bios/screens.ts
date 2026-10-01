import { resolve } from "$app/paths";
import type { Line, Screen, Span } from "./terminal";

export type Visit = { path: string; columns: number; touch: boolean };

/** Boot devices in priority order; the missing page is always last. */
export function devices(path: string) {
  return [
    { name: "Home", href: resolve("/") },
    { name: "Writing", href: resolve("/writing") },
    { name: path, href: null },
  ];
}
export const DEVICE_ROW = 5;

// When each part of the self-test appears, in ms from power-on. Drives spin
// from one mark to the next; the missing page spins longest.
const SCHEDULE = {
  header: 300,
  processor: 900,
  memory: 1150,
  memoryReady: 2050,
  drives: 2550,
  primary: 3050,
  secondary: 3450,
  tertiary: 5050,
  prompt: 5750,
};
export const TEST_DONE = SCHEDULE.prompt;

/** Shortens from the middle so both ends of a path stay readable. */
const fit = (value: string, width: number) =>
  value.length <= width
    ? value
    : value.slice(0, Math.ceil((width - 1) / 2)) +
      "…" +
      value.slice(value.length - Math.floor((width - 1) / 2));

const text = (text: string, color?: Span["color"]): Line => ({
  spans: [{ text, color }],
});

/** A BIOS ID string: today's date and a hash of the missing path. */
const stamp = (path: string) => {
  const hash = [...path]
    .reduce(
      (hash, character) =>
        Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0,
      2166136261
    )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0");
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}-OTS-404-${hash}`;
};

/** The power-on self-test as it looks `elapsed` ms in; Infinity is the finished
    screen waiting at its prompt. */
export function selftest(
  elapsed: number,
  { path, columns, touch }: Visit
): Screen {
  const lines: Line[] = [];
  if (elapsed < SCHEDULE.header) return { lines };

  lines[0] = text("orhantugrul.dev BIOS v4.04");
  lines[1] = text("(C) 1996-2026 Orhan Tugrul Sahin", "muted-foreground");
  if (elapsed >= SCHEDULE.processor) {
    lines[3] = {
      spans: [
        { text: "Processor : ", color: "muted-foreground" },
        { text: "Curiosity @ 4.04 GHz" },
      ],
    };
  }
  if (elapsed >= SCHEDULE.memory) {
    const progress = Math.min(
      1,
      (elapsed - SCHEDULE.memory) / (SCHEDULE.memoryReady - SCHEDULE.memory)
    );
    lines[4] = {
      spans: [
        { text: "Memory    : ", color: "muted-foreground" },
        {
          text:
            progress < 1 ? `${Math.floor(progress * 32) * 2048}K` : "65536K OK",
        },
      ],
    };
  }
  if (elapsed >= SCHEDULE.drives)
    lines[6] = text("Detecting drives ...", "muted-foreground");

  const drive = (
    row: number,
    name: string,
    from: number,
    to: number,
    found: Span[]
  ) => {
    if (elapsed < from) return;
    const spin: Span = {
      text: "|/-\\"[Math.floor(elapsed / 90) % 4],
      color: "muted-foreground",
    };
    lines[row] = {
      spans: [
        { text: `  ${name.padEnd(10)}`, color: "muted-foreground" },
        ...(elapsed < to ? [spin] : found),
      ],
    };
  };
  drive(7, "Primary", SCHEDULE.drives, SCHEDULE.primary, [
    { text: "orhantugrul.dev" },
  ]);
  drive(8, "Secondary", SCHEDULE.primary, SCHEDULE.secondary, [
    { text: "/writing" },
  ]);
  drive(9, "Tertiary", SCHEDULE.secondary, SCHEDULE.tertiary, [
    { text: fit(path, columns - 22) },
    { text: " not found", color: "destructive" },
  ]);

  const done = elapsed >= SCHEDULE.prompt;
  if (done) {
    lines[11] = text("Page not found.");
    lines[12] = {
      spans: touch
        ? [
            { text: "Tap" },
            { text: " to continue, ", color: "muted-foreground" },
            { text: "hold" },
            { text: " to enter setup", color: "muted-foreground" },
          ]
        : [
            { text: "Press ", color: "muted-foreground" },
            { text: "ENTER" },
            { text: " to continue, ", color: "muted-foreground" },
            { text: "ESC" },
            { text: " to enter setup", color: "muted-foreground" },
          ],
    };
  }
  return {
    lines,
    footer: text(stamp(path), "subtle-foreground"),
    logo: true,
    cursor: done ? [13, 0] : undefined,
  };
}

export function setup(
  { path, columns, touch }: Visit,
  selected: number,
  failed: boolean
): Screen {
  const title = "CMOS Setup Utility";
  const lines: Line[] = [];
  lines[0] = {
    spans: [{ text: title.padStart((columns + title.length) >> 1) }],
    fill: "muted",
  };
  lines[2] = text("Boot priority");
  lines[3] = text("Choose where to start.", "muted-foreground");
  devices(path).forEach((device, index) => {
    const highlighted = index === selected;
    lines[DEVICE_ROW + index] = {
      spans: [
        {
          text: `  ${index + 1}  ${fit(device.name, columns - 18)}`,
          color: highlighted ? "background" : "foreground",
        },
        {
          text: device.href ? "ready  " : "not found  ",
          color: highlighted
            ? "background"
            : device.href
              ? "muted-foreground"
              : "destructive",
          right: true,
        },
      ],
      fill: highlighted ? "primary" : undefined,
    };
  });
  if (failed) {
    lines[9] = text(
      `Boot failed: ${fit(path, columns - 28)} is empty.`,
      "destructive"
    );
    lines[10] = text("Nothing broke. Pick another device.", "muted-foreground");
  }
  return {
    lines,
    footer: {
      spans: [
        {
          text: touch
            ? " Tap a device to boot from it"
            : " ↑↓ Select   Enter Boot   Esc Back",
        },
      ],
      fill: "muted",
    },
  };
}

export function booting(name: string): Screen {
  return { lines: [text(`Booting from ${name} ...`)], cursor: [1, 0] };
}
