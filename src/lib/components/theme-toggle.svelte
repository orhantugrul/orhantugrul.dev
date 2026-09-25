<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte";

  function toggleTheme() {
    const root = document.documentElement;
    const light = root.classList.toggle("light");
    root.style.colorScheme = light ? "light" : "dark";
    localStorage.setItem("theme", light ? "light" : "dark");
  }
</script>

<button
  type="button"
  aria-label="Toggle theme"
  class="cursor-pointer text-dim hover:text-foreground"
  onclick={toggleTheme}
>
  <Sun class="light:hidden" size={14} strokeWidth={1.8} />
  <Moon class="hidden light:block" size={14} strokeWidth={1.8} />
</button>
