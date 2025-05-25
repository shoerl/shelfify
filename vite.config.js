import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
// Determine repository name, defaulting for local builds
const repoName = process.env.GITHUB_REPOSITORY
    ? process.env.GITHUB_REPOSITORY.split('/')[1]
    : 'shelfify'; // Default repository name
export default defineConfig({
    plugins: [react()],
    base: process.env.GITHUB_REF_NAME === 'main' ? `/${repoName}/` : '/',
});
