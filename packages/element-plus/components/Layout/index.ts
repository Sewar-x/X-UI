import { withInstall } from '../../utils'
import layout from "./src/LayoutMenu.vue";



// 使用 withInstall 注册组件并导出组件
export const LayoutMenu = withInstall(layout)
export default {
  LayoutMenu
}