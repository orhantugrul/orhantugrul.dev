<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte";

  function applyTheme() {
    const root = document.documentElement;
    const light = root.classList.toggle("light");
    root.style.colorScheme = light ? "light" : "dark";
    localStorage.setItem("theme", light ? "light" : "dark");
  }

  function toggleTheme() {
    if (!document.startViewTransition) return applyTheme();
    document.startViewTransition(applyTheme);
  }
</script>

<button
  type="button"
  aria-label="Toggle theme"
  class="cursor-pointer text-muted-foreground hover:text-foreground"
  onclick={toggleTheme}
>
  <Sun class="size-3.5 light:hidden" strokeWidth={1.8} />
  <Moon class="hidden size-3.5 light:block" strokeWidth={1.8} />
</button>
