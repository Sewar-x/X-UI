import type { AppContext, Ref } from "vue";
import type { FormType } from "@/components/Form/type";
import type { TableType } from "@/components/Table/type";

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
  id: string; //唯一id 删除组件时用于定位
  dialogVisible: Ref<Boolean>;
  attr?: Recordable;
  event?: Recordable;
  content?: Array<ContentType>;
  header?: CompType;
  footer?: CompType;
}

export interface ModalType {
  _context: AppContext | null;
}
