import { withInstall } from '../../utils'
import board from './src/index.vue'
import topContent from "./src/components/card/TopContent.vue";
import dialogEdit from "./src/components/modify/DialogEdit.vue";
import dialogAdd from "./src/components/modify/DialogAdd.vue";
import childTask from "./src/components/ChildTask.vue";

// 使用 withInstall 注册组件并导出组件
export const XTaskBoard = withInstall(board)
export const TopContent = withInstall(topContent)
export const DialogEdit = withInstall(dialogEdit)
export const DialogAdd = withInstall(dialogAdd)
export const ChildTask = withInstall(childTask)

export default {
  XTaskBoard,
  TopContent,
  DialogEdit,
  DialogAdd,
  ChildTask,
}