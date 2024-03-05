import { withInstall } from '../../utils'

import BasicComponent from './BasicComponent.vue'
// 使用 withInstall 注册组件并导出组件
export const XBasicComponent = withInstall(BasicComponent)
// 使用 withInstall 注册组件并导出组件
export default XBasicComponent

export * from './'
