/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  htmlWhitespaceSensitivity: "ignore",
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
  tailwindStylesheet: "./src/routes/app.css",
};

export default config;
