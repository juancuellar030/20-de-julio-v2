import { defineConfig } from 'vite';

// GitHub project pages are served from /repo-name/
const base = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
