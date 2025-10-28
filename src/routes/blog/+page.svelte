<script lang="ts">
  import Footer from "$components/footer.svelte";
  import NavigationIsland from "$components/navigation-island.svelte";
  import type { Post } from "$types/post";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { posts } = data as { posts: Post[] };

  let years = $derived.by(
    () => new Set(posts.map((post) => new Date(post.date).getFullYear()))
  );

  let postsByYears = $derived.by(() =>
    Object.groupBy(posts, ({ date }) => new Date(date).getFullYear())
  );
</script>

<NavigationIsland />
<header class="mb-16">
  <h2
    class="mb-2 font-mono text-sm font-semibold tracking-wide text-muted-foreground"
  >
    /blog
  </h2>
  <h1 class="text-2xl leading-tight font-medium text-foreground md:text-3xl">
    Thoughts on software development
  </h1>
</header>
<section class="mb-20">
  {#each years as year, index}
    {@const posts = postsByYears[year]}
    <div class="flex flex-col gap-3">
      <div
        class="flex items-center gap-2 font-mono text-sm text-muted-foreground"
      >
        <span>{index === years.size - 1 ? "└──" : "├──"}</span>
        <span class="font-semibold">{year}/</span>
        <span class="text-xs">({posts!.length} posts)</span>
      </div>
      <div class="flex flex-col">
        {#each posts as post, index}
          <a href={`/blog/${post.slug}`} class="group/button mx-8 py-2">
            <div class="flex gap-2 font-mono">
              <span class="text-sm text-muted-foreground">
                {index === posts!.length - 1 ? "└──" : "├──"}
              </span>
              <div class="flex min-w-0 flex-col group-hover/button:bg-muted">
                <div class="flex items-center gap-2">
                  <h3 class="text-sm font-medium text-foreground">
                    {post.slug}.md
                  </h3>
                  <span class="text-xs font-normal text-muted-foreground">
                    ({new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })})
                  </span>
                </div>
                <p
                  class="truncate text-sm leading-relaxed text-muted-foreground"
                >
                  {post.description}
                </p>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</section>
<Footer />
