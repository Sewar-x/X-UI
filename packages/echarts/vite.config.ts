import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor'
        }
      },
      // 确保外部化依赖，这样它们不会被打包进你的库中  
      external: []
    },
    // 产物输出目录，默认值就是 dist。我们使用默认值
    outDir: 'dist',

    // 参考：https://cn.vitejs.dev/config/build-options.html#build-lib
    lib: {
      // 构建的入口文件
      entry: './index.ts',

      // 产物的生成格式，默认为 ['es', 'umd']。我们使用默认值
      formats: ['es', 'cjs', 'umd', 'iife'],

      // 当产物为 umd、iife 格式时，该模块暴露的全局变量名称
      name: 'XCharts',
      // 产物文件名称
      fileName: 'x-charts',
    },
    // true:混淆产物代码
    minify: false,
  }
})
