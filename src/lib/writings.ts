import type { Writing, WritingMetadata } from "$lib/types";
import type { Component } from "svelte";

/** Slug comes off the filename, so no writing declares its own. */
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

/** Lazy, so a writing's content is a chunk that loads when it is opened. */
const content = new Map(
  Object.entries(
    import.meta.glob<{ default: Component; metadata: WritingMetadata }>(
      "./writings/*.md"
    )
  ).map(([path, load]) => [slugOf(path), load])
);

/** Newest first, resolved at build time — every page can just import it. */
export const writings: Writing[] = Object.entries(frontmatter)
  .map(([path, metadata]) => ({ ...metadata, slug: slugOf(path) }))
  .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

/**
 * Undefined when nothing owns that slug. Callers turn that into a 404, which
 * keeps a genuine failure inside a writing module a 500 with its own stack.
 */
export function findWriting(slug: string) {
  return content.get(slug);
}
