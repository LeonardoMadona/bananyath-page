import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [],
  base: '/bananyath-page/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        customize: resolve(__dirname, 'customize.html'),
      },
    },
  }
  
})