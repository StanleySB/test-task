import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ["path"],
      // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
      exclude: [
        "http", // Excludes the polyfill for `http` and `node:http`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Override the default polyfills for specific modules.
      overrides: {
        // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
        fs: "memfs",
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
});
