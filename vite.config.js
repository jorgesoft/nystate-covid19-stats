import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/nystate-covid19-stats/' : '/',
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
});
