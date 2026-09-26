import type { NowPlaying } from "$lib/types";

const POLL = 30_000;

/** What Spotify is playing, for the Connect row. Polls only while used. */
class Player {
  data = $state<NowPlaying | null>(null);
  now = $state(Date.now());

  position = $derived(
    this.data
      ? Math.min(
          this.data.length,
          this.data.state === "playing"
            ? this.data.progress + (this.now - this.data.at)
            : this.data.progress
        )
      : 0
  );

  #users = 0;
  #loading = false;
  #stop: (() => void) | undefined;

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

  /** Polls while at least one component uses it; returns the release. */
  use() {
    if (this.#users++ === 0) {
      this.load();
      const poll = setInterval(() => document.hidden || this.load(), POLL);
      const clock = setInterval(() => {
        this.now = Date.now();
        // The song ran out before the next poll: ask what came after it.
        if (this.data?.state === "playing" && this.position >= this.data.length)
          this.load();
      }, 1000);
      this.#stop = () => {
        clearInterval(poll);
        clearInterval(clock);
      };
    }
    return () => {
      if (--this.#users === 0) this.#stop?.();
    };
  }
}

export const player = new Player();
