import type { Plugin } from 'vue'
import { App } from 'vue'
declare type SFCWithInstall<T> = T & Plugin & component

declare type component = {
  name: string
}
// 注册组件/插件：将一个组件的 install 方法绑定到一个 App 实例上
export const withInstall = <T extends component>(comp: T): Plugin => {
  // 在组件/插件 中添加 install 方法
  ;(comp as SFCWithInstall<T>).install = (app: App): void => {
    app.component(comp.name, comp)
  }
  return comp as SFCWithInstall<T>
}
