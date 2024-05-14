# 按钮

按钮组件是对 [Element Plus 的按钮组件](https://element-plus.org/zh-CN/component/button.html)  进行二次封装成 JSON 配置模式，除了支持 Element Plus 的 弹窗基本功能之外还扩展了其他功能

## 文件说明

- 组件详情：`/element-plus/components/src/XButton.vue`

- 类型文件：`/element-plus/components//Button/types.ts`

::: details 组件类型

```typescript
interface BtnType {
  type?: Type;
  size?: Size;
  [key: string]: any;
}
interface ButtonType {
  attr?: BtnType;
  event?: Recordable;
  colAttr?: Recordable;
  text?: string;
  loading?: CompType;
  icon?: IconType;
}

```
:::

## 参数 `json` 格式

```json
<btnOption>: {
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
}
```

### 参数说明

  `ButtonType`

| 属性名  | 说明                                                         |         类型          | 默认值 |
| :-----: | :----------------------------------------------------------- | :-------------------: | :----: |
|  attr   | `el-button`的属性对象，值为`element-plus`中 `el-button` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
|  event  | `el-button`的事件对象，值为`element-plus`中 `el-button` 的事件以及 HTML 元素事件 | `Record<String, any>` |   -    |
| colAttr | 包裹el-button的el-col的属性对象，值为`element-plus`中 `el-col` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
|  text   | 按钮的内容配置对象                                           |       `string`        |   -    |
|  icon   | 自定义图标组件的配置对象                                     |      `IconType`       |   -    |
| loading | 自定义加载中组件的配置对象                                   |      `CompType`       |   -    |

## 插槽

|   插槽名   |       说明       |
| :--------: | :--------------: |
|  btnIcon   |  自定义图标组件  |
|  default   |  自定义按钮内容  |
| btnLoading | 自定义加载中组件 |



## 示例

### 常规使用

<xw-demo
    demo-height="300px"
    source-code="element-plus:::button/button-demo"
/>


### 按钮组

传入 按钮选项为数组时，自动显示为按钮组
<xw-demo
    demo-height="100px"
    source-code="element-plus:::button/button-group-demo"
/>