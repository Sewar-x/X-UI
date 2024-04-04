import XDialog from "./src/XDialog.vue";
import { h, render } from "vue";
import type { ModalType, OptionType } from "./type";

const Modal: ModalType = {
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
  const vnode = h(XDialog as any, {
    dialogVisible,
    attr,
    event,
    content,
    header,
    footer,
  });
  vnode.appContext = Modal._context;
  render(vnode, dialogNode);
};

export default Modal;
