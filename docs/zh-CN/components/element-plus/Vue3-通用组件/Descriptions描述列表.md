# Descriptions 描述列表

描述列表组件是对 [Element Plus 的描述列表](https://element-plus.org/zh-CN/component/descriptions.html) 进行二次封装成 JSON 配置模式，除了支持 Element Plus 的 描述列表基本功能之外还扩展了其他功能。

## 功能

| 功能                 | 介绍 |
| :------------------- | ---- |
| 自定义配置 Form 表单 |      |
| 内置 Form 表单       |      |

## 文件说明

- 组件地址：`/element-plus/components/Dialog/src/Descriptions.vue`
- 组件类型：`/element-plus/components/Descriptions/types.ts`
::: details 组件类型

```typescript
interface DescriptionsType {
  attr?: Recordable; // 属性对象
  event?: Recordable; // 事件对象
  ref?: Ref<T>; // 实例引用
  items: Array<DescriptionsItemType>; // 子组件列表
  titleSlot?: CompType | string; // 描述列表标题插槽配置对象或标题插槽名称（使用配置对象方式生成插槽组件）
  extraSlot?: CompType | string; // 	自定义操作区配置对象或者操作区插槽名称，显示在右上方
  defaultSlot?: CompType | string;  // 默认插槽配置对象或插槽名称
}

interface DescriptionsItemType {
  attr?: Recordable;
  event?: Recordable;
  labelSlot?: CompType | string;  // 自定义标签插槽名称或标签配置对象
  defaultSlot?: CompType | string;  // 默认插槽配置对象或插槽名称
}

```

:::



## 特性

对公共组件 Descriptions 进行了JSON 配置化，即通过 JSON 配置的方式进行创建描述列表

## 参数`json`格式

```json
{
  attr: { }, //element plus Descriptions  属性配置
  event: {}, // 事件对象
  ref: ref(), // 实例引用
  titleSlot: {}; // 描述列表标题插槽配置对象或标题插槽名称（使用配置对象方式生成插槽组件）
  extraSlot: {}; // 	自定义操作区配置对象或者操作区插槽名称，显示在右上方
  defaultSlot: {};  // 默认插槽配置对象或插槽名称
  items: [ // 子组件列表
    {
      attr: {
        label: "标题1",
        text: "内容1",
      },
      event: {},
      labelSlot: {};  // 自定义标签插槽名称或标签配置对象
      defaultSlot: {};  // 默认插槽配置对象或插槽名称
    },
  ],
}
```

### 参数说明

**DescriptionsType：** 描述列表配置

| 属性名              | 说明                                                         | 类型                          | 默认值 |
| ------------------- | ------------------------------------------------------------ | ----------------------------- | ------ |
| attr（可选）        | 属性对象                                                     | `Recordable`                  | -      |
| event（可选）       | 事件对象                                                     | `Recordable`                  | -      |
| ref（可选）         | 实例引用                                                     | `Ref<T>`                      | -      |
| items（必填）       | 描述列表项                                                   | `Array<DescriptionsItemType>` | -      |
| titleSlot（可选）   | 描述列表标题插槽配置对象或标题插槽名称（使用配置对象方式生成插槽组件） | `CompType |string;`           | -      |
| extraSlot（可选）   | 自定义操作区配置对象或者操作区插槽名称，显示在右上方         | `CompType |string`            | -      |
| defaultSlot（可选） | 默认插槽配置对象或插槽名称                                   | `CompType |string`            | -      |

**DescriptionsItemType：**描述列表项配置

| 属性名              | 说明                             | 类型               | 默认值 |
| ------------------- | -------------------------------- | ------------------ | ------ |
| attr（可选）        | 属性对象                         | `Recordable`       | -      |
| event（可选）       | 事件对象                         | `Recordable`       | -      |
| labelSlot（可选）   | 自定义标签插槽名称或标签配置对象 | `CompType |string` | -      |
| defaultSlot（可选） | 默认插槽配置对象或插槽名称       | `CompType |string` | -      |




## 示例

### 基础示例

<xw-demo
    demo-height="400px"
    source-code="element-plus:::descriptions/descriptions-demo"
/>

### 多列的描述列表组合
你可以通过遍历该组件，传入不同的配置项，将多个描述列表组合，生成一个多列组合的描述列表
<xw-demo
    demo-height="400px"
    source-code="element-plus:::descriptions/descriptions-multiple-demo"
/>

我们封装了以上特性，你可以通过传入 `options.items` 为二维数组，来生成多列组合的描述列表；
`options.items` 的每一个项为数组，每一项的数组长度表示列数
此外还提供统一的配置项  `options.itemLabelWidth`, 用于统一所有描述列表 Label 的宽度
<xw-demo
    demo-height="400px"
    source-code="element-plus:::descriptions/descriptions-multiple-config-demo"
/>

### 自定义插槽配置

<xw-demo
    demo-height="400px"
    source-code="element-plus:::descriptions/descriptions-slot-demo"
/>

### 模板插槽配置

<xw-demo
    demo-height="400px"
    source-code="element-plus:::descriptions/descriptions-template-slot-demo"
/>

### 自定义Form组件

<xw-demo
    demo-height="400px"
    source-code="element-plus:::descriptions/descriptions-component-demo"
/>

### 自定义动态Form组件

自定义动态 Form 需要手动监听状态变化，然后根据状态变化手动修改 描述列表项和 Form 表单项

<xw-demo
    demo-height="400px"
    source-code="element-plus:::descriptions/descriptions-dynamic-component-demo"
/>