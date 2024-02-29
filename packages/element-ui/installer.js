import { XTable } from './components/table'
import { VcMenu } from './components/menu'

const elmUiComponents = [
  XTable,
  VcMenu
]

export const installer = (Vue) => {
  elmUiComponents.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
