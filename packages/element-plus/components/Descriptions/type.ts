import type { Ref } from "vue";
import type { CompType } from "../../types/gloabl.d";
export interface DescriptionsType {
  attr?: Recordable; // 属性对象
  event?: Recordable; // 事件对象
  ref?: Ref<T>; // 实例引用
  items: Array<DescriptionsItemType>; // 子组件列表
  titleSlotConfig?: CompType; // 描述列表标题插槽配置对象（使用配置对象方式生成插槽组件）
  titleSlotName?: string; // 描述列表标题插槽名称（使用模板插入插槽方式）
  extraSlotConfig?: CompType; // 	自定义操作区配置对象，显示在右上方
  extraSlotName?: string; // 	自定义操作区插槽名称，显示在右上方
}

interface DescriptionsItemType {
  attr?: Recordable;
  event?: Recordable;
  labelSlotName?: string;  // 自定义标签插槽名称
  labelSlotConfig?: CompType; // 自定义标签配置对象
  defaultSlotConfig?: CompType;  // 默认插槽配置对象
  defaultSlotName?: string; // 默认插槽名称
}
