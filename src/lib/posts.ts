import type { Post, PostMetadata } from "$lib/types";

/** Newest first. Server-only so the markdown bodies stay out of the client bundle. */
export async function listPosts(): Promise<Post[]> {
  const modules = import.meta.glob<{ metadata: PostMetadata }>("./posts/*.md");

  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, load]) => {
      const { metadata } = await load();
      const slug = path.split("/").pop()!.replace(".md", "");
      return { ...metadata, slug };
    })
  );

  return posts.sort(
    (left, right) => Date.parse(right.date) - Date.parse(left.date)
  );
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
