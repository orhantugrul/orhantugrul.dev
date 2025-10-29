import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

function visit(node, callback) {
  callback(node);
  if (node.children) {
    node.children.forEach((child) => visit(child, callback));
  }
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  remarkPlugins: [
    function () {
      return function (tree, file) {
        const text = toString(tree);
        const wordCount = text.split(/\s+/).filter(Boolean).length;

        const nodes = [];
        visit(tree, (node) => nodes.push(node));

        const codes = nodes.filter((node) => node.type === "code").length;
        const images = nodes.filter((node) => node.type === "image").length;

        const textMinutes = wordCount / 238;
        const codeMinutes = codes * 0.5;
        const imageMinutes = images * 0.2;
        const readingTime = Math.ceil(textMinutes + codeMinutes + imageMinutes);

        if (!file.data.fm) file.data.fm = {};
        file.data.fm.readingTime = readingTime;
      };
    },
  ],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
    alias: {
      $assets: "./src/assets",
      $components: "./src/components",
      $types: "./src/types",
    },
  },
};

export default config;
