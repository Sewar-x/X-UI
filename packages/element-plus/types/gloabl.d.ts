import { type Component, type Ref } from "vue";



declare interface IconType {
  isSvgIcon: boolean;
  name: string;
  size?: number | string;
  color?: string;
  style?: object;
}

interface CompContentType {
  text: any;
  key?: string;
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
}

declare interface CompType {
  comp: string | Component; // 组件标签名称
  className?: string, // 组件类名称
  data?: any; // 传入组件数据
  key?: string; // 组件 key 
  attr?: Recordable; // 组件属性
  event?: Recordable; // 组件事件
  content?: CompContentType; // 组件内容
  children?: Array<CompType> | []; //组件子节点 dom 
  ref?: Ref<T>; // 组件 ref 引用
}
