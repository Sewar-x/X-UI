import type { Ref } from "vue";

// el-menu 配置对象参数
export interface MenuType {
  attr?: Recordable;    // el-menu 属性
  event?: Recordable; // el-menu 事件
  ref?: Ref<T>; // el-menu 引用
  menu: Array<MenuItemType>;  // el-menu-item 子节点配置
  component?: CompType; // 默认插槽组件
}
// el-menu-item 子节点配置
export interface MenuItemType {
  attr?: Recordable; // 属性
  event?: Recordable; // 事件
  subMenu?: Array<MenuItemType>; // 子节点
  icon?: IconType; // 图标
  title?: string; // 菜单文本
  component?: CompType; // 默认插槽组件
}
