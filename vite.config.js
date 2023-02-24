import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig( ({ mode }) => {
  process.env.BROWSER = loadEnv(mode, process.cwd(), '').BROWSER

  return {
      plugins: [react()],
      server: {
      open: true,
    }
  }
})
