// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The live production domain. Used for canonical URLs, sitemap and JSON-LD.
const SITE = 'https://www.egpaesthetics.co.uk';

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      // Utility pages are noindexed, and the two live-API leftover concern pages
      // are canonicalized to their curated twins — none belong in the sitemap.
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.includes('/404') &&
        !page.includes('/conditions/cellulite-thighs-buttocks-abdomen') &&
        !page.includes('/conditions/double-chin-jawline-fat'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
