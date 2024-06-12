# 菜单

菜单组件是对 [Element Plus 的菜单组件](https://element-plus.org/zh-CN/component/menu.html) 进行二次封装成 JSON 配置模式，除了支持 Element Plus 的 菜单基本功能之外还扩展了其他功能：

## 文件说明

- 组件地址：`components/Menu/src/BasicMenu.vue`、`MenuItem.vue`

- 组件类型：`components/Menu/types.ts`

::: details 组件类型

```typescript
// el-menu 配置对象参数
interface MenuType {
  attr?: Recordable;    // el-menu 属性
  event?: Recordable; // el-menu 事件
  ref?: Ref<T>; // el-menu 引用
  menu: Array<MenuItemType>;  // el-menu-item 子节点配置
  component?: CompType; // 默认插槽组件
}
// el-menu-item 子节点配置
interface MenuItemType {
  attr?: Recordable; // 属性
  event?: Recordable; // 事件
  subMenu?: Array<MenuItemType>; // 子节点
  icon?: IconType; // 图标
  title?: string; // 菜单文本
  component?: CompType; // 默认插槽组件
}

```

:::

## 特性

采用了递归的方法，可以依据渲染数据对象进行循环渲染

##  参数`json`格式

  ```json
  <menuOption> ={
    attr: { }, // el-menu的属性对象
    event: { }, // el-menu的事件对象
    ref: ref(), // el-menu组件的实例对象
    menu: [
      // el-menu-item
      {
        attr: {}, // el-menu-item的属性对象
        event: {}, // el-menu-item的事件对象
        icon: {
          name: Document, // 图标对象
        },
        title: "导航一", // 菜单项文本内容
      },
      // el-sub-menu
      {
        attr: { }, // el-menu-item的属性对象
        event: {  }, // el-menu-item的事件对象
        icon: {
          name: Setting, // 图标名
        },
        title: "导航三", // 菜单项文本内容
        subMenu: [
          // 2
          // el-menu-item
          {
            attr: {   },
            icon: {
              name: Location,
            },
            title: "导航 3-1 ",
          },
          // el-sub-menu
          {
            attr: {  },
            icon: {
              name: Setting,
            },
            title: "导航 3-2 ",
            subMenu: [
              // 3
              // el-menu-item
              {
                attr: {  },
                event: {},
                icon: {
                  name: Setting,
                },
                title: "导航 3-2-1 ",
              },
            ], // 3
          },
        ], // 2
      }, // *
    ],
  };
  ```

###  参数说明

#### `MenuType`

| 属性名  |                             说明                             |         类型          | 默认值 |
| :-----: | :----------------------------------------------------------- | :-------------------: | :----: |
|  `attr` | `el-menu`的属性对象，值为`element-plus`中 `el-menu` 的属性以及 HTML 属性 | `Record<String, any>` |   -    |
|  `event`  | `el-menu`的事件对象，值为`element-plus`中 `el-menu` 的事件以及 HTML事件 | `Record<String, any>` |   -    |
|   `ref`   |                   `el-menu`组件的实例对象                    |       `Ref<T>`        |   -    |
| `menu` |                          菜单项数组                          | `Array<MenuItemType>` |   -    |
| `component` | 默认插槽组件 | `CompType` |  |
| `collapse` | 折叠配置项 |  | |

#### `MenuItemType`

| 属性名  |                             说明                             |         类型          | 默认值 |
| :-----: | :----------------------------------------------------------- | :-------------------: | :----: |
|  `attr` | `el-menu-item`的属性对象，值为`element-plus`中 `el-menu-item` 的属性以及 HTML属性 | `Record<String, any>` |   -    |
|  `event`  | `el-menu-item`的事件对象，值为`element-plus`中 `el-menu-item` 的事件以及 HTML事件 | `Record<String, any>` |   -    |
| `subMenu` |              `el-sub-menu`的`el-menu-item`数组               | `Array<MenuItemType>` |   -    |
|  `icon` |                       菜单项的前缀图标                       |      `IconType`       |   -    |
|  `text` |                       菜单项的文本内容                       |       `String`        |   -    |
| `component` | 默认插槽组件 | `CompType` |  |

#### **collapse**

collapse 为侧边栏菜单折叠配置，该配置为对象，包含如下配置：

| 属性名    | 说明                                                         | 类型                | 默认值 |
| --------- | ------------------------------------------------------------ | ------------------- | ------ |
| type      | 折叠图标配置（当type 为 component 时，传入 BasicComponent 组件相关配置） | `Icon 或 Component` | Icon   |
| showIcon  | 展开图标（当 type = Icon 时有效）                            |                     |        |
| colseIcon | 关闭图标（当 type = Icon 时有效）                            |                     |        |
| size      | 图标大小                                                     |                     | 30     |



### 方法

| 方法名 |        说明         |                参数                 |
| :----: | :-----------------: | :---------------------------------: |
|  open  | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close  | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

## 插槽

| 插槽名称 | 说明              |
| -------- | ----------------- |
| header   | 顶部或左侧 header |
| footer   | 底部或右侧footer  |



## 示例

### 侧边栏菜单

<xw-demo
    demo-height="550px"
    source-code="element-plus:::menu/menu-demo"
/>

### 水平菜单

<xw-demo
    demo-height="550px"
    source-code="element-plus:::menu/menu-horizontal-demo"
/>

### 可折叠和 Logo 

<xw-demo
    demo-height="550px"
    source-code="element-plus:::menu/menu-collapse-demo"
/>
