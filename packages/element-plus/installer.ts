import { App } from 'vue'
import components from './components-entry'
// 遍历一次性注册所有组件
export const installer = (app: App) => {
  components.forEach((comp) => app.use(comp))
}
