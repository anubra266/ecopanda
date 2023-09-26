import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  studio: {
    inject: {
      head: `<title>EcoPanda Studio</title> <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🐼</text></svg>">`,
    },
  },
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
