// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The live production domain. Used for canonical URLs, sitemap and JSON-LD.
const SITE = 'https://www.egpaesthetics.co.uk';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
