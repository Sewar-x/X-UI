import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { alias } from "../../scripts";
import { docsSite } from '../../config/site'
export default defineConfig(async ({ command, mode }: ConfigEnv) => {
  const alia = await alias()
  let docsBuild = { // 构建参数 mode 为 'docs' 时候配置
    base: `${docsSite}/ant-design/`, // demo 文档组件代码入口，打包成正常的单页应用，入口是 index.html。
    build: { //  demo 文档示例组件构建输出目录，输出到 vitepress 目录下
      outDir: '../../docs/.vitepress/dist/ant-design',
      // 如果你的资源需要被部署到 CDN，可以设置 publicPath  
      publicDir: `${docsSite}/`, // 这将影响所有资源引用的路径  
    }
  }
  const configs = {
    base: '',
    server: {
      port: '3933'
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        external: ['react', 'react-dom', 'ant-design'],
        output: {
          // 导出为 UMD、ES、CommonJS 格式  
          globals: {
            react: 'React',
            'ant-design': 'AntDesign'
          },
          exports: 'named', // 使用命名导出  
          // 如果你需要自定义的 UMD 名称，可以在这里设置  
          // umdName: 'xwElementPlus'  
        }
      },
      lib: {
        entry: path.resolve(__dirname, './components/index.ts'),
        name: 'xwAntDesign',
        fileName: 'xw-ant-design',
        formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: alia
    },

  }
  return mode === 'docs' ? Object.assign(configs, docsBuild) : configs
})
