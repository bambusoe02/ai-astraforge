import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false, // Disable DTS for now
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["@langchain/openai", "@langchain/core", "openai", "ai"],
});
