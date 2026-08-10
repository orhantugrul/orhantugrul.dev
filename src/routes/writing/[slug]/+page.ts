import type { PostMetadata } from "$lib/types";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    const post = await import(`$lib/posts/${params.slug}.md`);
    return {
      content: post.default,
      metadata: post.metadata as PostMetadata,
      slug: params.slug,
    };
  } catch {
    error(404, "Post not found");
  }
}
