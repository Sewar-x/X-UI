import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { alias } from "../../scripts";
import { sitePublic } from '../../config/site'

export default defineConfig(async ({ command, mode }) => {
  let docsBuild = {}
  // 打包组件库文档，打包 demo 组件代码
  if (mode === 'docs') {
    docsBuild.base = sitePublic // demo 文档组件代码入口，打包成正常的单页应用，入口是 index.html。
    docsBuild.build = { //  demo 文档示例组件构建输出目录，输出到 vitepress 目录下
      outDir: '../../docs/.vitepress/dist/ant-design',
      // 如果你的资源需要被部署到 CDN，可以设置 publicPath  
      publicPath: sitePublic, // 这将影响所有资源引用的路径  
    }
  }
  return {
    server: {
      port: '3933'
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        external: ['react', 'react-dom', 'ant-design']
      },
      lib: {
        entry: path.resolve(__dirname, './components/index.ts'),
        name: 'XWUi',
        fileName: 'xw-ant-design',
        formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: await alias()
    },
    ...docsBuild
  }
})
