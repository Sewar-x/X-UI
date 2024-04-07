import { BasicComponent } from './components/BasicComponent'
import { XTable } from './components/table'
import { XTaskBoard } from './components/Board'
export const elmUiComponents = [
  BasicComponent,
  XTable,
  XTaskBoard
]

export const installer = (Vue) => {
  elmUiComponents.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
