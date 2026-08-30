export type Link = {
  label: string;
  href: string;
  primary?: boolean;
};

export type WritingMetadata = {
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
};

export type Writing = WritingMetadata & { slug: string };
