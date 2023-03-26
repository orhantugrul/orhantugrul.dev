<script lang="ts">
  export let title: string;
  export let href: string;
  export let active: boolean;
  $: textColor = active ? "text-gray-200" : "text-gray-600";
</script>

<li>
  <a
    class={`px-3 py-2 font-semibold hover:bg-gray-800 rounded-lg transition-all ${textColor}`}
    {href}>{title}</a
  >
</li>
