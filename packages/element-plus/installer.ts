import { App } from 'vue'
<<<<<<< HEAD
import components from './components-entry'
=======
import { XBasicComponent } from './components/BasicComponent'
import { XBasicForm } from './components/Form'
// 组件列表
const elmPlusComponents = [
  XBasicComponent,
  XBasicForm
]
>>>>>>> feat-struct
// 遍历一次性注册所有组件
export const installer = (app: App) => {
  components.forEach((comp) => app.use(comp))
}
