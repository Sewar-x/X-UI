//纯组件统一导出入口
export * from './components'
export { createDateRangeShortcuts } from './utils'

import { installer as install } from './installer'

export default {
  install
}
