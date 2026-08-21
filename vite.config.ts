import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

/**
 * Cloudflare Workers Builds often runs `npx wrangler versions upload` from a
 * copy of `dist`, not the repo root. The Vite plugin writes the real deploy
 * config under `dist/<worker>/wrangler.json`, which Wrangler will not see
 * unless a config also exists at the `dist` root.
 */
function writeDeployableWranglerConfig(): Plugin {
  return {
    name: 'write-deployable-wrangler-config',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve('dist');
      const clientDir = path.join(distDir, 'client');
      if (!fs.existsSync(clientDir)) {
        return;
      }

      const workerDir = fs.readdirSync(distDir, { withFileTypes: true }).find(
        (entry) =>
          entry.isDirectory() &&
          entry.name !== 'client' &&
          fs.existsSync(path.join(distDir, entry.name, 'wrangler.json')),
      );

      if (!workerDir) {
        return;
      }

      const generatedPath = path.join(distDir, workerDir.name, 'wrangler.json');
      const config = JSON.parse(fs.readFileSync(generatedPath, 'utf8')) as Record<string, unknown>;
      delete config.configPath;
      delete config.userConfigPath;
      config.main = `./${workerDir.name}/index.js`;
      config.base_dir = `./${workerDir.name}`;

      const assets = config.assets;
      if (assets && typeof assets === 'object') {
        (assets as Record<string, unknown>).directory = './client';
      }

      fs.writeFileSync(path.join(distDir, 'wrangler.json'), `${JSON.stringify(config, null, 2)}\n`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare(), writeDeployableWranglerConfig()],
  resolve: {
    alias: {
      'punycode/': 'node:punycode',
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? assetInfo.name ?? '';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (/\.(css)$/.test(name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          if (/\.(js)$/.test(name)) {
            return `assets/js/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
});
