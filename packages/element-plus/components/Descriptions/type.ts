import type { Ref } from "vue";
import type { CompType } from "../../types/gloabl.d";
export interface DescriptionsType {
  attr?: Recordable; // 属性对象
  event?: Recordable; // 事件对象
  ref?: Ref<T>; // 实例引用
  items: Array<DescriptionsItemType>; // 子组件列表
  titleSlot?: CompType | string; // 描述列表标题插槽配置对象或标题插槽名称（使用配置对象方式生成插槽组件）
  extraSlot?: CompType | string; // 	自定义操作区配置对象或者操作区插槽名称，显示在右上方
  defaultSlot?: CompType | string;  // 默认插槽配置对象或插槽名称
}

interface DescriptionsItemType {
  attr?: Recordable;
  event?: Recordable;
  labelSlot?: CompType | string;  // 自定义标签插槽名称或标签配置对象
  defaultSlot?: CompType | string;  // 默认插槽配置对象或插槽名称
}
