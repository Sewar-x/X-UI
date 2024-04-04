# Icon、SvgIcon
## 文件说明

- `Icon`组件详情：`components/Icon/src/Icon.vue`，渲染 `element-plus`自带的图标

- 参数通过`prop`传递

## 参数说明

|  属性名   |                             说明                             |        类型        | 默认值 |
| :-------: | :----------------------------------------------------------: | :----------------: | :----: |
| isVisible |                        控制图标的显示                        |   `Ref<Boolean>`   |  true  |
| isSvgIcon |                     是否为自引入svg图标                      |     `Boolean`      |   -    |
|   name    | 图标名，自引入图标值为图标文件名，element-plus自带图标首字母大写 |      `String`      |   -    |
|   size    |                           图标大小                           | `Number \| String` |   -    |
|   color   |                           图标颜色                           |      `String`      |   -    |
|   style   |                        图标的样式对象                        |      `Object`      |   -    |

- `SvgIcon`组件详情——`components/Icon/src/SvgIcon.vue`  渲染 `svg`图标

- 参数通过`prop`传递

- 参数说明

  | 属性名 |   说明   |       类型        | 默认值 |
  | :----: | :------: | :---------------: | :----: |
  | prefix | 图标前缀 |     `String`      |  icon  |
  |  name  |  图标名  |     `String`      |   -    |
  |  size  | 图标大小 | `Number \|String` |   14   |