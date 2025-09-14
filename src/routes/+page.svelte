<script lang="ts">
  import orhan from "$assets/orhan.jpeg";
  import ContactCard from "$components/contact-card.svelte";
  import Footer from "$components/footer.svelte";
  import Arrow from "$components/icons/arrow.svelte";
  import experiences from "$lib/data/works";
  import type { Post } from "$types/feed";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const title = "Software Crafter | Orhan Tugrul Sahin";
  const description =
    "Non-titled software crafter building " +
    "highly scalable, high performance solutions.";

  function postImage(post: Post) {
    const image = post.content.match(/<img[^>]*src="([^"]+)"[^>]*>/g)?.[0];
    return image?.match(/src="([^"]+)"/)?.[1];
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<main class="mx-auto min-h-screen max-w-2xl px-6 py-12 md:py-20">
  <header class="mb-20 flex items-center">
    <img
      class="mr-6 h-16 w-16 rounded-full object-cover shadow-lg"
      src={orhan}
      alt="Orhan himself"
    />
    <div>
      <h1
        class="text-xl leading-tight font-medium text-black md:text-2xl dark:text-white"
      >
        Orhan Tugrul Sahin
      </h1>
      <p class="mt-1 text-base text-gray">Software Crafter</p>
    </div>
  </header>
  <section class="mb-24">
    <h2 class="mb-6 text-sm font-semibold tracking-wide text-gray uppercase">
      About
    </h2>
    <p
      class="mb-12 text-base leading-relaxed text-black md:text-lg md:leading-loose dark:text-smoke"
    >
      Creative, tech-savvy Software Crafter with 4+ years developing
      enterprise-level applications in financial services and cloud management.
      Proven expertise in building scalable web applications, RESTful APIs, and
      multi-cloud systems. Strong background in modern frameworks, agile
      methodologies, and delivering high-quality solutions for mission critical
      business operations.
    </p>
    <ContactCard />
  </section>
  <section class="mb-24">
    <h2 class="mb-8 text-sm font-semibold tracking-wide text-gray uppercase">
      Experience
    </h2>
    <div class="space-y-12">
      {#each experiences as { title, description, technologies }}
        <article>
          <h3 class="mb-3 text-lg font-semibold text-black dark:text-white">
            {title}
          </h3>
          <p
            class="mb-6 text-base leading-relaxed text-black md:leading-loose dark:text-smoke"
          >
            {description}
          </p>
          <div class="flex flex-wrap gap-2">
            {#each technologies as technology}
              <span
                class="rounded-md bg-solitude px-2 py-1 text-xs font-medium text-gray dark:bg-raisin"
              >
                {technology}
              </span>
            {/each}
          </div>
        </article>
      {/each}
    </div>
  </section>
  <section class="mb-24">
    <h2 class="mb-6 text-sm font-semibold tracking-wide text-gray uppercase">
      Stories
    </h2>
    <div class="space-y-8">
      {#each data.feed.posts.slice(0, 3) as post}
        <article class="group">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-lg transition-all duration-200"
          >
            <div class="flex items-start gap-4">
              {#if postImage(post)}
                <div class="h-14 w-20 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={postImage(post)}
                    alt={post.title}
                    class="h-full w-full object-cover"
                  />
                </div>
              {/if}
              <div class="min-w-0 flex-1">
                <h3
                  class="mb-2 leading-snug font-medium text-black transition-colors group-hover:text-black group-hover:opacity-80 dark:text-white"
                >
                  {post.title}
                </h3>
                <div class="flex items-center gap-3 text-sm text-gray">
                  <time datetime={post.published}>
                    {formatDate(post.published)}
                  </time>
                </div>
              </div>
              <Arrow
                class="mt-1 h-4 w-4 text-black opacity-0 transition-all duration-200 group-hover:opacity-60 dark:text-white"
              />
            </div>
          </a>
        </article>
      {/each}
    </div>
  </section>
  <Footer />
</main>
