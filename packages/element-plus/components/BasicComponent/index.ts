import { withInstall } from '../../utils'

import basicComponent from './src/BasicComponent.vue'
// 使用 withInstall 注册组件并导出组件
export const BasicComponent = withInstall(basicComponent)
// 使用 withInstall 注册组件并导出组件
export default BasicComponent

