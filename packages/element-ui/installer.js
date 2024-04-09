import { BasicComponent } from './components/BasicComponent'
import { XTable } from './components/table'
import { XTaskBoard } from './components/Board'
import { Tinymce } from './components/Tinymce'
import { XFileUpload } from './components/FileUpload'
export const elmUiComponents = [
  BasicComponent,
  XTable,
  XTaskBoard,
  Tinymce,
  XFileUpload
]

export const installer = (Vue) => {
  elmUiComponents.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
