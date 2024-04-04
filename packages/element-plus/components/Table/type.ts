import type { Ref } from "vue";
import type { FormType } from "@/components/Form/type";

export interface TableType {
  data: Array<any>;
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  loading?: Ref<boolean>;
  columnArr: Array<TableColumnType>;
  appendSlotConfig?: CompType;
  emptySlotConfig?: CompType;
  pagination?: CompType;
  seachOptions?: FormType;
  [x: string]: any;
}

interface TableColumnType {
  headerSlotName?: string;
  headerSlotConfig?: CompType;
  defaultSlotName?: string;
  defaultSlotConfig?: CompType | Array<CompType>;
  attr?: Recordable;
}
