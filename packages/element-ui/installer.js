import { BasicComponent } from './components/BasicComponent'
import { XTable } from './components/table'
import {
  XTaskBoard,
  TopContent,
  DialogEdit,
  DialogAdd,
  ChildTask,
} from './components/Board'
import { Tinymce } from './components/Tinymce'
import { FileUploadWrap } from './components/FileUploadWrap'
import { AdvancedSearchWrap } from './components/AdvancedSearchWrap'
import { FormWrap } from './components/FormWrap'
import { RemoteSearchSelector } from './components/RemoteSearchSelector'
import { DatePickerWrap, DateChangerWrap } from './components/DatePickerWrap'
import { SelectorWrap } from './components/SelectorWrap'
import { DialogWrap } from './components/DialogWrap'
import { XOnlyOffice } from './components/OnlyOffice'
export const elmUiComponents = [
  BasicComponent,
  XTable,
  FormWrap,
  DialogWrap,
  XTaskBoard,
  TopContent,
  DialogEdit,
  DialogAdd,
  ChildTask,
  Tinymce,
  FileUploadWrap,
  AdvancedSearchWrap,
  RemoteSearchSelector,
  DatePickerWrap,
  DateChangerWrap,
  SelectorWrap,
  XOnlyOffice
]

export const installer = (Vue) => {
  elmUiComponents.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
