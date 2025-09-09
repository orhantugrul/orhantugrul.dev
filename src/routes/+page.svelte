<script lang="ts">
  import orhan from "$assets/orhan.jpeg";
  import ContactCard from "$components/contact-card.svelte";
  import experiences from "$lib/data/works";
  import Footer from "../components/footer.svelte";

  const title = "Software Crafter | Orhan Tugrul Sahin";
  const description =
    "Non-titled software crafter building " +
    "highly scalable, high performance solutions.";
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
                class="rounded-full border border-outline bg-solitude px-3 py-1.5 text-xs font-medium text-gray dark:bg-raisin"
              >
                {technology}
              </span>
            {/each}
          </div>
        </article>
      {/each}
    </div>
  </section>
  <Footer />
</main>
