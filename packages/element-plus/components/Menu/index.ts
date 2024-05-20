import { withInstall } from '../../utils'
import basicMenu from "./src/BasicMenu.vue";
import menuItem from "./src/MenuItem.vue";


// 使用 withInstall 注册组件并导出组件
export const XMenu = withInstall(basicMenu)
export const XMenuItem = withInstall(menuItem)
// 使用 withInstall 注册组件并导出组件
export default {
  XMenu,
  XMenuItem
}