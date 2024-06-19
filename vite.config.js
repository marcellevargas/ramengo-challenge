import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        success: 'src/pages/success/success.html'
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
    },
    historyApiFallback: { 
      rewrites: [
        { from: /\/success/, to: '/src/pages/success/success.html' }
      ]
    }
  }
});
