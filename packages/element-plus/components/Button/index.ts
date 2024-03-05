import { withInstall } from '../../utils'

import Button from './button.vue'
// 使用 withInstall 注册组件并导出组件
export const XButton = withInstall(Button)
// 使用 withInstall 注册组件并导出组件
export default XButton

export * from '.'
