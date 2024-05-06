import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 根据不同的格式设置不同的目录  
        entryFileNames: '[name].[format].js', // 为每种格式指定不同的文件名模板  
        chunkFileNames: '[name]-[hash].[format].js', // 同样为chunks指定不同的文件名模板  
      },
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'xhttp-vendor'
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
      entry: './axios/index.ts',

      // 产物的生成格式，默认为 ['es', 'umd']。我们使用默认值
      formats: ['es', 'cjs'],

      // 当产物为 umd、iife 格式时，该模块暴露的全局变量名称
      name: "XwHttp",
      // 产物文件名称
      fileName: (format: string) => `xhttp.${format}.js`, // 根据格式自定义文件名
    },
    // true:混淆产物代码
    minify: false,
  }
})
