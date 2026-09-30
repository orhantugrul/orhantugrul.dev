// Phosphor colours are the dark tokens from app.css. A monitor is its own
// light, so it keeps them in either theme.
const COLORS = {
  bg: "#0b0c0e",
  ink: "#e8e8e6",
  dim: "#8b8e94",
  faint: "#5c5f66",
  accent: "#7aa7f2",
  hot: "#e36a52",
};
const BAR = "#1b1e22";

export type Color = keyof typeof COLORS;
/** A run of text; `right` pushes it against the last column. */
export type Span = { text: string; color?: Color; right?: boolean };
export type Line = { spans: Span[]; fill?: "bar" | "accent" };
/** One frame of text. `lines` is indexed by row and may have gaps. */
export type Screen = {
  lines: Line[];
  footer?: Line;
  cursor?: [row: number, col: number];
  logo?: boolean;
};

// The grid is drawn at twice its size so the tube has detail to blur.
const FONT = 40;
const LINE = 60;
const MONO = '"Geist Mono Variable", ui-monospace, monospace';

export const fonts = () =>
  Promise.all([
    document.fonts.load(`500 ${FONT}px ${MONO}`),
    document.fonts.load(`800 ${FONT}px ${MONO}`),
  ]).catch(() => {});

/** A text-mode screen drawn to an offscreen canvas. */
export class Terminal {
  readonly canvas = document.createElement("canvas");
  cols = 0;
  rows = 0;
  private ctx = this.canvas.getContext("2d")!;
  private cell = 0;
  private padX = 0;
  private padY = 0;

  /** Wide screens get the classic 80 columns, phones enough for the longest
      line, and every screen at least 18 rows, keeping the viewport's shape. */
  resize(vw: number, vh: number) {
    this.ctx.font = `500 ${FONT}px ${MONO}`;
    this.cell = this.ctx.measureText("0").width;
    this.padX = this.cell * 4;
    this.padY = LINE * 2;

    let cols = vw >= 900 ? 80 : vw >= 600 ? 64 : 46;
    let w = cols * this.cell + 2 * this.padX;
    let h = (w * vh) / vw;
    let rows = Math.floor((h - 2 * this.padY) / LINE);
    if (rows < 18) {
      rows = 18;
      h = rows * LINE + 2 * this.padY;
      w = (h * vw) / vh;
      cols = Math.floor((w - 2 * this.padX) / this.cell);
    }
    this.canvas.width = Math.round(w);
    this.canvas.height = Math.round(h);
    this.cols = cols;
    this.rows = rows;
  }

  /** The row under a point in the viewport, ignoring the tube's curve. */
  rowAt(y: number, vh: number) {
    return Math.floor(((y / vh) * this.canvas.height - this.padY) / LINE);
  }

  draw({ lines, footer, cursor, logo }: Screen, blink: boolean) {
    const { ctx, cell, padX, padY } = this;
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.font = `500 ${FONT}px ${MONO}`;
    ctx.textBaseline = "middle";
    lines.forEach((line, row) => this.line(line, row));
    if (footer) this.line(footer, this.rows - 1);

    // The favicon mark stands where the Energy Star logo used to.
    if (logo) {
      ctx.font = `800 ${LINE * 2.4}px ${MONO}`;
      ctx.fillStyle = COLORS.ink;
      ctx.textAlign = "right";
      ctx.fillText("o.", padX + this.cols * cell, padY + LINE);
      ctx.textAlign = "left";
    }
    if (cursor && blink) {
      const [row, col] = cursor;
      ctx.fillStyle = COLORS.ink;
      ctx.fillRect(
        padX + col * cell,
        padY + row * LINE + LINE * 0.74,
        cell,
        LINE * 0.1
      );
    }
  }

  private line({ spans, fill }: Line, row: number) {
    const { ctx, cell, padX } = this;
    const y = this.padY + row * LINE;
    if (fill) {
      ctx.fillStyle = fill === "bar" ? BAR : COLORS.accent;
      ctx.fillRect(padX - cell, y, (this.cols + 2) * cell, LINE);
    }
    let col = 0;
    for (const span of spans) {
      if (span.right) col = this.cols - span.text.length;
      ctx.fillStyle = COLORS[span.color ?? "ink"];
      ctx.fillText(
        span.text.slice(0, Math.max(0, this.cols - col)),
        padX + col * cell,
        y + LINE / 2
      );
      col += span.text.length;
    }
  }
}
