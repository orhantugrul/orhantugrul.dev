/**
 * Share cards: one 1200 × 630 PNG per page, drawn before every build.
 *
 *   bun scripts/og.ts   → static/og/home.png, writing.png, playlists.png,
 *                         writing-<slug>.png
 *
 * The background is the header's caustics, computed here with the same shader
 * math and Bayer dither, so a shared link looks like the page it opens. Text
 * is set in the site's own Geist, rendered by resvg with no system fonts.
 */
import { Resvg } from "@resvg/resvg-js";
import { encode } from "fast-png";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const W = 1200;
const H = 630;
// Dot size, in card pixels: the header's 2px cells, doubled for a 2x card.
const CELL = 3;
const OUT = "static/og";
const FONTS = "src/lib/og";
const WRITINGS = "src/lib/writings";

// The dark theme's tokens. Previews are shown small, so the dots sit a step
// brighter than the header's faint ink or they vanish in a feed.
const BG = [0x0b, 0x0c, 0x0e];
const DOT = [0x6c, 0x6f, 0x76];

const bayer = (x: number, y: number) => {
  const b2 = (a: number, b: number) => ((a % 2) / 2 + (b % 2) * 0.75) % 1;
  return (b2(x >> 2, y >> 2) * 0.25 + b2(x >> 1, y >> 1)) * 0.25 + b2(x, y);
};

/** The header's caustics at one cell, 0..1 (see components/dither.svelte). */
function caustic(u: number, v: number, aspect: number, seconds: number) {
  // Larger than on the page, so the filaments survive a thumbnail.
  const px = u * aspect * 6.28318 * 0.6 - 250;
  const py = v * 6.28318 * 0.6 - 250;
  const time = seconds * 0.22 + 23;
  let ix = px;
  let iy = py;
  let c = 1;
  const inten = 0.005;
  for (let n = 0; n < 5; n++) {
    const t = time * (1 - 3.5 / (n + 1));
    const nx = px + Math.cos(t - ix) + Math.sin(t + iy);
    const ny = py + Math.sin(t - iy) + Math.cos(t + ix);
    ix = nx;
    iy = ny;
    c +=
      1 /
      Math.hypot(
        px / (Math.sin(ix + t) / inten),
        py / (Math.cos(iy + t) / inten)
      );
  }
  c /= 5;
  c = 1.17 - Math.pow(c, 1.4);
  return Math.min(1, Math.max(0, Math.pow(Math.abs(c), 8) * 2));
}

/** The dotted background as a PNG data URI. Each card gets its own moment. */
function background(seed: number) {
  const cols = Math.ceil(W / CELL);
  const rows = Math.ceil(H / CELL);
  const aspect = cols / rows;
  const data = new Uint8Array(W * H * 4);
  for (let i = 0; i < W * H; i++) data.set([...BG, 255], i * 4);
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const u = i / cols;
      const v = 1 - j / rows;
      // Thins toward the text on the left, like the header, a bit more so.
      const ramp = 0.12 + 0.88 * Math.pow(u, 1.4);
      if (caustic(u, v, aspect, 40 + seed * 17) * ramp <= bayer(i % 8, j % 8))
        continue;
      for (let y = j * CELL; y < Math.min(H, j * CELL + CELL - 1); y++)
        for (let x = i * CELL; x < Math.min(W, i * CELL + CELL - 1); x++)
          data.set([...DOT, 255], (y * W + x) * 4);
    }
  const png = encode({ width: W, height: H, data, channels: 4 });
  return `data:image/png;base64,${Buffer.from(png).toString("base64")}`;
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Greedy wrap by an average glyph width; titles are short enough for that. */
function wrap(text: string, size: number, width: number, maxLines: number) {
  const perLine = Math.floor(width / (size * 0.5));
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && (line + " " + word).length > perLine) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "…");
  }
  return lines;
}

type Card = {
  file: string;
  title: string;
  subtitle: string;
  meta?: string;
  seed: number;
};

function render({ title, subtitle, meta, seed }: Card) {
  const x = 72;
  const size = title.length > 30 ? 56 : 68;
  const lines = wrap(title, size, 760, 3);
  const titleTop = H - 150 - (lines.length - 1) * size * 1.08;
  const tspans = lines
    .map(
      (l, i) =>
        `<tspan x="${x}" dy="${i ? size * 1.08 : 0}">${escape(l)}</tspan>`
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <image href="${background(seed)}" width="${W}" height="${H}"/>
  <text x="${x}" y="84" font-family="Geist Mono" font-size="20" letter-spacing="0.6" fill="#5c5f66">orhantugrul.dev</text>
  <text x="${x}" y="${titleTop}" font-family="Geist" font-weight="500" font-size="${size}" letter-spacing="${-size * 0.04}" fill="#e8e8e6">${tspans}</text>
  <text x="${x}" y="${H - 86}" font-family="Geist" font-size="27" letter-spacing="-0.3" fill="#8b8e94">${escape(subtitle)}</text>
  ${meta ? `<text x="${x}" y="${H - 44}" font-family="Geist Mono" font-size="18" letter-spacing="0.6" fill="#5c5f66">${escape(meta)}</text>` : ""}
</svg>`;
  const resvg = new Resvg(svg, {
    font: {
      fontFiles: readdirSync(FONTS)
        .filter((f) => f.endsWith(".ttf"))
        .map((f) => `${FONTS}/${f}`),
      loadSystemFonts: false,
      defaultFontFamily: "Geist",
    },
  });
  return resvg.render().asPng();
}

/** Frontmatter fields a card needs, read without pulling in mdsvex. */
function writings() {
  let files: string[];
  try {
    files = readdirSync(WRITINGS).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files.map((file) => {
    const text = readFileSync(`${WRITINGS}/${file}`, "utf8");
    const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const field = (key: string) =>
      front.match(new RegExp(`^${key}:\\s*["']?(.*?)["']?\\s*$`, "m"))?.[1] ??
      "";
    const words = text.slice(front.length).split(/\s+/).filter(Boolean).length;
    return {
      slug: file.replace(/\.md$/, ""),
      title: field("title"),
      description: field("description"),
      date: field("date").slice(0, 10),
      minutes: Math.max(1, Math.ceil(words / 238)),
    };
  });
}

const posts = writings();
const cards: Card[] = [
  {
    file: "home.png",
    title: "Hi, I’m Orhan",
    subtitle: "Software engineer in Istanbul",
    seed: 0,
  },
  {
    file: "writing.png",
    title: "Things I wrote",
    subtitle: "Notes on building products and the decisions behind them",
    meta: posts.length
      ? `~/writing · ${posts.length} ${posts.length === 1 ? "post" : "posts"}`
      : "~/writing",
    seed: 1,
  },
  {
    file: "playlists.png",
    title: "Playlists",
    subtitle: "Playlists I made, pressed like records",
    meta: "~/playlists",
    seed: 1,
  },
  ...posts.map((p, i) => ({
    file: `writing-${p.slug}.png`,
    title: p.title,
    subtitle: p.description,
    meta: `${p.date} · ${p.minutes} min read`,
    seed: i + 2,
  })),
];

mkdirSync(OUT, { recursive: true });
for (const card of cards) writeFileSync(`${OUT}/${card.file}`, render(card));
console.log(`og: ${cards.length} cards → ${OUT}`);
