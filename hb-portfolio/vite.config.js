import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',           // Quan trọng nhất
  build: {
    outDir: 'dist',    // Mặc định là dist, giữ nguyên
  }
})
