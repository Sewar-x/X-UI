import { App, Component } from 'vue'
import Theme from 'vitepress/theme'
import '../../public/css/custom-style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import XWComponents from '@xw-ui/xw-element-plus'
import { globals } from '../components'

export default {
  ...Theme,
  enhanceApp({ app }: { app: App }) {
    // 全局注册 element-plus 组件库，在 markdown 中使用
    app.use(XWComponents)
    // 全局注册 demo 展示组件
    globals.forEach((comp: Component) => {
      app.component(comp.name as string, comp)
    })
  }
}
