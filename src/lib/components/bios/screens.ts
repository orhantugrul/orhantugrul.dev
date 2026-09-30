import type { Line, Screen, Span } from "./terminal";

/** What the BIOS knows about the visit. */
export type Visit = { path: string; cols: number; touch: boolean };

/** Boot devices in priority order; the missing page is always last. */
export const devices = (path: string) => [
  { name: "Home", ready: true },
  { name: "Writing", ready: true },
  { name: path, ready: false },
];
/** The setup screen lists the devices from this row down. */
export const DEVICE_ROW = 5;

// When each part of the self-test appears, in ms from power-on. Drives spin
// from one mark to the next; the missing page spins longest.
const AT = {
  header: 300,
  cpu: 900,
  memory: 1150,
  memoryOk: 2050,
  drives: 2550,
  primary: 3050,
  secondary: 3450,
  tertiary: 5050,
  prompt: 5750,
};
export const TEST_DONE = AT.prompt;

/** Shortens from the middle so both ends of a path stay readable. */
const fit = (s: string, n: number) =>
  s.length <= n
    ? s
    : s.slice(0, Math.ceil((n - 1) / 2)) +
      "…" +
      s.slice(s.length - Math.floor((n - 1) / 2));

const text = (text: string, color?: Span["color"]): Line => ({
  spans: [{ text, color }],
});

/** A BIOS ID string: today's date and a hash of the missing path. */
const stamp = (path: string) => {
  const hash = [...path]
    .reduce(
      (h, ch) => Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0,
      2166136261
    )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0");
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}/${d.getFullYear()}-OTS-404-${hash}`;
};

/** The power-on self-test as it looks `t` ms in; Infinity is the finished
    screen waiting at its prompt. */
export function selftest(t: number, { path, cols, touch }: Visit): Screen {
  const lines: Line[] = [];
  if (t < AT.header) return { lines };

  lines[0] = text("orhantugrul.dev BIOS v4.04");
  lines[1] = text("(C) 1996-2026 Orhan Tugrul Sahin", "dim");
  if (t >= AT.cpu) {
    lines[3] = {
      spans: [
        { text: "Processor : ", color: "dim" },
        { text: "Curiosity @ 4.04 GHz" },
      ],
    };
  }
  if (t >= AT.memory) {
    const k = Math.min(1, (t - AT.memory) / (AT.memoryOk - AT.memory));
    lines[4] = {
      spans: [
        { text: "Memory    : ", color: "dim" },
        { text: k < 1 ? `${Math.floor(k * 32) * 2048}K` : "65536K OK" },
      ],
    };
  }
  if (t >= AT.drives) lines[6] = text("Detecting drives ...", "dim");

  const drive = (
    row: number,
    name: string,
    from: number,
    to: number,
    found: Span[]
  ) => {
    if (t < from) return;
    const spin: Span = { text: "|/-\\"[Math.floor(t / 90) % 4], color: "dim" };
    lines[row] = {
      spans: [
        { text: `  ${name.padEnd(10)}`, color: "dim" },
        ...(t < to ? [spin] : found),
      ],
    };
  };
  drive(7, "Primary", AT.drives, AT.primary, [{ text: "orhantugrul.dev" }]);
  drive(8, "Secondary", AT.primary, AT.secondary, [{ text: "/writing" }]);
  drive(9, "Tertiary", AT.secondary, AT.tertiary, [
    { text: fit(path, cols - 22) },
    { text: " not found", color: "hot" },
  ]);

  const done = t >= AT.prompt;
  if (done) {
    lines[11] = text("Page not found.");
    lines[12] = {
      spans: touch
        ? [
            { text: "Tap" },
            { text: " to continue, ", color: "dim" },
            { text: "hold" },
            { text: " to enter setup", color: "dim" },
          ]
        : [
            { text: "Press ", color: "dim" },
            { text: "ENTER" },
            { text: " to continue, ", color: "dim" },
            { text: "ESC" },
            { text: " to enter setup", color: "dim" },
          ],
    };
  }
  return {
    lines,
    footer: text(stamp(path), "faint"),
    logo: true,
    cursor: done ? [13, 0] : undefined,
  };
}

/** The boot menu, with one device highlighted. */
export function setup(
  { path, cols, touch }: Visit,
  selected: number,
  failed: boolean
): Screen {
  const title = "CMOS Setup Utility";
  const lines: Line[] = [];
  lines[0] = {
    spans: [{ text: title.padStart((cols + title.length) >> 1) }],
    fill: "bar",
  };
  lines[2] = text("Boot priority");
  lines[3] = text("Choose where to start.", "dim");
  devices(path).forEach((device, i) => {
    const on = i === selected;
    lines[DEVICE_ROW + i] = {
      spans: [
        {
          text: `  ${i + 1}  ${fit(device.name, cols - 18)}`,
          color: on ? "bg" : "ink",
        },
        {
          text: device.ready ? "ready  " : "not found  ",
          color: on ? "bg" : device.ready ? "dim" : "hot",
          right: true,
        },
      ],
      fill: on ? "accent" : undefined,
    };
  });
  if (failed) {
    lines[9] = text(`Boot failed: ${fit(path, cols - 28)} is empty.`, "hot");
    lines[10] = text("Nothing broke. Pick another device.", "dim");
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
      fill: "bar",
    },
  };
}

export const booting = (name: string): Screen => ({
  lines: [text(`Booting from ${name} ...`)],
  cursor: [1, 0],
});
