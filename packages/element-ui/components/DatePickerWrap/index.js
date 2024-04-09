import { withInstall } from '../../utils'
import datePickerWrap from './src/index.vue'
import dateChangerWrap from './src/DateChanger.vue'

// 使用 withInstall 注册组件并导出组件
export const DatePickerWrap = withInstall(datePickerWrap)
export const DateChangerWrap = withInstall(dateChangerWrap)
// 使用 withInstall 注册组件并导出组件
export default {
  DatePickerWrap,
  DateChangerWrap
}
