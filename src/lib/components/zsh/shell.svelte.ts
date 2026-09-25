import { dirOf } from "./fs";

/* The interpreter behind the 404 terminal. Owns the scrollback and the
   session state; knows nothing about the DOM. The component feeds it typed
   lines and keys, and renders `lines`, `cwd` and `mode`. */

export type Line = { kind: "cmd" | "out"; text: string; href?: string };
export type Mode = null | "vim" | "sudo" | "cat";
export type Command = (sh: Shell, arg: string, parts: string[]) => void;

const SCROLLBACK = 120;

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** `Mon Sep  8 14:03:22`, the way macOS prints it. */
export function macDate(d: Date) {
  const D = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const M = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  const day = d.getDate();
  return (
    `${D[d.getDay()]} ${M[d.getMonth()]} ${day < 10 ? " " : ""}${day} ` +
    `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
  );
}

export class Shell {
  lines = $state<Line[]>([]);
  cwd = $state("~");
  mode = $state<Mode>(null);

  readonly history: string[] = [];
  readonly boot = Date.now();
  private hi = 0;
  private vimStray = 0;
  private sudoTries = 0;
  private ping: {
    host: string;
    ip: string;
    seq: number;
    times: number[];
  } | null = null;
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(
    /** The path the visitor asked for, without its leading slash. */
    readonly requested: string,
    private commands: Record<string, Command>
  ) {
    /* the session you walked in on — server-rendered, so it's there without JS */
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- formatted once, never mutated
    const now = new Date();
    this.lines = [
      { kind: "out", text: `Last login: ${macDate(now)} on ttys001` },
      { kind: "cmd", text: `guest@orhantugrul ~ % cat ${requested}` },
      {
        kind: "out",
        text: `cat: ${requested}: No such file or directory · 404`,
      },
    ];
  }

  prompt() {
    return `guest@orhantugrul ${this.cwd} %`;
  }

  out(text: string, href?: string) {
    this.print({ kind: "out", text, href });
  }
  private print(line: Line) {
    this.lines.push(line);
    if (this.lines.length > SCROLLBACK)
      this.lines.splice(0, this.lines.length - SCROLLBACK);
  }
  /* clear wipes everything — the walked-in-on session included */
  clear() {
    this.lines = [];
  }
  later(fn: () => void, ms: number) {
    this.timers.push(setTimeout(fn, ms));
  }
  enter(mode: Mode) {
    this.mode = mode;
    this.vimStray = 0;
    this.sudoTries = 0;
  }
  dispose() {
    this.timers.forEach(clearTimeout);
  }

  /** A line the visitor entered, routed through whichever mode is active. */
  submit(val: string) {
    if (this.mode === "vim") return this.vimLine(val);
    if (this.mode === "sudo") return this.sudoLine();
    if (this.mode === "cat") {
      this.out(val);
      this.out(val);
      return;
    }
    if (val.trim()) this.history.push(val);
    this.hi = this.history.length;
    this.exec(val);
  }

  private exec(raw: string) {
    const line = raw.trim();
    this.print({ kind: "cmd", text: `${this.prompt()} ${line}` });
    if (!line) return;
    const parts = line.split(/\s+/);
    const name = parts[0].toLowerCase();
    const command = this.commands[name];
    if (command) command(this, parts.slice(1).join(" "), parts);
    else this.out(`zsh: command not found: ${name}`);
  }

  private vimLine(val: string) {
    if ([":q", ":q!", ":wq", "ZZ"].includes(val)) {
      this.mode = null;
      this.out(val === ":wq" ? "written nowhere. quit." : "quit.");
      return;
    }
    this.out(val || "~");
    if (++this.vimStray === 3) this.out("-- INSERT -- (:q gets you out)");
  }

  private sudoLine() {
    if (++this.sudoTries >= 3) {
      this.mode = null;
      this.out("sudo: 3 incorrect password attempts");
      return;
    }
    this.out("Sorry, try again.");
    this.out("Password:");
  }

  /** ^C. Returns false when the typed line should survive (vim keeps it). */
  interrupt(typed: string): boolean {
    if (this.ping) {
      this.stopPing();
      return true;
    }
    if (this.mode === "vim") {
      this.out("Type :q and press ⏎ to quit vim");
      return false;
    }
    if (this.mode) {
      this.mode = null;
      this.out("^C");
      return true;
    }
    this.print({ kind: "cmd", text: `${this.prompt()} ${typed}^C` });
    return true;
  }

  /** Tab. Returns the completed line, or nothing after listing candidates. */
  complete(val: string): string | undefined {
    if (this.mode) return;
    const sp = val.lastIndexOf(" ");
    const tok = val.slice(sp + 1);
    if (!tok) return;
    let pool: string[];
    if (sp < 0) pool = Object.keys(this.commands);
    else {
      const d = dirOf(this.cwd)!;
      pool = d.dirs
        .map((x) => x + "/")
        .concat(
          Object.keys(d.files).filter((f) => f[0] !== "." || tok[0] === ".")
        );
    }
    const hits = pool.filter((c) => c.startsWith(tok));
    if (hits.length === 1)
      return (
        val.slice(0, sp + 1) + hits[0] + (hits[0].endsWith("/") ? "" : " ")
      );
    if (hits.length > 1) this.out(hits.join("   "));
  }

  historyUp(): string | undefined {
    if (this.mode || this.hi === 0) return;
    return this.history[--this.hi];
  }
  historyDown(): string | undefined {
    if (this.mode) return;
    if (this.hi < this.history.length - 1) return this.history[++this.hi];
    this.hi = this.history.length;
    return "";
  }

  /* ping runs until ^C, then prints the statistics macOS would */
  startPing(host: string, ip: string) {
    this.ping = { host, ip, seq: 0, times: [] };
    this.out(`PING ${host} (${ip}): 56 data bytes`);
    this.pingTick();
  }
  private pingTick() {
    if (!this.ping) return;
    const t = 8 + Math.random() * 20;
    this.ping.times.push(t);
    this.out(
      `64 bytes from ${this.ping.ip}: icmp_seq=${this.ping.seq++} ttl=56 time=${t.toFixed(3)} ms`
    );
    this.later(() => this.pingTick(), 1000);
  }
  private stopPing() {
    if (!this.ping) return;
    const { host, times } = this.ping;
    const min = Math.min(...times);
    const max = Math.max(...times);
    const avg = times.reduce((s, x) => s + x, 0) / times.length;
    this.out("^C");
    this.out(`--- ${host} ping statistics ---`);
    this.out(
      `${times.length} packets transmitted, ${times.length} packets received, 0.0% packet loss`
    );
    this.out(
      `round-trip min/avg/max = ${min.toFixed(3)}/${avg.toFixed(3)}/${max.toFixed(3)} ms`
    );
    this.ping = null;
  }
}
