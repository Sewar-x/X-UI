//纯组件统一导出入口
export { createDateRangeShortcuts } from './utils'
import { installer as install } from './installer'
import components from './components-entry'
export default {
  install,
  ...components
}
