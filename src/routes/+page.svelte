<script lang="ts">
  import ContactCard from "$components/contact-card.svelte";
  import Footer from "$components/footer.svelte";
  import NavigationIsland from "$components/navigation-island.svelte";
  import type { Experience } from "$types/experience";

  const title = "Software Crafter | Orhan Tugrul Sahin";
  const description =
    "Non-titled software crafter building " +
    "highly scalable, high performance solutions.";

  const experiences: Experience[] = [
    {
      title: "ITServ Technology",
      description:
        "Developed a modern multi-cloud management system integrating \
      VMWare vSphere and Amazon Web Services (AWS). Designed and implemented \
      scalable web applications using Next.js. Built and maintained \
      RESTful APIs with Spring Boot, Redis, and PostgreSQL \
      using Docker. Optimized cloud resource management processes for \
      VMs and AWS for clients, improving efficiency across business units.",
      technologies: [
        "Spring Boot",
        "Next.js",
        "Redis",
        "PostgreSQL",
        "Docker",
        "AWS",
        "vSphere",
        "Zabbix",
      ],
    },
    {
      title: "Yapı Kredi Leasing",
      description:
        "Contributed to a full-stack financial leasing application using \
      Spring Boot and React.js. Implemented unit and integration tests with \
      JUnit and Jest, ensuring high code reliability and functional accuracy. \
      Applied analysis and security tools like SonarQube and Fortify to \
      enforce high code quality and security standards. Collaborated in \
      agile, cross-functional teams to deliver robust enterprise solutions \
      aligned with business goals.",
      technologies: [
        "Spring Boot",
        "React.js",
        "JUnit",
        "Jest",
        "SonarQube",
        "Fortify",
      ],
    },
    {
      title: "Linktera",
      description:
        "Contributed to the development of a Treasury Management System \
      streamlining complex financial operations. Developed backend services \
      using Java (Spring Boot) and integrated real-time features with Kafka. \
      Collaborated on frontend modules with React.js, ensuring seamless user \
      experience and efficient workflows. Enhanced system performance and \
      reliability, supporting mission-critical financial tasks.",
      technologies: [
        "Spring Boot",
        "Hibernate",
        "React.js",
        "Kafka",
        "WebSocket",
      ],
    },
  ];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<NavigationIsland />
<header class="mb-16">
  <h2
    class="mb-2 font-mono text-sm font-semibold tracking-wide text-muted-foreground"
  >
    /about
  </h2>
  <h1 class="text-2xl leading-tight font-medium text-foreground md:text-3xl">
    Who is Orhan?
  </h1>
</header>
<section class="mb-20">
  <div class="mb-6 space-y-6 md:mb-8">
    <p
      class="max-w-2xl leading-relaxed text-foreground md:text-lg md:leading-[1.6]"
    >
      I write code and try not to break things in production. Been at it for 4+
      years mostly building APIs, cloud stuff, and web apps that banks and tech
      companies actually use.
    </p>
    <p
      class="max-w-2xl leading-relaxed text-foreground md:text-lg md:leading-[1.6]"
    >
      I'm into making things work better. Faster APIs, cleaner code, smoother
      UX. The usual developer stuff, but I actually care about it.
    </p>
    <p
      class="max-w-2xl leading-relaxed text-foreground md:text-lg md:leading-[1.6]"
    >
      Outside of code, I'm usually exploring new tools, simplifying side
      projects, or just tinkering with ideas that keep me curious.
    </p>
  </div>
  <ContactCard />
</section>
<section class="mb-20">
  <div class="mb-16">
    <h2
      class="mb-2 font-mono text-sm font-semibold tracking-wide text-muted-foreground"
    >
      /experience
    </h2>
    <h3 class="text-lg leading-relaxed text-foreground">
      A chronology of teams I've worked with
    </h3>
  </div>
  <div class="relative">
    <div
      class="absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/20 to-transparent"
    ></div>

    {#each experiences as { title, description, technologies }, index}
      <article class="relative pb-16 pl-8 last:pb-0">
        <div
          class="absolute top-[6px] left-[-4px] h-[9px] w-[9px] rounded-full border-2 border-muted-foreground/30 bg-background"
        ></div>

        <div class="mb-3">
          <h3 class="mb-1 text-base font-medium text-foreground">
            {title}
          </h3>
        </div>
        <p class="mb-5 max-w-xl text-[15px] leading-[1.65] text-foreground">
          {description}
        </p>

        <p class="text-xs font-normal text-muted-foreground">
          {technologies.join(" · ")}
        </p>
      </article>
    {/each}
  </div>
</section>
<Footer />
