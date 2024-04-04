# 按钮
## 文件说明

- 组件详情：`components/Button/src/BasicButton.vue`

- 类型文件：`components/Button/types.ts`

## 参数 `json` 格式

```json
<btnOption>: {
  attr: {}, // el-button的属性对象
  event: {}, // el-button的事件对象
  colAttr： {}， // 包裹el-button的el-col的属性对象
  content: {}, // 按钮内容的配置对象
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

| 属性名  |                             说明                             |         类型          | 默认值 |
| :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
|  attr   | `el-button`的属性对象，值为`element-plus`中 `el-button` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
|  event  | `el-button`的事件对象，值为`element-plus`中 `el-button` 的事件以及 HTML 元素事件 | `Record<String, any>` |   -    |
| colAttr | 包裹el-button的el-col的属性对象，值为`element-plus`中 `el-col` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
| content |                      按钮的内容配置对象                      |      `CompType`       |   -    |
|  icon   |                   自定义图标组件的配置对象                   |      `IconType`       |   -    |
| loading |                  自定义加载中组件的配置对象                  |      `CompType`       |   -    |

- 插槽

  |   插槽名   |       说明       |
  | :--------: | :--------------: |
  |  btnIcon   |  自定义图标组件  |
  | btnDefault |  自定义按钮内容  |
  | btnLoading | 自定义加载中组件 |