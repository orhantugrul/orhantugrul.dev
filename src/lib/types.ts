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

/** One public playlist, read from Spotify when the site is built. */
export type Playlist = {
  slug: string;
  /** Catalogue number, counting from the oldest playlist. */
  number: number;
  title: string;
  /** The playlist's description on Spotify, as plain text. */
  note: string;
  cover: string | null;
  url: string;
  /** ISO dates of the first and the latest track added. */
  started: string;
  updated: string;
  tracks: PlaylistTrack[];
};

export type PlaylistTrack = {
  title: string;
  artist: string;
  /** In ms. */
  length: number;
  url: string;
};
