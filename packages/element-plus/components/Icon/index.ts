import { withInstall } from '../../utils'
import svgIcon from "./src/SvgIcon.vue"
import icon from "./src/Icon.vue"

// 使用 withInstall 注册组件并导出组件
export const XSvgIcon = withInstall(svgIcon)
export const XIcon = withInstall(icon)
// 使用 withInstall 注册组件并导出组件
export default {
  XSvgIcon,
  XIcon
}