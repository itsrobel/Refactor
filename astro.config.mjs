// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  // Add your domain here
  site: "https://steflabs.co",

  integrations: [sitemap()],
  adapter: vercel(),
  output: "server",
});
