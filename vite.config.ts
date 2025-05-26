/// <reference types="node" />
/// <reference types="vite/client" />
/// <reference types="@vitejs/plugin-react/types" />

// vite.config.ts
import { defineConfig, ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Get the repository name from environment variable or default to 'shelfify'
const repoName = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : 'shelfify';

// Get the preview ID if it exists
const previewId = process.env.VITE_PREVIEW_ID;

export default defineConfig(({ command, mode: _mode }: ConfigEnv) => { // Renamed mode to _mode
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
