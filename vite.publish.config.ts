import { defineConfig } from "vite";

const repoName = process.env.REPO_NAME;
export default defineConfig({
  base: repoName ? `/${repoName}/` : "/",
  build: {
    rollupOptions: {
      input: "index.html",
      output: {
        dir: "dist",
      },
    },
  },
});
