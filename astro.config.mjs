import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  site: "https://unimibinside.github.io/MammoTab-Website/",
  base: isProd ? "/MammoTab-Website/" : "/",
  integrations: [tailwind()],
});
