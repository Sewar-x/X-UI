import type { Ref } from "vue";

// el-menu 配置对象参数
export interface MenuType {
  attr?: Recordable;    // el-menu 属性
  event?: Recordable; // el-menu 事件
  ref?: Ref<T>; // el-menu 引用
  itemArr: Array<MenuItemType>;  // el-menu-item 子节点配置
}
// el-menu-item 子节点配置
export interface MenuItemType {
  attr?: Recordable; // 属性
  event?: Recordable; // 事件
  itemArr?: Array<MenuItemType>; // 子节点
  icon?: IconType; // 图标
  text?: string; // 菜单文本
}
