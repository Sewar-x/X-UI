// 定义一个组件类型
function isComponent(obj) {
  return obj && typeof obj === 'object' && 'name' in obj
}

// 注册组件/插件：将一个组件的 install 方法绑定到一个 App 实例上
export function withInstall(comp) {
  // 检查传入的组件是否符合要求
  if (!isComponent(comp)) {
    throw new Error('Invalid component provided to `withInstall`')
  }

  // 在组件/插件 中添加 install 方法
  comp.install = function (app) {
    if (!app || !app.component) {
      throw new Error('Invalid Vue app provided to `install` method')
    }

    // 使用 Vue 的全局方法 `app.component` 注册组件
    app.component(comp.name, comp)
  }

  // 返回增强后的组件
  return comp
}