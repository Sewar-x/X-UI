import { BasicComponent } from './components/BasicComponent'
import { XTable } from './components/table'

export const elmUiComponents = [
  BasicComponent,
  XTable
]

export const installer = (Vue) => {
  elmUiComponents.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
