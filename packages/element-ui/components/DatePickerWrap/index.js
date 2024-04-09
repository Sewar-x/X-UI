import { withInstall } from '../../utils'
import datePickerWrap from './src/index.vue'
import dateChanger from './src/DateChanger.vue'

// 使用 withInstall 注册组件并导出组件
export const DatePickerWrap = withInstall(datePickerWrap)
export const DateChanger = withInstall(dateChanger)
// 使用 withInstall 注册组件并导出组件
export default {
  DatePickerWrap,
  DateChanger
}
