import type { NowPlaying } from "$lib/types";

const POLL_INTERVAL = 30_000;

class Player {
  data = $state<NowPlaying | null>(null);

  #loading = false;

  async load() {
    if (this.#loading) return;
    this.#loading = true;
    try {
      const response = await fetch("/api/now-playing");
      // A null answer never replaces a record already on screen.
      const next: NowPlaying | null = response.ok
        ? await response.json()
        : null;
      if (next) this.data = next;
    } catch {
      // Offline or blocked: keep whatever is on screen.
    }
    this.#loading = false;
  }

  /** Polls until the returned cleanup runs. */
  use() {
    this.load();
    const poll = setInterval(
      () => document.hidden || this.load(),
      POLL_INTERVAL
    );
    // The song ran out before the next poll: ask what came after it.
    const songEnd = setInterval(() => {
      const data = this.data;
      if (
        data?.state === "playing" &&
        data.progress + (Date.now() - data.sampledAt) >= data.length
      )
        this.load();
    }, 1000);
    return () => {
      clearInterval(poll);
      clearInterval(songEnd);
    };
  }
}

export const player = new Player();
