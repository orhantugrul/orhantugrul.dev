import type { Post } from "$types/post";

type Modules = Record<string, () => Promise<{ metadata: Omit<Post, "slug"> }>>;
type ModuleEntry = [string, () => Promise<{ metadata: Omit<Post, "slug"> }>];

export async function load() {
  const modules = import.meta.glob("$lib/posts/*.md") as Modules;
  const posts = await resolvePosts(modules).then(sortPosts);
  return { posts };
}

async function resolvePosts(modules: Modules) {
  const resolvers = Object.entries(modules).map(resolvePost);
  return await Promise.all(resolvers);
}

async function resolvePost([path, resolver]: ModuleEntry): Promise<Post> {
  const { metadata } = await resolver();
  const slug = path.split("/").pop()?.replace(".md", "") ?? "";
  return { ...metadata, slug };
}

function sortPosts(posts: Post[]): Post[] {
  return posts.sort(comparePosts);
}

function comparePosts(left: Post, right: Post): number {
  return new Date(right.date).getTime() - new Date(left.date).getTime();
}
