export type WritingMetadata = {
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
};

export type Writing = WritingMetadata & { slug: string };

/** What the footer's record shows, as served by `/api/now-playing`. */
export type NowPlaying = {
  state: "playing" | "paused" | "offline";
  track: string;
  artist: string;
  album: string;
  cover: string | null;
  url: string;
  /** Track length, in ms. */
  length: number;
  /** Playhead when `at` was sampled, in ms. */
  progress: number;
  /** Epoch ms: when progress was read, or when an offline track last played. */
  at: number;
};
