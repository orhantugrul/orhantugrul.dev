export type WritingMetadata = {
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
};

export type Writing = WritingMetadata & {
  slug: string;
};

export type NowPlaying = {
  state: "playing" | "paused" | "offline";
  track: string;
  artist: string;
  album: string;
  cover: string | null;
  url: string;
  /** Track length, in ms. */
  length: number;
  /** Playhead when `sampledAt` was sampled, in ms. */
  progress: number;
  /** Epoch ms: when progress was read, or when an offline track last played. */
  sampledAt: number;
};

export type Playlist = {
  /** Catalogue number, counting from the oldest playlist. */
  number: number;
  title: string;
  /** The playlist's description on Spotify, as plain text. */
  note: string;
  url: string;
  /** ISO dates of the first and the latest track added. */
  started: string;
  updated: string;
  tracks: number;
};
