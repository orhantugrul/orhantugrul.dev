<script lang="ts">
  import Container from "$lib/layouts/Container";
  import avatar from "$lib/assets/avatar.jpeg";
  import Link from "$lib/components/Link";
</script>

<Container
  title={"Orhan Tugrul • Non-titled developer"}
  description={"Full-stack developer, Java & Kotlin enthusiast."}
>
  <h1 class="text-neutral-200 text-3xl font-bold font-serif">
    Orhan Tugrul
    <i><del>Sahin</del></i>
  </h1>

  <p class="my-5 max-w-[460px] text-neutral-200">
    A Software Developer who hates titles, like a superhero who doesn't want a
    fancy costume.
  </p>

  <div class="flex items-start md:items-center mb-8 flex-col md:flex-row">
    <img
      class="rounded-full filter grayscale"
      alt="Orhan Tuğrul"
      src={avatar}
      width={"100"}
      height={"100"}
    />

    <div class="ml-0 md:ml-6 space-y-2 text-neutral-400" />
  </div>

  <p class="mb-5 max-w-[600px] text-neutral-200">
    Highly motivated software developer with experience in building high-quality
    applications using Java, Kotlin, and JavaScript. I have a proven track
    record of delivering high-quality code with a smile on my face and a cup of
    coffee in my hand.
  </p>

  <ul
    class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-400"
  >
    <li>
      <Link
        title={"follow me on twitter"}
        href={"https://twitter.com/itsorhanbtw"}
      />
    </li>
  </ul>
</Container>
