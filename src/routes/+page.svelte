<script lang="ts">
  import orhan from "$lib/assets/orhan.jpeg";
  import Link from "$lib/components/Link/Link.svelte";
  import socials from "$lib/data/socials";
  import works from "$lib/data/works";
  import Container from "$lib/layouts/Container";
</script>

<Container
  title={"Orhan Tuğrul Şahin"}
  description={"Non-titled software developer with almost 4 years \
  experience building highly scalable, high performance solutions."}
>
  <div class="my-5 flex items-center gap-5">
    <img
      class="h-[60px] w-[60px] rounded-full object-cover"
      src={orhan}
      alt="Orhan himself"
    />

    <div>
      <h1 class="mb-1 text-lg leading-5 text-black dark:text-white">
        Orhan Tuğrul Şahin
      </h1>
      <p class="text-sm leading-5 text-gray">Software Developer</p>
    </div>
  </div>

  <div class="my-5 flex flex-col">
    <h2 class="mb-2 font-mono text-xs text-gray">About</h2>
    <p class="dark:text-smoke mb-2 text-sm">
      Creative, tech-savvy Software Developer with 3 years of experience in
      building innovative solutions for clients of all sizes. I specialize in
      developing high-performance applications using modern tools and
      technologies.
    </p>

    <div class="-mx-1 flex gap-4 md:flex-row">
      {#each socials as { title, href }}
        <Link {href}>
          <p class="text-sm">{title}</p>
        </Link>
      {/each}
    </div>
  </div>

  <div class="my-5 flex flex-col">
    <h2 class="mb-2 font-mono text-xs text-gray">Experience</h2>

    <div class="flex flex-col gap-6">
      {#each works as { title, description, technologies }}
        <div class="flex flex-col">
          <h3 class="text-sm font-medium dark:text-white">{title}</h3>
          <p class="dark:text-smoke mb-2 text-sm">{description}</p>

          <div class="gap flex flex-wrap gap-2">
            {#each technologies as technology}
              <span
                class="rounded-full border border-outline px-2 py-1 text-xs text-gray"
              >
                {technology}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</Container>
