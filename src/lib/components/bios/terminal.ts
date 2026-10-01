// Phosphor colours are the dark tokens from app.css, as Tailwind palette
// values. A monitor is its own light, so it keeps them in either theme.
const COLORS = {
  background: "oklch(14.1% 0.005 285.823)", // zinc-950
  foreground: "oklch(92% 0.004 286.32)", // zinc-200
  "muted-foreground": "oklch(70.5% 0.015 286.067)", // zinc-400
  "subtle-foreground": "oklch(44.2% 0.017 285.786)", // zinc-600
  muted: "oklch(21% 0.006 285.885)", // zinc-900
  primary: "oklch(70.7% 0.165 254.624)", // blue-400
  destructive: "oklch(70.4% 0.191 22.216)", // red-400
};

export type Color = keyof typeof COLORS;
/** A run of text; `right` pushes it against the last column. */
export type Span = { text: string; color?: Color; right?: boolean };
export type Line = { spans: Span[]; fill?: Color };
/** One frame of text. `lines` is indexed by row and may have gaps. */
export type Screen = {
  lines: Line[];
  footer?: Line;
  cursor?: [row: number, col: number];
  logo?: boolean;
};

// The grid is drawn at twice its size so the tube has detail to blur.
const FONT_SIZE = 40;
const LINE_HEIGHT = 60;
const FONT_FAMILY = '"Geist Mono Variable", ui-monospace, monospace';

export const fonts = () =>
  Promise.all([
    document.fonts.load(`500 ${FONT_SIZE}px ${FONT_FAMILY}`),
    document.fonts.load(`800 ${FONT_SIZE}px ${FONT_FAMILY}`),
  ]).catch(() => {});

export class Terminal {
  readonly canvas = document.createElement("canvas");
  columns = 0;
  rows = 0;
  private context = this.canvas.getContext("2d")!;
  private cellWidth = 0;
  private paddingX = 0;
  private paddingY = 0;

  /** Wide screens get the classic 80 columns, phones enough for the longest
      line, and every screen at least 18 rows, keeping the viewport's shape. */
  resize(viewportWidth: number, viewportHeight: number) {
    this.context.font = `500 ${FONT_SIZE}px ${FONT_FAMILY}`;
    this.cellWidth = this.context.measureText("0").width;
    this.paddingX = this.cellWidth * 4;
    this.paddingY = LINE_HEIGHT * 2;

    let columns = viewportWidth >= 900 ? 80 : viewportWidth >= 600 ? 64 : 46;
    let width = columns * this.cellWidth + 2 * this.paddingX;
    let height = (width * viewportHeight) / viewportWidth;
    let rows = Math.floor((height - 2 * this.paddingY) / LINE_HEIGHT);
    if (rows < 18) {
      rows = 18;
      height = rows * LINE_HEIGHT + 2 * this.paddingY;
      width = (height * viewportWidth) / viewportHeight;
      columns = Math.floor((width - 2 * this.paddingX) / this.cellWidth);
    }
    this.canvas.width = Math.round(width);
    this.canvas.height = Math.round(height);
    this.columns = columns;
    this.rows = rows;
  }

  /** The row under a point in the viewport, ignoring the tube's curve. */
  rowAt(y: number, viewportHeight: number) {
    return Math.floor(
      ((y / viewportHeight) * this.canvas.height - this.paddingY) / LINE_HEIGHT
    );
  }

  draw({ lines, footer, cursor, logo }: Screen, blink: boolean) {
    const { context, cellWidth, paddingX, paddingY } = this;
    context.fillStyle = COLORS.background;
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    context.font = `500 ${FONT_SIZE}px ${FONT_FAMILY}`;
    context.textBaseline = "middle";
    lines.forEach((line, row) => this.line(line, row));
    if (footer) this.line(footer, this.rows - 1);

    // The favicon mark stands where the Energy Star logo used to.
    if (logo) {
      context.font = `800 ${LINE_HEIGHT * 2.4}px ${FONT_FAMILY}`;
      context.fillStyle = COLORS.foreground;
      context.textAlign = "right";
      context.fillText(
        "o.",
        paddingX + this.columns * cellWidth,
        paddingY + LINE_HEIGHT
      );
      context.textAlign = "left";
    }
    if (cursor && blink) {
      const [row, col] = cursor;
      context.fillStyle = COLORS.foreground;
      context.fillRect(
        paddingX + col * cellWidth,
        paddingY + row * LINE_HEIGHT + LINE_HEIGHT * 0.74,
        cellWidth,
        LINE_HEIGHT * 0.1
      );
    }
  }

  private line({ spans, fill }: Line, row: number) {
    const { context, cellWidth, paddingX } = this;
    const y = this.paddingY + row * LINE_HEIGHT;
    if (fill) {
      context.fillStyle = COLORS[fill];
      context.fillRect(
        paddingX - cellWidth,
        y,
        (this.columns + 2) * cellWidth,
        LINE_HEIGHT
      );
    }
    let col = 0;
    for (const span of spans) {
      if (span.right) col = this.columns - span.text.length;
      context.fillStyle = COLORS[span.color ?? "foreground"];
      context.fillText(
        span.text.slice(0, Math.max(0, this.columns - col)),
        paddingX + col * cellWidth,
        y + LINE_HEIGHT / 2
      );
      col += span.text.length;
    }
  }
}
