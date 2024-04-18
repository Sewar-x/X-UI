import type { FormType } from "../Form/type.d.ts"
// BasicForm接收参数类型
export interface SearchType {
  form?: FormType, // 筛选项
  cardAttr?: Recordable ,// element plus card 属性
  inputShow?: boolean, // 是否显示模糊搜索输入框
  buttons?: // 模糊搜索按钮组配置
}

