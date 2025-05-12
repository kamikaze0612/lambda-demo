import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  treeshake: true,
  dts: true,
  splitting: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
});
