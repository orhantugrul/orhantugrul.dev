<script lang="ts">
  import Container from "$lib/layouts/Container";
  import avatar from "$lib/assets/avatar.jpeg";
  import works from "$lib/data/works";
</script>

<Container
  title={"Orhan Tuğrul Şahin"}
  description={"Software developer based on 🇹🇷"}
>
  <div class="my-5 flex items-center gap-5">
    <img
      class="h-[60px] w-[60px] rounded-full object-cover"
      src={avatar}
      alt="Orhan himself"
    />

    <div>
      <h1 class="text-sm leading-5 text-black dark:text-bright">
        Orhan Tuğrul Şahin
      </h1>
      <p class="text-sm leading-5 text-black dark:text-bright">
        Software Developer
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.cloud4next.com/"
        >
          <span class="duration-[50ms] hover:border-b-[1px]">@Cloud4Next</span>
        </a>
      </p>
    </div>
  </div>

  <div class="my-5 flex flex-col">
    <h2 class="mb-2 font-mono text-xs text-gray">Profile</h2>

    <div class="text-sm">
      <p class="mb-3 dark:text-bright">
        Creative, tech-savvy Software Developer with 3 years of experience in
        building innovative solutions for clients of all sizes. I specialize in
        developing high-performance applications using modern tools and
        technologies.
      </p>
    </div>
  </div>

  <div class="my-5 flex flex-col">
    <h2 class="mb-2 font-mono text-xs text-black dark:text-gray">Works</h2>

    <div class="flex flex-col gap-2">
      {#each works as { title, description, link }}
        <div class="dark:bg-resene flex flex-col bg-bright">
          <a class="group flex items-center gap-1 dark:text-white" href={link}>
            <h3 class="text-sm">{title}</h3>

            <span
              class="hiddendelay-150 transition ease-in-out group-hover:flex"
            >
              <svg
                class="h-[14px] w-[14px]"
                fill="none"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                ><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg
              >
            </span>
          </a>
          <p class="text-sm text-gray">{description}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="my-5 flex flex-col">
    <h2 class="mb-2 font-mono text-xs text-black dark:text-[#CFD1D6]">
      Contact
    </h2>

    <div class="flex gap-4">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="mailto:orhantugrulsahin@gmail.com"
      >
        <button class="rounded-full dark:bg-[#27292D] dark:text-[#CFD1D6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            class="m-4"
          >
            <path
              fill="currentColor"
              d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm3.519 0L12 11.671L18.481 6zM20 7.329l-7.341 6.424a1 1 0 0 1-1.318 0L4 7.329V18h16z"
            />
          </svg>
        </button>
      </a>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/orhantugrul"
      >
        <button class="rounded-full dark:bg-[#27292D] dark:text-[#CFD1D6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            class="m-4"
            ><path
              fill="currentColor"
              d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.28 9.28 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10"
            /></svg
          >
        </button>
      </a>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://linkedin.com/in/orhantugrulsahin"
      >
        <button class="rounded-full dark:bg-[#27292D] dark:text-[#CFD1D6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            class="m-4"
            ><path
              fill="currentColor"
              d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"
            /></svg
          >
        </button>
      </a>
    </div>
  </div>
</Container>
