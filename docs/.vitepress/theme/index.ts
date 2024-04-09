import { App, Component } from 'vue'
import Theme from 'vitepress/theme'
import '../../public/css/custom-style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { globals } from '../components'

export default {
  // 使用 vitepress 默认主题
  ...Theme,
  //扩展另一个主题，在我们的主题之前调用它的 `enhanceApp`
  enhanceApp({ app }: { app: App }) {
    // 全局注册 demo 展示组件
    globals.forEach((comp: Component) => {
      app.component(comp.name as string, comp)
    })
  }
}

