import { listPosts } from "$lib/posts";

const RECENT = 3;

export async function load() {
  const posts = await listPosts();
  return { posts: posts.slice(0, RECENT), total: posts.length };
}
