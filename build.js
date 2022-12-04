import path from "path";
import { fileURLToPath } from "url";
import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  await build({
    bundle: true,
    sourcemap: true,
    format: "cjs",
    // target: "node",
    external: ["@nativescript/core"],
    entryPoints: [path.join(__dirname, "src", "index.ts")],
    outdir: path.join(__dirname, "dist"),
    // outExtension: { ".js": ".mjs" },
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true
    }
  });
} catch {
  process.exitCode = 1;
}