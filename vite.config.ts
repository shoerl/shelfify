// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Get the repository name from environment variable or default to 'shelfify'
const repoName = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : 'shelfify';

// Get the preview ID if it exists
const previewId = process.env.VITE_PREVIEW_ID;

export default defineConfig(({ command }) => {
  // For PR previews, use the preview subfolder as base
  const base = command === 'build'
    ? previewId
      ? `/${repoName}/preview/${previewId}/`
      : `/${repoName}/`
    : '/';

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
