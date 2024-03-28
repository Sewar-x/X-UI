export { createDateRangeShortcuts } from './utils/time'
import { installer as install } from './installer'
import components from './components-entry'
export default {
  install,
  ...components
}
