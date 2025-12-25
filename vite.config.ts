import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['@h8inc/perp-ui'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@h8inc/perp-ui': path.resolve(
        __dirname,
        './src/vendor/perp-ui.ts',
      ),
    },
  },
});
