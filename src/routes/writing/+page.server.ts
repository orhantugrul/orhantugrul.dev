import { listPosts } from "$lib/posts";

export async function load() {
  return { posts: await listPosts() };
}
