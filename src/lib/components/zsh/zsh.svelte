<script lang="ts">
  import { onMount, untrack } from "svelte";
  import { commands } from "./commands";
  import { Shell } from "./shell.svelte";

  /** The path the visitor asked for, without its leading slash. */
  let { path }: { path: string } = $props();

  /* the session is pinned to the path it opened on */
  const shell = new Shell(
    untrack(() => path),
    commands
  );

  let inputEl: HTMLInputElement;
  let promptEl: HTMLParagraphElement;

  /* The input's own text is transparent; a mirror draws it with a fat block
     cursor. sudo hides what's typed, like a real password prompt. */
  let value = $state("");
  let caret = $state(0);
  const hidden = $derived(shell.mode === "sudo");
  const before = $derived(hidden ? "" : value.slice(0, caret));
  const under = $derived(hidden ? " " : value[caret] || " ");
  const after = $derived(hidden ? "" : value.slice(caret + 1));

  function sync() {
    value = inputEl.value;
    caret = inputEl.selectionStart ?? value.length;
  }
  function set(v: string) {
    inputEl.value = v;
    sync();
  }

  /* fish-style autosuggestion: appears once after a few idle seconds,
     accepted with →/Tab, gone forever at the first keystroke */
  let ghost = $state("");
  let typed = false;

  function onKeydown(e: KeyboardEvent) {
    if (ghost && ["ArrowRight", "Tab", "End"].includes(e.key)) {
      e.preventDefault();
      set(ghost);
    }
    ghost = "";
    typed = true;

    const key = e.key.toLowerCase();
    if (e.ctrlKey && key === "c") {
      e.preventDefault();
      if (shell.interrupt(inputEl.value)) set("");
    } else if (e.ctrlKey && key === "l") {
      e.preventDefault();
      shell.clear();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = shell.complete(inputEl.value);
      if (v !== undefined) set(v);
    } else if (e.key === "Enter") {
      const v = inputEl.value;
      set("");
      shell.submit(v);
    } else if (e.key === "ArrowUp") {
      const v = shell.historyUp();
      if (v !== undefined) {
        e.preventDefault();
        set(v);
      }
    } else if (e.key === "ArrowDown") {
      const v = shell.historyDown();
      if (v !== undefined) set(v);
    }
  }

  function onSectionClick(e: MouseEvent) {
    if ((e.target as HTMLElement).closest("a")) return;
    /* don't steal focus from someone selecting output to copy it */
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;
    inputEl.focus();
  }

  /* keep the prompt in view when output grows past the fold */
  let seen = shell.lines.at(-1);
  $effect(() => {
    const last = shell.lines.at(-1);
    if (last === seen) return;
    seen = last;
    promptEl.scrollIntoView({ block: "nearest" });
  });

  onMount(() => {
    sync();
    if (matchMedia("(pointer: fine)").matches)
      inputEl.focus({ preventScroll: true });
    const hint = setTimeout(() => {
      if (!typed && !value && !shell.mode) ghost = "ls ~/writing";
    }, 3500);
    return () => {
      clearTimeout(hint);
      shell.dispose();
    };
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
<section
  class="cursor-text border-b border-rule px-8 pt-27.5 pb-37.5 font-mono text-[12.5px] text-faint max-sm:px-6 max-sm:pt-21 max-sm:pb-30"
  onclick={onSectionClick}
>
  <div role="log" aria-live="polite">
    {#each shell.lines as line (line)}
      <p class="min-h-[1.7em]" class:text-dim={line.kind === "cmd"}>
        {#if line.href}
          <!-- hrefs come from resolve() or the static folder -->
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={line.href}
            class="link-hover inline-block text-foreground opacity-82 hover:opacity-100"
          >
            {line.text}
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {:else}
          {line.text}
        {/if}
      </p>
    {/each}
  </div>
  <p class="group min-h-[1.7em]" bind:this={promptEl}>
    <label class="flex">
      <span class="whitespace-nowrap">guest@orhantugrul</span>&nbsp;<span
        class="whitespace-nowrap">{shell.cwd}</span
      >&nbsp;%&nbsp;<span class="relative flex min-w-0 flex-1">
        <!-- below 16px, iOS Safari zooms the page on focus; the input's own
             text is invisible anyway — only the mirror shows -->
        <input
          type="text"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          enterkeyhint="go"
          aria-label="Terminal input"
          class="min-w-0 flex-1 text-transparent caret-transparent outline-none pointer-coarse:text-[16px]"
          bind:this={inputEl}
          oninput={sync}
          onkeydown={onKeydown}
          onkeyup={sync}
          onclick={sync}
          onselect={sync}
          onfocus={sync}
        />
        <span
          class="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre text-foreground"
          aria-hidden="true"
          >{before}<span
            class="shadow-[inset_0_0_0_1px_var(--dim)] group-focus-within:animate-curblink group-focus-within:bg-dim group-focus-within:text-background group-focus-within:shadow-none"
            >{under}</span
          >{after}{#if ghost}<span class="text-faint">{ghost}</span>{/if}</span
        >
      </span>
    </label>
  </p>
</section>
