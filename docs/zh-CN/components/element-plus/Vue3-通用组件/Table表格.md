# 表格组件

表格组件是对 [Element Plus 的表格组件](https://element-plus.org/zh-CN/component/table.html)进行二次封装成 JSON 配置模式，除了支持 Element Plus 的 table 基本功能之外还扩展了其他功能：表格内置组件

## 功能

| 功能             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| 表格单元内置组件 | 通过配置表格 `defaultSlot` 配置，可以在表格内配置自定义组件  |
| 自定义分页       | 默认支持表格分页，如果不使用分页，则 `pagination` 设置为 false |
| 高级搜索         | 支持表格的高级搜索联动，传入 `seach` 配置，则自动显示高级搜索，配置项可参考高级搜索组件 |
| 其他功能         | 参考 [Element Plus 表格组件 ](https://element-plus.org/zh-CN/component/table.html)功能 |



## 文件说明

组件文件：`/element-plus/components/Table/src/BasicTable.vue`

组件类型文件： `/element-plus/components/Table/types.ts`

::: details  组件类型定义

```typescript
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

```

:::



## 特性

1. **JSON 配置**：传递指定格式的  `json`  对象给组件 `BasicTable`，组件会以此渲染对应的表格

2. **自定义插槽**：

   * 通过设置每一列的渲染属性对象中的 `headerSlot`、`defaultSlot`，可以指定每一列各自的表头插槽和内容插槽，再由父组件传递指定插槽内容就可以单独为每一列实现表头、内容，且每一个内容插槽都会返回给父组件当前行数据对象`CurrentRowData`，也可以传入对象将插槽 JSON 配置化。

3. **自动绑定表格数据**：当表格列的内容为一系列输入框时，会依据当前列的属性对象`attr`中的`prop`绑定当前行响应式数据对象`scope.row`中对应的属性值。

   

##  参数 `JSON  `格式

```json
<options> = {
  data: [],   // 表格显示的数据
  attr: {},   // 参考 element-plus el-table 的属性以及HTML元素属性
  event: {},  // 参考 element-plus el-table 的事件以及HTML事件属性
  ref: ref(), // el-table组件的实例对象
  loading: false, // 表格 loading
  appendSlot: string | CompType; // 尾部插槽名称 或配置对象
  emptySlot: string | CompType; // 表格数据为空时插槽名称或配置对象
  type: "Table", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  seachOptions:  // 高级搜索配置
  columns: [	// 所要渲染的表格列的数组
    {
      headerSlot: string; // 表头插槽名称 或 配置
  	  defaultSlot: string | CompType | Array<CompType>; // 默认插槽名称 或配置
      attr: {	// 参考 element-plus el-table-column 的属性以及HTML元素属性

      }
    }，
  ]
}

```



### 参数说明
#### TableType

| 属性名       | 说明                                                         |           类型           | 默认值  |
| :----------- | :----------------------------------------------------------- | :----------------------: | :-----: |
| `pagination` | 分页配置项：默认使用表格分页，如果不使用表格分页，传入 false;<br /> | `PaginationType` | `{currentPage: 1,data:[], pageSize: 10,total: 外部传入}` |
| `data`       | 表格显示的数据，根据是否使用分页传入不同的data格式：<br />当使用分页时候，传入 `PaginationParamsType` 类型参数（类型见下面说明）；<br />当不使用分页时候，传入数据对象 |         `PaginationParamsType`或`Array`         |    -    |
| `attr`       | `el-table`的属性对象，值为`element-plus`中 `el-table` 的属性以及 HTML 元素属性 |  `Record<String, any>`   |    -    |
| `event`      | `el-table`的事件对象，值为`element-plus`中 `el-table` 的事件以及 HTML 事件属性 |  `Record<String, any>`   |    -    |
| `ref`        | `el-table`组件的实例对象                                     |         `Ref<T>`         |    -    |
| `loading`    | 表格 loading                                                 |        `boolean`         | `false` |
| `columns`    | 渲染的表格列的数组                                           | `Array<TableColumnType>` |    -    |
| `appendSlot` | 尾部插槽名称或配置对象<br />当传入插槽名称时候，可以在模板中使用对应具名插槽，插入内容到表格尾部；<br />当使用 JSON 对象时，则通过 `basicComponent` 组件渲染插槽内容 | `string`或`CompType` | -  |
| `emptySlot`  | 表格数据为空时插槽名称或配置对象<br />当传入插槽名称时候，可以在模板中使用对应具名插槽，插入内容到表格数据为空时内容；<br />当使用 JSON 对象时，则通过 `basicComponent` 组件渲染插槽内容 | `string`或`CompType` | -  |
| `pagination` | 表格分页的配置对象                                           |        `CompType`        | - |
| `seach`      | 高级搜索配置                                                 |        `FormType`        | - |

::: details PaginationType类型

```typescript
//当使用分页时候，传入的数据格式
export interface PaginationParamsType {
  currentPage: number, // 当前页数的默认初始值，不设置时默认为 1
  data: Array<any>, // 表格数据
  pageSize: number, //每页数量
  total: number, // 总数量
}

//当使用分页时候，传入的数据格式示例如下
const data = {
  currentPage: 1,
  data: tableData,
  pageSize: 20,
  total: 25,
};
```

:::



#### TableColumnType

| 属性名              | 说明                                                         |             类型             | 默认值 |
| ------------------- | :----------------------------------------------------------- | :--------------------------: | :----: |
| `headerSlot`    | 表格列的表头插槽名 或 配置对象<br />当传入插槽名称时候，可以在模板中使用对应具名插槽，插入内容到表格头部；<br />当使用 JSON 对象时，则通过 `basicComponent` 组件渲染插槽内容 | `String`或`CompType` | -          |
| `defaultSlot`   | 表格列的内容插槽名 或 配置对象<br /> 当为一列单元格的内容设置`defalutSlotConfig`配置时，`defaultSlot`的事件对象是在`BaiscTable`进行绑定，而不是在`BasicComponent`，且为`defaultSlot`的事件对象中的所有事件传递了当前单元格所在行和列的数据对象作为事件的第一个参数，则在配置对象中便可使用单元格所在行和列的数据对象`currentCellData`，若事件为组件事件，则组件事件的回调参数将会排在`currentCellData`后面，所以当无需使用`currentCellData`但要使用组件事件的回调参数时，都必须在事件的参数列表的第一个参数写上一个变量来接收`currentCellData`。 <br />当一列的内容单元格为多个元素时，可以将`defaultSlot`定义成一个对象 |           `String` 或 `CompType`  或 `Array<CompType>`           | - |
| `attr`              | 参考 `element-plus` `el-table-column` 的属性以及 HTML 元素属性 |    `Record<String, any>`     | - |



## 方法

### **Table 方法**


| 方法名               | 说明                                                         |                          参数                          |
| :------------------- | :----------------------------------------------------------- | :----------------------------------------------------: |
| `clearSelection`     | 用于多选表格，清空用户的选择                                 |                          `—`                           |
| `getSelectionRows`   | 返回当前选中的行                                             |                                                        |
| `toggleRowSelection` | 用于多选表格，切换某一行的选中状态，<br /> 如果使用了第二个参数，则可直接设置这一行选中与否 |                    `row, selected`                     |
| `toggleAllSelection` | 用于多选表格，切换全选和全不选                               |                          `—`                           |
| `toggleRowExpansion` | 用于可扩展的表格或树表格，<br />如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。 |                    `row, expanded`                     |
| `setCurrentRow`      | 用于单选表格，设定某一行为选中行，<br /> 如果调用时不加参数，则会取消目前高亮行的选中状态。 |                         `row`                          |
| `clearSort`          | 用于清空排序条件，数据会恢复成未排序的状态                   |                          `—`                           |
| `clearFilter`        | 传入由`columnKey` 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器 |                      `columnKeys`                      |
| `doLayout`           | 对 Table 进行重新布局。 <br />当表格可见性变化时，您可能需要调用此方法以获得正确的布局 |                          `—`                           |
| `sort`               | 手动排序表格。 <br />参数 `prop` 属性指定排序列，`order` 指定排序顺序。 |             `prop: String, order: String`              |
| `scrollTo`           | 滚动到一组特定坐标                                           | `(options: ScrollToOptions | Number, yCoord?: Number)` |
| `setScrollTop`       | 设置垂直滚动位置                                             |                         `top`                          |
| `setScrollLeft`      | 设置水平滚动位置                                             |                         `left`                         |

### **pagination 方法**

| 方法名           | 说明                                                  | 参数                                              |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------- |
| `size-change`    | 改变时触发<br />对应 ElmentPlus Pagination 同名方法   | `(value: number) => void`                         |
| `current-change` | 改变时触发，<br />对应 ElmentPlus Pagination 同名方法 | `(value: number) => void`                         |
| `page-change`    | `current-page` 或 `page-size` 更改时触发              | `(currentPage: number, pageSize: number) => void` |
| `prev-click`     | 用户点击上一页按钮改变当前页时触发                    | `(value: number) => void`                         |
| `next-click`     | 用户点击下一页按钮改变当前页时触发                    | `(value: number) => void`                         |



## 插槽

### Table

| 插槽名        | 说明                                                         |
| :------------ | :----------------------------------------------------------- |
| `tableAppend` | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 `slot`。 若表格有合计行，该 `slot` 会位于合计行之上。 |
| `tableEmpty`  | 当数据为空时自定义的内容                                     |



### table-column

| 插槽名          | 说明                                                  |
| :-------------- | :---------------------------------------------------- |
| `<headerSlot>`  | 自定义表头的内容， 作用域参数为 `{ column, $index }`  |
| `<defaultSlot>` | 自定义列的内容 作用域参数为 `{ row, column, $index }` |

### 方法

| 方法名        | 说明         | 参数 |
| ------------- | ------------ | ---- |
| `handleOpen`  | 打开下拉菜单 | `—`  |
| `handleClose` | 关闭下拉菜单 | `—`  |

## 接口格式

### 分页表格

默认情况下表格为分页模式，分页模式下，需要返回分页相关数据和表格数据。

::: details 分页表格接口格式示例

```js
//  分页配置
const data = {
  currentPage: 1, // 当前页码
  pageSize: 20, // 每页数量
  total: 25, // 所有数据总数
  data: [ // 当前页面数据
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        select: "送货上门",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
        select: "自取",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
        select: "自取",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
        select: "自取",
      },
  ],
};
```

:::



### 不分页表格

不分页的表格接口，默认返回的 data 为数组，数组内为表格每一列数据组成的对象。

::: details 不分页表格接口格式示例

```js
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
    select: "送货上门",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
    select: "自取",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
    select: "自取",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
    select: "自取",
  },
];
```

:::

## 示例

<xw-demo
    demo-height="350px"
    source-code="element-plus:::table/table-demo"
/>

### 分页示例

<xw-demo
    demo-height="770px"
    source-code="element-plus:::table/table-pagination-demo"
/>

### 插槽示例

<xw-demo
    demo-height="770px"
    source-code="element-plus:::table/table-slot-demo"
/>

### 高级搜索示例

<xw-demo
    demo-height="450px"
    source-code="element-plus:::table/table-search-demo"
/>