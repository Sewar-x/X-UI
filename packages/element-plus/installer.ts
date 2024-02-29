import {App} from 'vue'
import { XTable } from './components/table'
import { XMenu } from './components/menu'

const elmPlusComponents = [
  XTable,
  XMenu
]

export const installer = (app: App) => {
  elmPlusComponents.forEach((comp) => app.use(comp))
}
