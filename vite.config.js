import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        success: resolve(__dirname,'/success.html'),
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.tech.redventures.com.br',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
