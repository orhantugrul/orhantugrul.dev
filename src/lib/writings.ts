import type { Component } from "svelte";
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

const content = new Map(
  Object.entries(
    import.meta.glob<{ default: Component; metadata: WritingMetadata }>(
      "./writings/*.md"
    )
  ).map(([path, load]) => [slugOf(path), load])
);

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

/**
 * Undefined when nothing owns that slug. Callers turn that into a 404, which
 * keeps a genuine failure inside a writing module a 500 with its own stack.
 */
export function findWriting(slug: string) {
  return content.get(slug);
}
