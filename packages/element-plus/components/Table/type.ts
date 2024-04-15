import type { Ref } from "vue";
import type { FormType } from "../Form/type.d.ts";
import { CompType } from "../../types/gloabl.d.ts";


export interface TableType {
  data: PaginationParamsType | Array<any>;   // 表格显示的数据
  attr?: Recordable;  // 参考 element-plus el-table 的属性以及HTML元素属性
  event?: Recordable; // 参考 element-plus el-table 的事件以及HTML事件属性
  ref?: Ref<T>;       //  el-table组件的实例对象
  loading?: Ref<boolean>;
  columns: Array<TableColumnType>; // 所要渲染的表格列的数组
  appendSlot?: string | CompType; // 尾部插槽名称 或配置对象
  emptySlot?: string | CompType; // 表格数据为空时插槽名称或配置对象
  pagination?: PaginationType; // 表格分页的配置对象
  seach?: FormType;  // 高级搜索配置
  [x: string]: any;
}

export interface TableColumnType {
  headerSlot?: string; // 表头插槽名称 或 配置
  defaultSlot?: string | CompType | Array<CompType>; // 默认插槽名称 或配置
  attr?: Recordable; // 参考 element-plus el-table-column 的属性以及HTML元素属性
}

// 分页参数类型
export interface PaginationParamsType {
  currentPage: number, // 当前页数的默认初始值，不设置时默认为 1
  data: Array<any>, // 表格数据
  pageSize: number, //每页数量
  total: number, // 总数量
}

export interface PaginationType {
  show: boolean, // 是否显示分页
  className?: string, // 组件类名称
  key?: string; // 组件 key 
  attr?: Recordable; // 组件属性
  event?: Recordable; // 组件事件
  children?: Array<CompType> | []; //组件子节点 dom 
  ref?: Ref<T>; // 组件 ref 引用
}
