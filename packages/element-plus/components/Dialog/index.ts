import { withInstall } from '../../utils'
import Dialog from "./src/XDialog.vue";
import { h, render } from "vue";
import type { ModalType, OptionType } from "./type";

export const XModal: ModalType = {
  _context: null,
};

export const createDialog = (options: OptionType) => {
  if (document.querySelector(`#${options.id}`)) {
    return;
  }
  const dialogNode = document.createElement("div");
  dialogNode.setAttribute("id", options.id);
  document.body.appendChild(dialogNode);
  const { dialogVisible, attr, event, content, header, footer } = options;
  const vnode = h(Dialog as any, {
    dialogVisible,
    attr,
    event,
    content,
    header,
    footer,
  });
  vnode.appContext = XModal._context;
  render(vnode, dialogNode);
};
// 使用 withInstall 注册组件并导出组件
export const XDialog = withInstall(Dialog)
// 使用 withInstall 注册组件并导出组件
export default {
  XDialog,
  XModal
}

