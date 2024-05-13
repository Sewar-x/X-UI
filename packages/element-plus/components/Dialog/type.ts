import type { AppContext, Ref } from "vue";
import type { FormType } from "../Form/type";
import type { TableType } from "../Table/type";
import type { CompType } from "../../types/gloabl.d";

export interface ContentFormType extends FormType {
  type: "Form"
}

export interface ContentTableType extends TableType {
  type: "Table"
}

interface ContentCompType extends CompType {
  type: "Component"
}

export type ContentType = ContentFormType | ContentTableType | ContentCompType

export interface OptionType {
  visible: Ref<Boolean>;
  id?: string; //唯一id 删除组件时用于定位
  attr?: Recordable;
  event?: Recordable;
  content?: Array<ContentType>;
  header?: CompType;
  footer?: CompType;
  slots?: Function
}

export interface ModalType {
  _context: AppContext | null;
}
