import { execSync } from "node:child_process";
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

/** Cloudflare's build hands over the commit; a local build asks git. */
function commit(): string {
  if (process.env.WORKERS_CI_COMMIT_SHA)
    return process.env.WORKERS_CI_COMMIT_SHA;
  try {
    return execSync("git rev-parse HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

export default defineConfig({
  define: { __COMMIT__: JSON.stringify(commit()) },
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      adapter: adapter(),
      // `entries` in the [slug] route is the source of truth for what gets
      // prerendered, so an uncrawled route just means nothing is published.
      prerender: { handleUnseenRoutes: "ignore" },
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
