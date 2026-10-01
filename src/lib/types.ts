export type WritingMetadata = {
  title: string;
  description: string;
  date: string;
  readingTime: number;
};

export type Writing = WritingMetadata & {
  slug: string;
};

export type NowPlaying = {
  state: "playing" | "paused" | "offline";
  track: string;
  length: number;
  progress: number;
  sampledAt: number;
};

export type Playlist = {
  number: number;
  title: string;
  note: string;
  url: `https://${string}`;
  started: string;
  updated: string;
  tracks: number;
};
