import type { App } from 'vue'
import { BasicComponent } from './components/BasicComponent'
import { XForm } from './components/Form'
import { XButton } from './components/Button'
import { XDescriptions } from './components/Descriptions'
import { XDialog } from './components/Dialog'
import { XSvgIcon, XIcon } from './components/Icon'
import { XMenu, MenuItem } from './components/Menu'
import { XPopover } from './components/Popover'
import { XSearch } from './components/Search'
import { XSwiper } from './components/Swiper'
import { XTable } from './components/Table'
import { XUpload } from './components/Upload'
// 组件列表
export const elmPlusComponents = [
  BasicComponent,
  XForm,
  XButton,
  XDescriptions,
  XDialog,
  XSvgIcon,
  XIcon,
  XMenu,
  MenuItem,
  XPopover,
  XSearch,
  XSwiper,
  XTable,
  XUpload
]
// 遍历一次性注册所有组件
export const installer = (app: App) => {
  elmPlusComponents.forEach((comp) => app.use(comp))
}
