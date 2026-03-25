import { defineConfig, type ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = defineConfig({
  test: {
    dir: "./src",
    coverage: {
      enabled: true,
    },
    env: {
      TZ: "UTC",
    },
  },
});

export default config;
