import type { AppContext, Ref } from "vue";
import type { FormType } from "../Form/type";
import type { TableType } from "../Table/type";
import type { CompType } from "../../types/gloabl.d";

export interface ContentFormType extends FormType {
  type: "Form",
  options: Object
}

export interface ContentTableType extends TableType {
  type: "Table",
  options: Object
}

interface ContentCompType extends CompType {
  type: "Component",
  options: Object
}

export type ContentType = ContentFormType | ContentTableType | ContentCompType
export type FooterType = "Button" | "Form" | "Component"
export interface OptionType {
  visible: Ref<Boolean>;
  id?: string; //唯一id 删除组件时用于定位
  attr?: Recordable;
  event?: Recordable;
  content?: Array<ContentType>;
  header?: CompType;
  footer?: {
    type: FooterType,// footer 组件类型
    fixedButton?: boolean, // 是否使用固定按钮
    options?: Object // 组件配置
    cancelCallback?: Function, // 取消按钮回调
    comfirmCallback?: Function// 确认按钮回调
  } | Object;
  slots?: Function
}

export interface ModalType {
  _context: AppContext | null;
}
