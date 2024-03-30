import * as path from 'path'
// vite-plugin-vue2 插件对 vue2 的 SFC 进行编译打包，对外提供一个能直接运行的产物
import { createVuePlugin } from 'vite-plugin-vue2'
import { alias } from '../../scripts'
import { defineConfig } from 'vite'
import { docsSite } from '../../config/site'

export default defineConfig(async ({ command, mode }) => {
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
        external: ['element-ui', 'vue'],
        output: {
          // 导出为 UMD、ES、CommonJS 格式  
          globals: {
            vue: 'Vue',
            'element': 'Element'
          },
          exports: 'named', // 使用命名导出  
          // 如果你需要自定义的 UMD 名称，可以在这里设置  
          // umdName: 'xwElementUI'  
        }
      },
      lib: { //打包纯组件(供用户在业务项目中安装、导入、使用的组件)，入口是 /components/index.(js/ts)
        entry: path.resolve(__dirname, './components/index.js'),
        name: 'xwElementUi',
        fileName: 'xw-element-ui',
        formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: await alias()
    },
  }
  return mode === 'docs' ? Object.assign(configs, docsBuild) : configs
})

