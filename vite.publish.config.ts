import {defineConfig} from 'vite';

const repoName = process.env.REPO_NAME ?? '';
const variant = process.env.BUILD_VARIANT ?? 'normal';
const base = repoName ? `/${repoName}/${variant}/` : `/${variant}/`;

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        dir: `dist/${variant}`,
      },
    },
  },
});
