<script lang="ts">
  export let title: string;
  export let href: string;
</script>

<a
  class="flex items-center hover:text-neutral-200 transition-all"
  target="_blank"
  rel="noopener noreferrer"
  {href}
>
  <svg
    class="mr-2 mb-1"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
      fill="currentColor"
    />
  </svg>
  <p class="h-7">{title}</p>
</a>
