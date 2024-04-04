# 弹窗

## 文件说明

- 组件地址：`components/Dialog/src/Dialog.vue`

- 组件类型：`components/Dialog/types.ts`

## 特性：

  1. 对公共组件Dialog进行了函数化，即通过函数的方式进行创建，为创建Dialog的函数``传配置对象参数

- 参数`json`格式

  ```json
  // 函数createDialog的参数对象
  {
    id: "", // Dialog的唯一Id，用于定位同一个方法创建的Dialog
    dialogVisible: ref(Boolean), // 判断所创建的Dialog的打开关闭
    attr: {}, // el-dialog的属性对象
    event: {}, // el-dialog的事件对象
    content: [], // dialog的内容对象数组
    header: {}, // 对话框标题的内容插槽配置对象
    footer: {}, // Dialog 按钮操作区的内容插槽配置对象
  }
  ```

### 参数说明

|    属性名     |                     说明                     |                             类型                             | 默认值 |
| :-----------: | :------------------------------------------: | :----------------------------------------------------------: | :----: |
|      id       | alog的唯一Id，用于定位同一个方法创建的Dialog |                           `String`                           |   -    |
| dialogVisible |         判断所创建的Dialog的打开关闭         |                        `Ref<Boolean>`                        |   -    |
|     attr      |             el-dialog的属性对象              |                    `Record<String, any>`                     |   -    |
|     event     |             el-dialog的事件对象              |                    `Record<String, any>`                     |   -    |
|    content    |             dialog的内容对象数组             | `Array<ContentFormType \| ContentTableType \| ContentCompType>` |   -    |
|    header     |         Dialog标题的内容插槽配置对象         |                          `CompType`                          |   -    |
|    footer     |        Dialog 按钮操作区插槽配置对象         |                          `CompType`                          |   -    |

  `ContentFormType | ContentTableType | ContentComponentType`

|  属性名  |                        说明                         |   类型   |               默认值               |
| :------: | :-------------------------------------------------: | :------: | :--------------------------------: |
|   type   |            指定Dialog内容区所渲染的组件             | `String` | `"Form" \| "Table" \| "Component"` |
| 其余属性 | 依照对应的`FormType\| TableType\| CompType`自行定义 |          |                                    |

  