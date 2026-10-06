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
