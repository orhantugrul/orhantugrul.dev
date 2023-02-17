/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        gray: {
          400: "rgb(136 136 136)",
          600: "rgb(136 136 136)",
          800: "rgb(34 34 34)",
          900: "rgb(17 17 17)",
        },
        ...defaultTheme.colors,
      },
    },
  },
  plugins: [],
};
