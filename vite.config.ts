// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get the repository name from environment variable or default to 'shelfify'
const repoName = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : 'shelfify';

export default defineConfig(({ command }) => {
  // For development, use root path
  // For production (GitHub Pages), use the repository name as base path
  const base = command === 'build' ? `/${repoName}/` : '/';

  return {
    plugins: [react()],
    base,
    // Add proper handling for client-side routing
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Ensure proper handling of relative paths
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  };
});
