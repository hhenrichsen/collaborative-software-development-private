import { defineConfig, PluginOption } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import path from "path";
import { fileURLToPath } from "url";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const repoName = process.env.REPO_NAME;
const variant = process.env.BUILD_VARIANT;

function stub(name: string): string {
  return path.resolve(configDir, "src/stubs", name);
}

export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [motionCanvas()];
  if (command === "serve") {
    plugins.push(ffmpeg());
  }
  return {
    base: repoName ? `/${repoName}/${variant ?? "normal"}/` : "/",
    plugins,
    resolve:
      variant === "minimal"
        ? {
            alias: [
              {
                find: /.*\/components\/Scanlines$/,
                replacement: stub("Scanlines"),
              },
              {
                find: /.*\/components\/ChromaticAberration$/,
                replacement: stub("ChromaticAberration"),
              },
              {
                find: /.*\/components\/Glow$/,
                replacement: stub("Glow"),
              },
            ],
          }
        : undefined,
    build: {
      rollupOptions: {
        output: {
          dir: "out",
          entryFileNames: "[name].js",
        },
      },
    },
  };
});
