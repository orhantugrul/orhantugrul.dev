import { error } from "@sveltejs/kit";
import { findPost, posts } from "$lib/writing";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () =>
  posts.map(({ slug }) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
  const post = findPost(params.slug);
  if (!post) error(404, "Post not found");

  const { default: content, metadata } = await post();
  return { content, metadata, slug: params.slug };
};
