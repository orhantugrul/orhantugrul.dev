<script lang="ts">
  import { page } from "$app/stores";
  import Container from "$lib/layouts/Container";

  $: status = $page.status;
  $: title = "Error | Orhan Tuğrul Şahin";
  $: description = $page.error?.message || "An unexpected error occurred";
</script>

<Container {title} {description}>
  <div class="flex min-h-screen flex-col">
    <div class="my-auto flex flex-col items-center justify-center">
      <h1 class="mb-4 text-6xl font-bold text-black dark:text-white">
        {status}
      </h1>

      <h2 class="mb-4 text-xl text-gray">
        {status === 404
          ? "This page could not be found."
          : "An error occurred on server"}
      </h2>

      <a
        class="inline-flex items-center gap-1 rounded px-1 text-black hover:bg-solitude dark:text-smoke dark:hover:bg-raisin"
        href="/"
      >
        Go back home

        <svg
          class="h-[14px] w-[14px]"
          fill="none"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>
  </div>
</Container>
