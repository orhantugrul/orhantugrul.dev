<script>
  import Container from "$lib/components/Container";
  import author from "$lib/assets/author.jpeg";
</script>

<Container>
  <main class="main">
    <header class="header">
      <div class="header-left-section">
        <h1 class="header-author-name">Orhan Tuğrul</h1>
        <p class="header-author-title">A Software Developer who hates titles</p>
        <p class="header-author-description">
          Highly motivated software developer with experience in building
          high-quality applications using Java, Kotlin, and JavaScript.
        </p>
      </div>

      <div class="header-right-section">
        <img alt="Orhan Tuğrul" src={author} class="header-author-picture" />
      </div>
    </header>
  </main>
</Container>

<style lang="postcss">
  .main {
    @apply flex;
    @apply flex-col;
    @apply items-start;
    @apply mx-auto;
    @apply max-w-2xl;
    @apply pb-16;
  }

  .header {
    @apply flex;
    @apply flex-col-reverse;
    @apply sm:flex-row;
    @apply items-start;
  }

  .header .header-left-section {
    @apply flex;
    @apply flex-col;
    @apply pr-8;
  }

  .header .header-author-name {
    @apply font-bold;
    @apply text-3xl;
    @apply md:text-5xl;
    @apply tracking-tight;
    @apply mb-1;
    @apply text-white;
  }

  .header .header-author-title {
    @apply mb-4;
    @apply text-gray-200;
  }

  .header .header-author-description {
    @apply mb-16;
    @apply text-gray-400;
  }

  .header .header-right-section {
    @apply w-[80px];
    @apply sm:w-[176px];
    @apply relative;
    @apply mb-8;
    @apply sm:mb-0;
    @apply mr-auto;
  }

  .header .header-author-picture {
    @apply rounded-full;
    @apply filter;
    @apply grayscale;
  }
</style>
