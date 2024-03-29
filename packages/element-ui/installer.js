import { XTable } from './components/table'
import { XMenu } from './components/menu'

const elmUiComponents = [
  XTable,
  XMenu
]

export const installer = (Vue) => {
  elmUiComponents.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
