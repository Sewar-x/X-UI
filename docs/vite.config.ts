import sideBarPlugin from './plugins/side-bar-plugin'
import sourceCode from './plugins/source-code'
import { defineConfig } from 'vite'
import path from 'path'
import { alias } from './plugins/alias'

export default defineConfig(async ({ command, mode }) => {
  const alia = await alias()
  return {
    server: {
      proxy: {
        '/assets': {
          target: 'http://localhost:8080',
          changeOrigin: true
        }
      }
    },
    plugins: [
      sideBarPlugin(), // 自动生成文档侧边栏插件
      sourceCode()//将 Markdown 文件中的代码示例转换为可显示在网页上的代码片段
    ],
    resolve: {
      alias: [
        ...alia, // 统一项目包别名
        {
          find: '@/',
          replacement: path.join(__dirname, '/')
        }
      ]
    }
  }
})
