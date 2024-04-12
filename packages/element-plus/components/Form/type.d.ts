import type { Ref } from "vue";

// BasicForm接收参数类型
export interface FormType {
  // 响应数据对象
  mode: Recordable;
  // el-form 属性对象
  attr?: Recordable;
  ref?: Ref<T>;
  // 表单项数组
  items: Array<Array<FormItemType>>;
}

export interface FormItemType {
  // 表单项占据尺寸
  span?: number;
  colAttr?: Recordable;
  // 表单项 el-form-item 属性对象
  attr?: Recordable;
  // 表单项所要渲染的组件
  component: ComponentType;
}

export interface ComponentType extends CompType {
  // 公共事件
  publicEvent?: string;
}
