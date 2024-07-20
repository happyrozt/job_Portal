import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/job_Portal/',
  plugins: [react()],
  server: {
    historyApiFallback: true, 
  },
})
