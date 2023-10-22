<script lang="ts">
  import Container from "$lib/layouts/Container";
  import avatar from "$lib/assets/avatar.jpeg";
  import experiences from "$lib/data/experiences.json";
  import Link from "$lib/components/Link";
  import socials from "$lib/data/socials.json";
</script>

<Container
  title={"Orhan Tugrul • Non-titled developer"}
  description={"Full-stack developer, Java & Kotlin enthusiast."}
>
  <section>
    <div class="px-8 py-12 mx-auto max-w-7xl lg:pt-24">
      <div class="max-w-xl mx-auto">
        <div class="md:flex md:items-center md:justify-between md:space-x-5">
          <div class="flex items-center space-x-5">
            <div class="flex-shrink-0">
              <div class="relative">
                <img
                  class="object-cover w-16 h-16 lg:h-24 lg:w-24"
                  src={avatar}
                  alt="Orhan itself"
                />
              </div>
            </div>
            <div class="pt-1.5">
              <h1 class="text-black lg:text-xl dark:text-white">
                λ Orhan Tuğrul Şahin
              </h1>
              <p class="text-sm font-light text-neutral-500">
                Software Developer in Turkey
              </p>
              <p>
                <a
                  class="text-xs underline duration-200 hover:no-underline dark:text-white"
                  href="/">orhantugrul.dev</a
                >
              </p>
            </div>
          </div>
        </div>

        <div class="mt-24 text-sm font-light">
          <p class="text-black dark:text-white">About</p>
          <div class="mt-3 space-y-3 text-neutral-500 dark:text-neutral-400">
            <p>
              Creative, tech-savvy Software Developer with 3 years of experience
              in building innovative solutions for clients of all sizes. I
              specialize in developing high-performance applications and
              websites using modern tools and technologies. My top priority is
              to ensure customer satisfaction by creating products of the
              highest quality.
            </p>

            <p>
              For the past 3 years, I mainly focused on creating interactive
              user interfaces, developing robust back-end systems, and creating
              seamless integrations between the two. With a passion for
              problem-solving and a drive for continuous learning, I'm always
              looking for ways to improve my craft.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="px-8 py-12 mx-auto max-w-7xl">
      <div class="max-w-xl mx-auto">
        <div class="grid gap-12 md:gap-24">
          <div class="text-sm font-light">
            <p class="text-black dark:text-white">Work experience</p>

            <div class="grid gap-6 mt-3">
              {#each experiences as experience}
                <div
                  class="grid items-start grid-cols-1 text-neutral-500 md:grid-cols-3"
                >
                  <div>
                    <p class="text-neutral-400 dark:text-neutral-400">
                      {experience.date}
                    </p>
                  </div>
                  <div class="w-full md:col-span-2">
                    <p class="text-black dark:text-white">
                      <Link href={experience.link}>
                        {experience.title}
                      </Link>
                    </p>
                    <p class="">{experience.location}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
          <div class="text-sm font-light">
            <p class="text-black dark:text-white">Contact</p>

            <div class="grid gap-6 mt-3">
              {#each socials as social}
                <div
                  class="grid items-start grid-cols-1 text-neutral-500 md:grid-cols-3"
                >
                  <p class="text-neutral-400 dark:text-neutral-400">
                    {social.title}
                  </p>

                  <div class="w-full md:col-span-2">
                    <p class="text-black dark:text-white">
                      <Link href={social.link}>{social.link}</Link>
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</Container>
