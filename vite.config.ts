import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Static pages in public/ (e.g. /strike/) are served by Netlify as folder index.html files.
// Vite dev doesn't do that, so map folder URLs to their index.html locally.
const staticFolderIndex = (prefixes: string[]): Plugin => ({
  name: 'static-folder-index',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const [pathname, query = ''] = (req.url ?? '').split('?');
      if (prefixes.some((p) => pathname === p || (pathname.startsWith(`${p}/`) && pathname.endsWith('/')))) {
        req.url = `${pathname.replace(/\/?$/, '/')}index.html${query ? `?${query}` : ''}`;
      }
      next();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), staticFolderIndex(['/strike'])],
  optimizeDeps: {
    exclude: ['@h8inc/perp-ui'],
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: /^@h8inc\/perp-ui$/,
        replacement: path.resolve(__dirname, './src/vendor/perp-ui.ts'),
      },
    ],
  },
});
