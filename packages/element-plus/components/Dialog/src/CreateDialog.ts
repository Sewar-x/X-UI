import { createApp, h, VNode, ref } from 'vue';
import Dialog from './XDialog.vue';
import type { OptionType } from "../type";


// Dialog 实例类  
class DialogInstance {
  el: HTMLElement;
  vnode: VNode;
  options: OptionType;
  app: ReturnType<typeof createApp>;

  constructor(el: HTMLElement, vnode: VNode, options: OptionType) {
    this.el = el;
    this.vnode = vnode;
    this.options = options;
    this.app = createApp({
      render() {
        return vnode;
      }
    });

    // 挂载到 DOM  
    this.app.mount(this.el);
  }

  // 打开弹窗（这里可能不需要，因为通常创建即打开）  
  open() {
    // 如果需要额外的打开逻辑，可以在这里添加  
    this.options.visible = ref(true)
  }

  // 关闭弹窗  
  close() {
    this.options.visible = ref(false)

  }

  // 销毁弹窗（同 close）  
  destroy() {
    // 清理逻辑，如移除事件监听器等  
    this.app.unmount();
    this.el.remove();
  }
}

// createDialog 函数  
export default function createDialog(options: OptionType): DialogInstance | null {
  if (!options.id) {
    console.error('使用 createDialog 方法需要传入 dialog id!');
    return null;
  }

  // 检查是否已存在相同 id 的弹窗  
  if (document.getElementById(options.id)) {
    console.error('已存在相同 id 的弹窗!');
    return null;
  }

  const dialogNode = document.createElement('div');
  dialogNode.id = options.id;
  document.body.appendChild(dialogNode);

  const vnode = h(Dialog, options);

  // 创建并返回 DialogInstance 实例  
  return new DialogInstance(dialogNode, vnode, options);
}



