import { withInstall } from '../../utils'
import onlyOffice from './src/index.vue'
export * from "./src/viewers"
export * from "./src/init"
export * from "./src/permission/permission"
// 使用 withInstall 注册组件并导出组件
export const OnlyOffice = withInstall(onlyOffice)
// 使用 withInstall 注册组件并导出组件
export default OnlyOffice
