import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { alias } from '../../scripts'
import { docsSite } from '../../config/site'

export default defineConfig(async ({ command, mode }: ConfigEnv) => {
  const alia = await alias()
  // 构建参数 mode 为 'docs' 时候配置
  let docsBuild = {
    // 开发或生产环境服务的公共基础路径，该路径影响路由组件前缀，在单页面应用中在所有路由路径添加 base 配置的前缀
    base: `${docsSite}/element-plus/`,
    build: { 
      //  demo 文档示例组件构建输出目录，输出到 vitepress 目录下
      outDir: '../../docs/.vitepress/dist/element-plus',
     // publicDir 影响 html 页面中所有资源引用的路径。注意在单页面应用中使用绝对路径，通过 协议+域名+绝对路径 生成最终资源地址
      publicDir: `${docsSite}/`, 
    }
  }

  const configs = {
    server: {
      port: '3333'
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        external: ['element-plus', 'vue'] // 打包结果排除第三方包，不打包 'element-plus'和 'vue'
      },
      lib: {//打包纯组件(供用户在业务项目中安装、导入、使用的组件)，入口是 /components/index.(js/ts)
        entry: path.resolve(__dirname, './index.ts'),
        name: 'xwElementPlus',
        fileName: 'xw-element-plus',
        formats: ['es', 'cjs', 'umd', 'iife'] // 构建输出 es、cjs、umd、iife 格式的包
      }
    },
    resolve: {
      alias: alia
    },
  }
  return mode === 'docs' ? Object.assign(configs, docsBuild) : configs
})
