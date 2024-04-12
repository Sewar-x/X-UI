# 下拉
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
    titleConfig: {} // 下拉菜单名配置
    attr: {}, // 参考 element-plus el-dropdown 的属性以及HTML元素属性
    event: {}, // 参考 element-plus el-dropdown 的事件以及HTML事件属性
    ref: ref(), // ekl-dropdown组件的实例对象
    items: [  // 渲染的下拉菜单项数组
      {
        attr：{}， // 参考 element-plus el-dropdown-item 的属性以及HTML元素属性
  	  icon: {},
        content: '' || {}, // 菜单项的文本内容
      }
    ]
  }
  ```

### 参数说明

  1. `DropdownType`

|   属性名    |                             说明                             |           类型            | 默认值 |
| :---------: | :----------------------------------------------------------: | :-----------------------: | :----: |
|    icon     |                         菜单标题图标                         |        `IconType`         |   -    |
| titleConfig |                        下拉菜单名配置                        |        `CompType`         |   -    |
|    attr     | `el-dropdown`的属性对象，参考 element-plus el-dropdown 的属性以及HTML元素属性 |   `Record<String, any>`   |   -    |
|    event    | `el-dropdown`的事件对象，参考 element-plus el-dropdown 的事件以及HTML事件属性 |   `Record<String, any>`   |   -    |
|     ref     |                 `el-dropdown`组件的实例对象                  |         `Ref<T>`          |   -    |
|   items   |                     渲染的下拉菜单项数组                     | `Array<DropdownItemType>` |   -    |

  2. `DropdownItemType`

| 属性名  |                             说明                             |         类型          | 默认值 |
| :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
|  attr   | `el-dropdown-item`的属性对象，参考 `element-plus` `el-dropdown-item` 的属性以及HTML元素属性 | `Record<String, any>` |   -    |
|  icon   |                      菜单项图标配置对象                      |      `IconType`       |   -    |
| content |            菜单项的文本内容或菜单项的渲染配置对象            | `String \| CompType`  |   -    |

  3. `IconType`

|   属性名   |        说明         |   类型    | 默认值 |
| :--------: | :-----------------: | :-------: | :----: |
| prefixIcon |     前缀图标名      | `String`  |   -    |
| suffixIcon |     后缀图标名      | `String`  |   -    |
| isSvgIcon  | 是否为自引入svg图标 | `Boolean` |   -    |
|    size    |     图标的大小      | `String`  |   -    |