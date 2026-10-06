import type { Component } from "svelte";
import type { Post, PostMetadata } from "$lib/types";

function slugOf(path: string): string {
  return path.split("/").pop()!.replace(".md", "");
}

/**
 * Frontmatter on its own: importing only `metadata` lets the bundler drop the
 * compiled component, so listing posts never pulls in what they say.
 */
const frontmatter = import.meta.glob<PostMetadata>("./posts/*.md", {
  eager: true,
  import: "metadata",
});

const content = new Map(
  Object.entries(
    import.meta.glob<{ default: Component; metadata: PostMetadata }>(
      "./posts/*.md",
    ),
  ).map(([path, load]) => [slugOf(path), load]),
);

export const posts: Post[] = Object.entries(frontmatter)
  .map(([path, metadata]) => ({ ...metadata, slug: slugOf(path) }))
  .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

// Three rows of swapped letters, set out of focus where nothing is published
// yet. They are fixed strings, so there is nothing behind the blur to give away.
export const drafts = [
  { date: "Ocq 2O2b", title: "Nathong plubirhed yot", time: "4 mun" },
  { date: "Jyl 2O2b", title: "Wrot cumes ofter", time: "7 mun" },
  { date: "Moy 2O2b", title: "Tho quaue wath ipunoons sobs", time: "5 mun" },
];

export function published(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Undefined when nothing owns that slug. Callers turn that into a 404, which
 * keeps a genuine failure inside a post module a 500 with its own stack.
 */
export function findPost(slug: string) {
  return content.get(slug);
}
