import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
// const isProd = import.meta.env.PROD;
const isProd = true;

// https://astro.build/config
export default defineConfig({
  site: "https://unimibinside.github.io/sti-website/",
  base: "/sti-website",
  trailingSlash: "never",
  integrations: [tailwind(), react()],
});
