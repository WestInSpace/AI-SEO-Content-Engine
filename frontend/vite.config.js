import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, '..');
  const env = loadEnv(mode, envDir, '');
  const FRONTEND_PORT = parseInt(env.VITE_FRONTEND_PORT) || 3000;

  return {
    base: './',
    plugins: [react()],
    envDir: envDir,
    server: {
      host: "0.0.0.0",     // ← THIS is the missing piece
      port: FRONTEND_PORT,
      strictPort: true,
    },
  };
})
