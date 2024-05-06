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
        output: {
          // 根据不同的格式设置不同的目录  
          entryFileNames: '[name].[format].js', // 为每种格式指定不同的文件名模板  
          chunkFileNames: '[name]-[hash].[format].js', // 同样为chunks指定不同的文件名模板  
        },
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return 'xw-ant-design-vendor'
          }
        },
        external: ['react', 'react-dom', 'ant-design']
      },
      lib: {
        entry: path.resolve(__dirname, './index.ts'),
        name: 'xwAntDesign',
        fileName: (format: string) => `xw-ant-design.${format}.js`, // 根据格式自定义文件名
        formats: ['es', 'cjs']
      }
    },
    resolve: {
      alias: alia
    },

  }
  return mode === 'docs' ? Object.assign(configs, docsBuild) : configs
})
