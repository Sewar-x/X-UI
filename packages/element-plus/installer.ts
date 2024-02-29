import {App} from 'vue'
import { XTable } from './components/table'
import { VcMenu } from './components/menu'

const elmPlusComponents = [
  XTable,
  VcMenu
]

export const installer = (app: App) => {
  elmPlusComponents.forEach((comp) => app.use(comp))
}
