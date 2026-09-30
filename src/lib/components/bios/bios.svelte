<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import {
    booting,
    DEVICE_ROW,
    devices,
    selftest,
    setup,
    TEST_DONE,
  } from "./screens";
  import { tube } from "./crt";
  import { fonts, Terminal } from "./terminal";

  /** The path the visitor asked for, without its leading slash. */
  let { path }: { path: string } = $props();

  const bios: Attachment<HTMLCanvasElement> = (canvas) => {
    const missing = "/" + path;
    const list = devices(missing);
    const hrefs = [resolve("/"), resolve("/writing")];
    const motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = matchMedia("(hover: none)").matches;
    const terminal = new Terminal();
    const screen = tube(canvas);

    // Everything on screen follows from these and the clock.
    let mode: "test" | "setup" | "boot" = "test";
    let started = performance.now();
    let selected = 0;
    let failed = false;

    const elapsed = (now: number) => (motion ? now - started : Infinity);
    const waiting = (now: number) =>
      mode === "test" && elapsed(now) >= TEST_DONE;

    const view = (now: number) => {
      const visit = { path: missing, cols: terminal.cols, touch };
      if (mode === "setup") return setup(visit, selected, failed);
      if (mode === "boot") return booting(list[selected].name);
      return selftest(elapsed(now), visit);
    };

    let leaving = 0;
    const boot = (i: number) => {
      selected = i;
      if (!list[i].ready) {
        failed = true;
        return;
      }
      mode = "boot";
      leaving = window.setTimeout(() => goto(hrefs[i]), motion ? 700 : 0);
    };
    const enterSetup = () => {
      mode = "setup";
      failed = false;
    };
    const leaveSetup = () => {
      mode = "test";
      started = -Infinity;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLAnchorElement || mode === "boot") return;
      const now = performance.now();
      if (e.key === "Escape") {
        e.preventDefault();
        if (mode === "setup") leaveSetup();
        else enterSetup();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (mode === "setup") boot(selected);
        else if (waiting(now)) boot(0);
      } else if (
        mode === "setup" &&
        (e.key === "ArrowUp" || e.key === "ArrowDown")
      ) {
        e.preventDefault();
        const n = list.length;
        selected = (selected + (e.key === "ArrowUp" ? n - 1 : 1)) % n;
        failed = false;
      }
    };

    // A tap continues and a long press enters setup; in setup, a tap on a
    // row boots from it.
    let hold = 0;
    let held = false;
    const onDown = () => {
      if (!waiting(performance.now())) return;
      hold = window.setTimeout(() => {
        hold = 0;
        held = true;
        enterSetup();
      }, 600);
    };
    const onUp = (e: PointerEvent) => {
      if (held) {
        held = false;
      } else if (hold) {
        clearTimeout(hold);
        hold = 0;
        boot(0);
      } else if (mode === "setup") {
        const i = terminal.rowAt(e.clientY, innerHeight) - DEVICE_ROW;
        if (i >= 0 && i < list.length) boot(i);
      }
    };

    // A BIOS has no mouse, so the pointer hides until it moves.
    let idle = 0;
    const onMove = () => {
      canvas.style.cursor = "";
      clearTimeout(idle);
      idle = window.setTimeout(() => (canvas.style.cursor = "none"), 1500);
    };

    // The terminal is redrawn only when the frame's content changes; the
    // tube keeps flickering either way.
    let frame = 0;
    let last = "";
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const shown = view(now);
      const blink = Math.floor(now / 530) % 2 === 0;
      const key = JSON.stringify(shown) + blink + terminal.canvas.width;
      const fresh = key !== last;
      if (fresh) {
        terminal.draw(shown, blink);
        last = key;
      }
      screen.draw(terminal.canvas, fresh, now / 1000, motion);
    };

    const resize = () => terminal.resize(innerWidth, innerHeight);
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    canvas.style.cursor = "none";
    addEventListener("keydown", onKey);
    addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointermove", onMove);

    let alive = true;
    fonts().then(() => {
      if (!alive) return;
      resize();
      started = performance.now();
      frame = requestAnimationFrame(tick);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      [hold, idle, leaving].forEach(clearTimeout);
      root.style.overflow = overflow;
      removeEventListener("keydown", onKey);
      removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointermove", onMove);
      screen.dispose();
    };
  };
</script>

<div class="fixed inset-0 z-50 bg-[#030304]">
  <canvas
    {@attach bios}
    class="block size-full touch-none select-none"
    aria-hidden="true"
  ></canvas>
  <div class="sr-only">
    <h1>Page not found</h1>
    <p>/{path} could not be found.</p>
    <a href={resolve("/")}>Continue to the home page</a>
    <a href={resolve("/writing")}>Read the writing</a>
  </div>
</div>
