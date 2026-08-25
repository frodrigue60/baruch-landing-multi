// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for absolute canonical / OG URLs in SSG. Override with PUBLIC_SITE_URL.
  site: process.env.PUBLIC_SITE_URL || 'https://baruch-landing-demo.luisrodz.dev',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
