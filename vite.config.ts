import { toString } from "mdast-util-to-string";
import { mdsvex } from "mdsvex";
import tailwindcss from "@tailwindcss/vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

const WORDS_PER_MINUTE = 238;
const MINUTES_PER_CODE_BLOCK = 0.5;
const MINUTES_PER_IMAGE = 0.2;

type MdastNode = { type: string; children?: MdastNode[] };

function count(node: MdastNode, type: string): number {
  const self = node.type === type ? 1 : 0;
  const nested = node.children ?? [];
  return nested.reduce((total, child) => total + count(child, type), self);
}

/**
 * Publishes `readingTime` onto the frontmatter mdsvex exposes as `metadata`,
 * so posts never have to declare it by hand.
 */
function readingTime() {
  return (
    tree: MdastNode,
    file: { data: { fm?: Record<string, unknown> } }
  ) => {
    const words = toString(tree).split(/\s+/).filter(Boolean).length;
    const minutes =
      words / WORDS_PER_MINUTE +
      count(tree, "code") * MINUTES_PER_CODE_BLOCK +
      count(tree, "image") * MINUTES_PER_IMAGE;

    file.data.fm ??= {};
    file.data.fm.readingTime = Math.max(1, Math.ceil(minutes));
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      adapter: adapter(),
      preprocess: [
        mdsvex({
          extensions: [".svx", ".md"],
          remarkPlugins: [readingTime],
        }),
      ],
      extensions: [".svelte", ".svx", ".md"],
    }),
  ],
});
