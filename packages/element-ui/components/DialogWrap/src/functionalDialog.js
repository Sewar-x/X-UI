import component from './index.vue'
function useDialogWrap(Vue) {
  Vue.prototype.$dialogwrap = options => {
    const Constructor = Vue.extend(component)
    const instance = new Constructor()
    // 将插槽内容传递给组件
    if (options.slots) {
      instance.$slots = options.slots
    }
    instance.$mount()
    document.body.appendChild(instance.$el)
    // 指令式调用时，添加 isFunctional 为 true 标识
    Object.assign(instance, options, { isFunctional: true })
    return instance.show()
  }
}

export default useDialogWrap
