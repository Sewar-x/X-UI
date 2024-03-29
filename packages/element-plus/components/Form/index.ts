import { withInstall } from '../../utils'

import BasicForm from './BasicForm.vue'
// 使用 withInstall 注册组件并导出组件
export const XBasicForm = withInstall(BasicForm)
// 使用 withInstall 注册组件并导出组件
export default XBasicForm

export * from './'
