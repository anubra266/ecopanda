import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,

  hash: true,
  minify: true,

  jsxFramework: "react",

  presets: ["animated-pandacss", "@shadow-panda/preset"],

  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
  },

  globalCss: {
    body: {
      position: "relative",
      minHeight: "screen",
      display: "flex",
    },
    "*, *::before, *::after": {
      borderColor: "border",
      borderStyle: "solid",
    },
  },

  outdir: "styled-system",
});
