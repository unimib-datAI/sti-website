import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
const isProd = import.meta.env.PROD;

// https://astro.build/config
export default defineConfig({
  site: "https://unimibinside.github.io/sti-website/",
  base: isProd ? "/sti-website" : "/",
  integrations: [tailwind(), react()],
});
