import * as path from 'path'
// vite-plugin-vue2 插件对 vue2 的 SFC 进行编译打包，对外提供一个能直接运行的产物
import { createVuePlugin } from 'vite-plugin-vue2'
import { alias } from '../../scripts'
import { defineConfig } from 'vite'
import { docsSite } from '../../config/site'

export default defineConfig(async ({ command, mode }) => {
  const alia = await alias()
  let docsBuild = {
    base: `${docsSite}/element-ui/`,// demo 文档组件代码入口，打包成正常的单页应用，入口是 index.html。
    build: { //  demo 文档示例组件构建输出目录，输出到 vitepress 目录下
      outDir: '../../docs/.vitepress/dist/element-ui',
      // 如果你的资源需要被部署到 CDN，可以设置 publicPath  
      publicDir: `${docsSite}/`, // 这将影响所有资源引用的路径  
    }
  }
  const configs = {
    server: {
      port: '3633'
    },
    plugins: [
      createVuePlugin()
    ],
    build: {
      rollupOptions: {
        output: {
          // 根据不同的格式设置不同的目录  
          entryFileNames: '[name].[format].js', // 为每种格式指定不同的文件名模板  
          chunkFileNames: '[name]-[hash].[format].js', // 同样为chunks指定不同的文件名模板  
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'xw-element-vendor'
          }
        },
        external: ['element-ui', 'vue']
      },
      lib: { //打包纯组件(供用户在业务项目中安装、导入、使用的组件)，入口是 /components/index.(js/ts)
        entry: path.resolve(__dirname, './index.js'),
        name: 'xwElementUi',
        fileName: (format) => `xw-element-ui.${format}.js`, // 根据格式自定义文件名
        formats: ['es', 'cjs']
      }
    },
    resolve: {
      alias: alia
    },
  }
  return mode === 'docs' ? Object.assign(configs, docsBuild) : configs
})

