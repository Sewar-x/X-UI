import { withInstall } from '../../utils'
import fileUploadWrap from './src/index.vue'
// 使用 withInstall 注册组件并导出组件
export const FileUploadWrap = withInstall(fileUploadWrap)
// 使用 withInstall 注册组件并导出组件
export default FileUploadWrap
