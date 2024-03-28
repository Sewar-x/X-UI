import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { alias } from '../../scripts'
import { sitePublic } from '../../config/site'

export default defineConfig(async ({ command, mode }) => {
  let docsBuild = {}
  // 打包组件库文档，打包 demo 组件代码
  if (mode === 'docs') {
    docsBuild.base = `${sitePublic}/element-plus/`// demo 文档组件代码入口，打包成正常的单页应用，入口是 index.html。
    docsBuild.build = { //  demo 文档示例组件构建输出目录，输出到 vitepress 目录下
      outDir: '../../docs/.vitepress/dist/element-plus',
      // 如果你的资源需要被部署到 CDN，可以设置 publicPath  
      publicDir: `${sitePublic}/`, // 这将影响所有资源引用的路径  , // 这将影响所有资源引用的路径  
    }
  }
  return {
    server: {
      port: '3333'
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        external: ['element-plus', 'vue'] // 打包结果排除第三方包
      },
      lib: {//打包纯组件(供用户在业务项目中安装、导入、使用的组件)，入口是 /components/index.(js/ts)
        entry: path.resolve(__dirname, './components/index.ts'),
        name: 'xwElementPlus',
        fileName: 'xw-element-plus',
        formats: ['es', 'cjs', 'umd', 'iife'] // 构建输出 es、cjs、umd、iife 格式的包
      }
    },
    resolve: {
      alias: await alias()
    },
    ...docsBuild
  }
})
