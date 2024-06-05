import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  site: "https://unimibinside.github.io/mammotab-website/",
  base: isProd ? "/mammotab-website/" : "/",
  integrations: [tailwind()],
});
