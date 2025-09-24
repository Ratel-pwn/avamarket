import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = (env.VITE_API_URL || env.VITE_API_BASE_URL || 'http://localhost:8000').trim()

  return {
    plugins: [react()],
    base: './',
    server: {
      proxy: {
        // 前端以 /api 开头的请求将代理到后端
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
          rewrite: p => p.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // 确保字体文件有正确的扩展名
            if (assetInfo.name && assetInfo.name.match(/\.(woff2?|eot|ttf|otf)$/)) {
              return 'assets/fonts/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          }
        }
      }
    }
  }
})
