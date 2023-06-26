<script lang="ts">
  import Container from "$lib/layouts/Container";
  import Button from "$lib/components/Button";
  import {
    GithubIcon,
    HackerRankIcon,
    OnlyFansIcon,
  } from "$lib/components/Icon";
  import Link from "$lib/components/Link/Link.svelte";
</script>

<Container
  title={"About • Orhan Tugrul"}
  description={"A Software Developer who hates titles."}
>
  <h1 class="text-neutral-200 font-bold text-3xl font-serif">About Me</h1>

  <p class="my-5 text-neutral-200">
    Hey, I'm Orhan Tugrul <i><del>Sahin</del></i> 👋
  </p>

  <div class="prose prose-neutral prose-invert text-neutral-200">
    <p>
      I'm currently the
      <b><span class="text-sky-600">Software Developer at ITServ</span>.</b>
      In my role, I am responsible for developing and maintaining software applications
      for our clients. I'm currently focusing to reactive and non-blocking things.
    </p>

    <hr />

    <p>
      I really ❤️ to building new things with new technologies. Currently,
      heavily working with under JVM ecosystem. I am also exploring the Rust
      programming language, which has gained popularity for its memory safety
      and performance, and I am excited to see how it can be leveraged to
      improve our software development process.
    </p>

    <p>
      In the future, I really want to contribute to open-source. I believe that
      contributing to open-source is a great way to give back to the community
      while also gaining valuable experience, and I am looking forward to
      exploring different projects and finding ways to make meaningful
      contributions.
    </p>

    <p>
      Outside of these things, I have a basic minimal life, where I focus on
      simple pleasures such as spending time with loved ones, listing lo-fi
      tracks, reading books, drinking some ☕️, and enjoying the outdoors.
    </p>

    <div class="flex flex-col gap-2 md:flex-row md:gap-2">
      <Button href="https://github.com/orhantugrul">
        <div class="flex items-center">
          <GithubIcon />
          <div class="ml-3">Github</div>
        </div>
      </Button>

      <Button href="https://www.hackerrank.com/orhantugrul">
        <div class="flex items-center">
          <HackerRankIcon />
          <div class="ml-3">HackerRank</div>
        </div>
      </Button>

      <Button href="https://www.youtube.com/watch?v=oHg5SJYRHA0">
        <div class="flex items-center">
          <OnlyFansIcon />
          <div class="ml-3">OnlyFans</div>
        </div>
      </Button>
    </div>
  </div>
</Container>
