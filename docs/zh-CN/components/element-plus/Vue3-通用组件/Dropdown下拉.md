# 下拉

按钮组件是对 [Element Plus 的下拉菜单组件](https://element-plus.org/zh-CN/component/dropdown.html) 进行二次封装成 JSON 配置模式，除了支持 Element Plus 的 弹窗基本功能之外还扩展了其他功能

## 文件说明

- 组件地址：`components/Dropdown/src/Dropdown.vue`

- 组件类型文件：`components/Dropdown/types.ts`

## 参数`json`格式

  ```json
  <dropdownOption> = {
    icon: {
      // 图标可为引入的Svg图标文件名或element-plus的图标名(首字母大写)
      prefixIcon: '',  // 前缀图标名
      suffixIcon: '',	// 后缀图标名
      type: '', // 图标的类型 值为 svg 或 el
      size: '', // 图标的大小
    }，
    title: '' | {} // 下拉菜单名称或配置
    attr: {}, // 参考 element-plus el-dropdown 的属性以及HTML元素属性
    event: {}, // 参考 element-plus el-dropdown 的事件以及HTML事件属性
    ref: ref(), // ekl-dropdown组件的实例对象
    items: [  // 渲染的下拉菜单项数组
      {
        attr：{}， // 参考 element-plus el-dropdown-item 的属性以及HTML元素属性
  	  icon: {},
        content: '' || {}, // 菜单项的文本内容
  	  slot:'' // 下拉项插槽名称
       }
    ]
  }
  ```

## 参数说明

### `DropdownType`

|   属性名    |                             说明                             |           类型            | 默认值 |
| :---------- | ------------------------------------------------------------ | :-----------------------: | :----: |
|    icon     |                         菜单标题图标                         |        `IconType`         |   -    |
| title |                        下拉菜单名配置,传入对象，则使用配置项生成组件；传入字符串默认显示字符串                        |        `CompType 或 string`        |   -    |
|    attr     | `el-dropdown`的属性对象，参考 element-plus el-dropdown 的属性以及HTML元素属性 |   `Record<String, any>`   |   -    |
|    event    | `el-dropdown`的事件对象，参考 element-plus el-dropdown 的事件以及HTML事件属性 |   `Record<String, any>`   |   -    |
|     ref     |                 `el-dropdown`组件的实例对象                  |         `Ref<T>`          |   -    |
|   items   |                     渲染的下拉菜单项数组                     | `Array<DropdownItemType>` |   -    |

### `DropdownItemType`

| 属性名  |                             说明                             |         类型          | 默认值 |
| :------ | :----------------------------------------------------------: | :-------------------: | :----: |
| attr    | `el-dropdown-item`的属性对象，参考 `element-plus` `el-dropdown-item` 的属性以及HTML元素属性 | `Record<String, any>` |   -    |
| icon    |                      菜单项图标配置对象                      |      `IconType`       |   -    |
| content |            菜单项的文本内容或菜单项的渲染配置对象            | `String \| CompType`  |   -    |
| slot    |                         下拉插槽名称                         |       `String`        |   -    |

### `IconType`

|   属性名   |        说明         |   类型    | 默认值 |
| :--------: | :-----------------: | :-------: | :----: |
| prefixIcon |     前缀图标名      | `String`  |   -    |
| suffixIcon |     后缀图标名      | `String`  |   -    |
| isSvgIcon  | 是否为自引入svg图标 | `Boolean` |   -    |
|    size    |     图标的大小      | `String`  |   -    |



## 插槽

| 名称    | 描述             |
| ------- | ---------------- |
| default | 下拉内容默认插槽 |

## 示例

<xw-demo
    demo-height="100px"
    source-code="element-plus:::dropdown/dropdown-demo"
/>