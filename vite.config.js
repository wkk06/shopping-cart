import { defineConfig } from 'vite'
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [
    createVuePlugin()
  ],
  resolve: {
    /* 添加alias规则 */
    alias: [
      {
        find: '@/',
        replacement: '/src/'
      }
    ],
    /* 暂时先加.vue, .js, .json */
    extensions: [".vue", ".js", ".json"],
  },
  return:{
    base:'/'
  },
  build: {
    rollupOptions: {
      output: { //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    }
  }
})
