import type { Component } from "svelte";

export type Job = {
  role: string;
  company: string;
  period?: string;
  location?: string;
};

export type Badge = {
  label: string;
  icon?: Component<{ class?: string }>;
};

/** A shipped thing, not a job. Meta renders as a small kicker line. */
export type Work = {
  title: string;
  summary: string;
  detail?: string;
  meta?: Badge[];
  href?: string;
};

export type Link = {
  label: string;
  href: string;
  external?: boolean;
  /** Carries the emphasis in its group. */
  primary?: boolean;
};

export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
};

export type Post = PostMetadata & { slug: string };
