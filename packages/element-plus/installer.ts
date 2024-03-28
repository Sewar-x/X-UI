import { App } from 'vue'
import { XBasicComponent } from './components/BasicComponent'
import { XBasicForm } from './components/Form'
// 组件列表
const elmPlusComponents = [
  XBasicComponent,
  XBasicForm
]
// 遍历一次性注册所有组件
export const installer = (app: App) => {
  elmPlusComponents.forEach((comp) => app.use(comp))
}
