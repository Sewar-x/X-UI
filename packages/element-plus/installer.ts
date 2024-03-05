import { App } from 'vue'
import { XTable } from './components/table'
import { XMenu } from './components/menu'
import { XButton } from './components/Button'
// 组件列表
const elmPlusComponents = [
  XTable,
  XMenu,
  XButton
]
// 遍历一次性注册所有组件
export const installer = (app: App) => {
  elmPlusComponents.forEach((comp) => app.use(comp))
}
