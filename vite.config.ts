// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.GITHUB_REPOSITORY
  ? process.env.GITHUB_REPOSITORY.split('/')[1]
  : 'shelfify';

export default defineConfig(({ command }) => {
  // `command === 'serve'` when you run `yarn dev`
  // `command === 'build'` when you run `vite build`
  const base = command === 'build' ? `/${repoName}/` : '/';

  return {
    plugins: [react()],
    base,
  };
});
