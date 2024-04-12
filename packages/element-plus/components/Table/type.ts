import type { Ref } from "vue";
import type { FormType } from "@/components/Form/type";

export interface TableType {
  data: Array<any>;   // 表格显示的数据
  attr?: Recordable;  // 参考 element-plus el-table 的属性以及HTML元素属性
  event?: Recordable; // 参考 element-plus el-table 的事件以及HTML事件属性
  ref?: Ref<T>;       //  el-table组件的实例对象
  loading?: Ref<boolean>;
  columns: Array<TableColumnType>; // 所要渲染的表格列的数组
  appendSlotConfig?: CompType; // 表格最后一行插槽的配置对象
  emptySlotConfig?: CompType; // 表格数据为空时插槽的配置对象
  pagination?: CompType; // 表格分页的配置对象
  seachOptions?: FormType;  // 高级搜索配置
  [x: string]: any;
}

interface TableColumnType {
  headerSlotName?: string;
  headerSlotConfig?: CompType;
  defaultSlotName?: string;
  defaultSlotConfig?: CompType | Array<CompType>;
  attr?: Recordable;
}
