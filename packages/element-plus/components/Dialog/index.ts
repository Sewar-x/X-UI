import { withInstall } from '../../utils'
import Dialog from "./src/XDialog.vue";
import createDialog from "./src/CreateDialog.ts";


export const CreateDialog = createDialog
// 使用 withInstall 注册组件并导出组件
export const XDialog = withInstall(Dialog)
export default {
  CreateDialog,
  XDialog,
}

