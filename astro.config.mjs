import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://argusbot.cn",
  integrations: [react()],
  output: "static",
  build: {
    format: "file"
  }
});
