import * as path from 'path'
// vite-plugin-vue2 插件对 vue2 的 SFC 进行编译打包，对外提供一个能直接运行的产物
import { createVuePlugin } from 'vite-plugin-vue2'
import { alias } from '../../scripts'
import { defineConfig } from 'vite'
import { sitePublic } from '../../config/site'

export default defineConfig(async ({ command, mode }) => {
  let docsBuild = {}
  // 打包组件库文档，打包 demo 组件代码
  if (mode === 'docs') {
    docsBuild.base = `${sitePublic}/element-ui/`// demo 文档组件代码入口，打包成正常的单页应用，入口是 index.html。
    docsBuild.build = { //  demo 文档示例组件构建输出目录，输出到 vitepress 目录下
      outDir: '../../docs/.vitepress/dist/element-ui',
      // 如果你的资源需要被部署到 CDN，可以设置 publicPath  
      publicDir: `${sitePublic}/`, // 这将影响所有资源引用的路径  
    }
  }
  return {
    server: {
      port: '3633'
    },
    plugins: [
      createVuePlugin()
    ],
    build: {
      rollupOptions: {
        external: ['element-ui', 'vue']
      },
      lib: { //打包纯组件(供用户在业务项目中安装、导入、使用的组件)，入口是 /components/index.(js/ts)
        entry: path.resolve(__dirname, './components/index.js'),
        name: 'XWUi',
        fileName: 'xw-element-ui',
        formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: await alias()
    },
    ...docsBuild
  }
})

