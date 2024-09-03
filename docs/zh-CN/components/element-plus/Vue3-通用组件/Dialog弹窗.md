# 弹窗

弹窗组件是对 [Element Plus 的弹窗组件](https://element-plus.org/zh-CN/component/dialog.html) 进行二次封装成 JSON 配置模式，除了支持 Element Plus 的 弹窗基本功能之外还扩展了其他功能：

- 弹窗配置内置 Form 表单
- 弹窗配置内置 table 表格
- 弹窗配置内置 自定义组件
- 操作按钮按钮配置
- 快速配置预定义操作按钮
- 函数式调用弹窗

## 功能

| 功能                    |
| ----------------------- |
| 弹窗配置内置 Form 表单  |
| 弹窗配置内置 table 表格 |
| 弹窗配置内置 自定义组件 |
| 函数式调用弹窗          |
| 内容动态弹窗            |
| 快速配置预定义操作按钮  |
| 操作按钮按钮配置        |

## 文件说明

- 组件地址：`/element-plus/components/Dialog/src/XDialog.vue`

- 组件类型：`components/Dialog/types.ts`

::: details 组件类型

```typescript
interface OptionType {
  visible: Ref<Boolean>;
  id?: string; //唯一id 删除组件时用于定位
  attr?: Recordable;
  event?: Recordable;
  content?: Array<ContentType>;
  header?: CompType;
  footer?: CompType;
  slots?: Function;
}
```

:::

## 特性

对公共组件 Dialog 进行了函数化，即通过函数的方式进行创建，为创建 Dialog的函数 传配置对象参数

## 参数`json`格式

```json
// 函数createDialog的参数对象
{
  id: "", // Dialog的唯一Id，用于定位同一个方法创建的Dialog
  visible: ref(Boolean), // 判断所创建的Dialog的打开关闭
  attr: {}, // el-dialog的属性对象
  event: {}, // el-dialog的事件对象
  content: [], // dialog的内容对象数组
  header: {}, // 对话框标题的内容插槽配置对象
  footer: {}, // Dialog 按钮操作区的内容插槽配置对象
}
```

### 参数说明

| 属性名  | 说明                                            |                             类型                              | 默认值 |
| :-----: | :---------------------------------------------- | :-----------------------------------------------------------: | :----: |
|   id    | dialog的唯一 Id，用于定位同一个方法创建的Dialog |                           `String`                            |   -    |
| visible | 判断所创建的 Dialog 的打开关闭                  |                        `Ref<Boolean>`                         |   -    |
|  attr   | el-dialog的属性对象                             |                     `Record<String, any>`                     |   -    |
|  event  | el-dialog的事件对象                             |                     `Record<String, any>`                     |   -    |
| content | dialog的内容对象数组                            | `Array<ContentFormType 或 ContentTableType  ContentCompType>` |   -    |
| header  | Dialog标题的内容插槽配置对象                    |                          `CompType`                           |   -    |
| footer  | Dialog 按钮操作区插槽配置对象                   |                          `CompType`                           |   -    |
|  slots  | 自定义插槽                                      |                                                               |        |

`ContentFormType | ContentTableType | ContentComponentType`

| 属性名  | 说明                                                  |   类型   |               默认值               |
| :-----: | :---------------------------------------------------- | :------: | :--------------------------------: |
|  type   | 指定Dialog内容区所渲染的组件                          | `String` | `"Form" 或 "Table" 或 "Component"` |
| options | 依照对应的`FormType 或 TableType 或 CompType`自行定义 | `Object` |                                    |

## 示例

### 弹窗内置 Form 表单配置

弹窗可以通过配置 `options.content[i].type` 为 Form，并传入 form 表单配置项 `options.content[i].options` 既可在弹窗中显示 form 表单

::: details 核心示例代码
```vue
<template>
  <el-button type="primary" @click="openDialog">Open Dialog</el-button>
  <XDialog :options="dialogOptions"></XDialog>
</template>
<script setup lang="ts">
// 导入弹窗组件
import { XDialog } from "@/sewen-ui/element-plus";
</script>

```
:::


<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-demo"
/>

### 弹窗内置 Table 表格配置

弹窗可以通过配置 `options.content[i].type` 为 Table，并传入 table 表单配置项 `options.content[i].options` 既可在弹窗中显示 table 表单

::: details 核心代码

```vue
<template>
  <el-button type="primary" @click="openDialog">Open Dialog</el-button>
  <el-button @click="closeDialog">Close Dialog</el-button>
</template>

<script setup lang="ts">
// 使用弹窗函数创建弹窗
import { CreateDialog } from "@/sewen-ui/element-plus";
// 定义弹窗配置项
 const dialogOptions = {
  // ...省略配置项  
 };
// 创建弹窗实例
const dialogInst = CreateDialog(dialogOptions);
const openDialog = () => {
  // 显示弹窗
  dialogInst?.show();
};

const closeDialog = () => {
   // 关闭弹窗
  dialogInst?.close();
};
</script>
```

:::

<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-table-demo"
/>

### 弹窗内置表格和表单配置

1. 弹窗可以通过配置 `options.content[i].type` 为 Form，并传入 form 表单配置项 `options.content[i].options` 既可在弹窗中显示 form 表单
2. 弹窗可以通过配置 `options.content[i].type` 为 Table，并传入 table 表单配置项 `options.content[i].options` 既可在弹窗中显示 table 表单



<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-table-form-demo"
/>



### 弹窗内置自定义组件

弹窗可以通过配置 `options.content[i].type` 为 Component，并传入自定义组件配置项 `options.content[i].options.comp` 既可在弹窗中显示自定义组件

<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-component-demo"
/>



### 函数式创建弹窗

1. 通过导入 CreateDialog 函数，传入弹窗配置项，即可创建弹窗实例；
2. 弹窗实例返回 show 方法打开弹窗，close 方法关闭弹窗;

- 注意：使用 CreateDialog 函数创建的弹窗必须传入 id 参数作为弹窗的唯一标识

::: details 核心代码

```vue
<template>
  <el-button type="primary" @click="openDialog">Open Dialog</el-button>
  <el-button @click="closeDialog">Close Dialog</el-button>
</template>

<script setup lang="ts">
// 使用弹窗函数创建弹窗
import { CreateDialog } from "@/sewen-ui/element-plus";
// 定义弹窗配置项
const dialogOptions = {
  id: "test-table-dialog", // 必须传入 id
  visible: ref(false),
  attr: {
    title: "表格弹窗",
    draggable: true,
    "close-on-click-modal": false,
  },
  content: [
    {
      type: "Table",
      options: tableOptions,
    },
  ],
};
// 创建弹窗实例
const dialogInst = CreateDialog(dialogOptions);
const openDialog = () => {
  // 显示弹窗
  dialogInst?.show();
};

const closeDialog = () => {
   // 关闭弹窗
  dialogInst?.close();
};
</script>
```

:::

<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-api-demo"
/>

### 内容动态弹窗

1. 可以通过修改自定义组件配置项 `options.content[i].options` 配置，动态显示弹窗内容。
2. 通过导入 CreateDialog 函数，传入弹窗配置项，即可创建弹窗实例；
3. 通过 `dialogInst?.resetContent(content);` 动态修改弹窗内容配置
4. 弹窗实例返回 show 方法打开弹窗，close 方法关闭弹窗;

- 注意：使用 CreateDialog 函数创建的弹窗必须传入 id 参数作为弹窗的唯一标识

::: details 核心代码

```vue
<template>
  <el-button type="primary" @click="openForm1Dialog">打开 Form1 </el-button>
  <el-button type="primary" @click="openForm2Dialog">打开 Form2 </el-button>
  <el-button type="primary" @click="openTableDialog">打开 table </el-button>
</template>

<script setup lang="ts">
// 使用弹窗函数创建弹窗
import { CreateDialog } from "@/sewen-ui/element-plus";
// 定义弹窗配置项

const dialogOptions = {
  id: "test-dialog",
  visible: ref(false),
  attr: {
    title: "内容动态弹窗",
    draggable: true,
    "close-on-click-modal": false,
  },
  content: [],
};

// 创建弹窗
const dialogInst = CreateDialog(dialogOptions);
// 打开 form1 弹窗内容
const openForm1Dialog = () => {
  // 重置弹窗内容
  dialogInst?.resetContent([
    {
      type: "Form",
      options: form1Options,
    },
  ]);
  dialogInst?.show();
};

const openForm2Dialog = () => {
  // 重置弹窗内容
  dialogInst?.resetContent([
    {
      type: "Form",
      options: form2Options,
    },
  ]);
  dialogInst?.show();
};

const openTableDialog = () => {
  // 重置弹窗内容
  dialogInst?.resetContent([
    {
      type: "Table",
      options: tableOptions,
    },
  ]);
  dialogInst?.show();
};
</script>
```

:::

<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-dynamic-form-demo"
/>



### 固定操作按钮

通过配置 `options.footer.type` 为 "Button"，并且配置  `options.footer.fixedButton`  为 true，自动在弹窗右下角显示"取消" 和 "确认" 按钮。

::: details  按钮配置

```json
 {
  // ...省略其他配置	 
  footer: {
    // 配置底部插槽
    type: "Button", // 配置底部类型为按钮
    fixedButton: true, // 使用固定按钮
    cancelCallback: () => {
      // 取消操作回调
      alert("您点击了取消按钮！");
    },
    comfirmCallback: () => {
      // 确定操作回调
      alert("您点击了提交按钮！");
    },
  },
};
```
:::

<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-api-button-demo"
/>

<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-component-button-demo"
/>





### 自定义操作按钮

您也可以自定义操作按钮，通过在 `options.footer.options` 传入按钮配置项并且配置  `options.footer.fixedButton`  为 false 或则不配置该字段，既可自定义操作按钮；

按钮配置项可以参考按钮组件配置：[按钮 | sewen-ui (sewar-x.github.io)](https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-通用组件/Button按钮.html#示例)

::: details  按钮组件配置

```javascript
 [{
  attr: {}, // el-button的属性对象
  event: {}, // el-button的事件对象
  colAttr： {}， // 包裹el-button的el-col的属性对象
  text: '', // 按钮内容的配置对象
  icon: { // 自定义图标组件的配置对象
    isSvgIcon: false,
    name: "",
    size: "",
    color: "",
  },
  loading: {}, 
}]
```

:::

<xw-demo
    demo-height="400px"
    source-code="element-plus:::dialog/dialog-def-button-demo"
/>

