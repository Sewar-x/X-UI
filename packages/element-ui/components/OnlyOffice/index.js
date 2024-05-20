import { withInstall } from '../../utils'
import onlyOffice from './src/index.vue'
import { opendFileByOnlyOffice } from "./src/viewers"
import { initOnlyOffice } from "./src/init"
import onlyOfficePermissions from "./src/permission/permission"
// 使用 withInstall 注册组件并导出组件
export const XOnlyOffice = withInstall(onlyOffice)
export const opendByOnlyOffice = opendFileByOnlyOffice
export const init = initOnlyOffice
export const permissions = onlyOfficePermissions
// 使用 withInstall 注册组件并导出组件
export default XOnlyOffice
