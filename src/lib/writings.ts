import type { Writing, WritingMetadata } from "$lib/types";

function slugOf(path: string): string {
  return path.split("/").pop()!.replace(".md", "");
}

/**
 * Frontmatter on its own: importing only `metadata` lets the bundler drop the
 * compiled component, so listing writings never pulls in what they say.
 */
const frontmatter = import.meta.glob<WritingMetadata>("./writings/*.md", {
  eager: true,
  import: "metadata",
});

export const writings: Writing[] = Object.entries(frontmatter)
  .map(([path, metadata]) => ({ ...metadata, slug: slugOf(path) }))
  .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

export function published(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
