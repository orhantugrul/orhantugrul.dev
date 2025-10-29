import type { Metadata } from "$types/post.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    const post = await import(`$lib/posts/${params.slug}.md`);
    return {
      post: {
        content: post.default,
        metadata: post.metadata as Metadata,
      },
    };
  } catch {
    error(404);
  }
}
