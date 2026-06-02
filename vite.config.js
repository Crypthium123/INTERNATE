import { defineConfig } from 'vite';
import { resolve, relative } from 'path';
import { readdirSync, statSync } from 'fs';

const ROOT = resolve(__dirname, 'public');

function getHtmlFiles(dir) {
  const results = [];
  for (const name of readdirSync(dir)) {
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) {
      results.push(...getHtmlFiles(full));
    } else if (name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

export default defineConfig({
  root: ROOT,
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        getHtmlFiles(ROOT).map(f => {
          const rel = relative(ROOT, f).replace(/\.html$/, '').replace(/\\/g, '/');
          return [rel.replace(/[/]/g, '_'), f];
        })
      ),
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  server: { port: 3000 }
});
