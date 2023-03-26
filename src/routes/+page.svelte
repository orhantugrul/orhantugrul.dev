<script>
  import avatar from "$lib/assets/avatar.jpeg";
  import Main from "$lib/components/Main/Main.svelte";
</script>

<Main>
  <div class="flex flex-col items-start mx-auto max-w-2xl pb-16">
    <div class="flex flex-col-reverse sm:flex-row items-start">
      <div class="flex flex-col pr-8">
        <h1
          class="flex-bold text-3xl md:text-5xl tracking-tight mb-1 text-white"
        >
          Orhan Tuğrul
        </h1>
        <p class="mb-4 text-gray-200">A Software Developer who hates titles</p>
        <p class="mb-16 text-gray-400">
          Highly motivated software developer with experience in building
          high-quality applications using Java, Kotlin, and JavaScript.
        </p>
      </div>

      <div class="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
        <img
          class="rounded-full filter grayscale"
          alt="Orhan Tuğrul"
          src={avatar}
        />
      </div>
    </div>
  </div>
</Main>
