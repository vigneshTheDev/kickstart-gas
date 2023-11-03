import fsCb from "fs";
import fs from "fs/promises";
import path from "path";

import { defineConfig, type PluginOption, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_URL,
    plugins: [useBaseUrlInDev(), writeIndexToDisk(), react(), basicSsl()],
  };
});

function useBaseUrlInDev(): PluginOption {
  return {
    name: "use-base-in-dev",
    apply: "serve",
    transformIndexHtml: async (html, { server }) => {
      const { config } = server;
      const baseTag = `<base href="${config.env.VITE_BASE_URL}" />`;

      return html.replace("<head>", "<head>" + baseTag);
    },
  };
}

function writeIndexToDisk(): PluginOption {
  return {
    name: "write-to-disk",
    apply: "serve",
    transformIndexHtml: async (html, { server, path: ogPath }) => {
      const { config } = server;

      const outdir = path.join(__dirname, config.build.outDir);
      const outfile = path.join(outdir, ogPath);
      if (!fsCb.existsSync(outdir)) {
        await fs.mkdir(outdir);
      }

      config.logger.info("Writing contents of html file " + outfile);

      await fs.writeFile(outfile, html);
      return html;
    },
  };
}
