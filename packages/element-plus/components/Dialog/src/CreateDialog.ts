import { createApp, h, ref, reactive } from 'vue';
import type { Ref } from 'vue';
import Dialog from './XDialog.vue';
import type { OptionType } from "../type"; // 假设 OptionType 包含了 id 和其他必要的 props  
import ElementPlus from 'element-plus'
// 用于存储 DialogInstance 实例的 Map  
const dialogInstances = new Map<string, DialogInstance>();

// Dialog 实例类  
class DialogInstance {
  el: HTMLElement;
  options: OptionType;
  content: Array<any>;
  app: ReturnType<typeof createApp>;
  visible: Ref<boolean>; // 假设 OptionType 包含了 visible 属性  

  constructor(el: HTMLElement, options: OptionType) {

    this.el = el;
    this.options = options;
    this.content = reactive(options.content || [])
    this.visible = ref(false); // 初始时不可见  
    this.app = this.createVue();

  }
  // 创建 Vue 弹窗实例
  createVue() {
    let that = this
    const app = createApp({
      // 使用 render 函数来动态渲染弹窗组件  
      render() {
        // 处理插槽内容（如果需要的话）  
        let slots = {};
        if (that.options.slots) {
          // 根据 DialogComponent 的需求调整插槽的处理  
          slots = that.options.slots;
        }
        // 返回弹窗组件的 VNode  
        // 注意：这里传递 visible 作为 prop  
        return h(Dialog, {
          options: {
            ...that.options, // 假设 options 包含了除插槽之外的所有 props  
            content: that.content,
            visible: that.visible, // 使用响应式引用的值  
          }
        }, slots.default ? slots.default() : []);
      }
    })

    app.use(ElementPlus)
    // 挂载到 DOM  
    app.mount(this.el);
    return app
  }

  // 打开弹窗  
  public show() {
    document.body.appendChild(this.el);
    this.visible.value = true; // 设置为可见  
  }

  // 关闭弹窗  
  public close() {
    this.visible.value = false; // 设置为不可见  
    this.el.remove();
  }

  // 重置弹窗内容
  public resetContent(content: Array<any>) {
    this.app.unmount()
    this.content = reactive(content || [])
    this.app = this.createVue();
  }


  // 销毁弹窗  
  destroy() {
    // 清理逻辑，如移除事件监听器等（如果有的话）  
    this.app.unmount();

  }
}

// 创建或获取 DialogInstance 的工厂函数  
function getInstanceOrCreate(id: string, options: OptionType): DialogInstance {
  let instance = dialogInstances.get(id);
  if (!instance) {
    // 创建新的 div 元素作为挂载点  
    const dialogNode = document.createElement('div');
    dialogNode.id = id;

    // 创建新的 DialogInstance 实例  
    instance = new DialogInstance(dialogNode, options);

    // 将实例添加到 Map 中  
    dialogInstances.set(id, instance);
  }

  // 返回找到的或创建的实例  
  return instance;
}

// createDialog 函数  
export default function CreateDialog(options: OptionType): DialogInstance | null {
  if (!options.id) {
    console.error('使用 createDialog 方法需要传入 dialog id!');
    return null;
  }

  // 获取或创建 DialogInstance 实例  
  const instance = getInstanceOrCreate(options.id, options);
  return instance
}