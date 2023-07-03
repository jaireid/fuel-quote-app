import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig( ({ mode }) => {
  loadEnv(mode, process.cwd(), '').chrome

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
            target: "http://localhost:8080",
            changeOrigin: true,
        }
      }
    }
  }
})
