# 菜单
## 文件说明

- 组件地址：`components/Menu/src/BasicMenu.vue`、`MenuItem.vue`

- 组件类型：`components/Menu/types.ts`

## 特性：

  1. 采用了递归的方法，可以依据渲染数据对象进行循环渲染

##  参数`json`格式

  ```json
  <menuOption> = {
    attr: {}, // el-menu的属性对象
    event: {}, // el-menu的事件对象
    ref：ref(), // el-menu组件的实例对象
    itemArr: [  
      // el-menu-item
      {
        attr: {},	// el-menu-item的属性对象
        event: {}, // el-menu-item的事件对象
        icon: {
          isSvgIcon: true, // 图标是否为自引入Svg图标还是
          name: "", // 图标名
          size: "", // 图标大小
          color: "", // 图标颜色
        },
        text: '',	// 菜单项文本内容
      },
      // el-sub-menu
      { // *
        attr: {},	// el-sub-menu的属性对象
        event: {}, // el-sub-menu的事件对象
        icon: {}, // el-sub-menu的图标
        text: '', // el-sub-menu的文本内容
        itemArr: [ // 2
          // el-menu-item
          {
            attr: {},
            event: {},
            icon: {},
        	  text: '',
          },
          // el-sub-menu
          {
            attr: {},
            event: {},
            icon: {},
        	  text: '',
            itemArr: [ // 3
  			      // el-menu-item
              {
                attr: {},
                event: {},
                icon: {},
        		  text: '',
              },
            ] // 3
          }
        ]  // 2
      } // *
    ]
  }
  ```

###  参数说明

  1. `MenuType`

| 属性名  |                             说明                             |         类型          | 默认值 |
| :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
|  attr   | `el-menu`的属性对象，值为`element-plus`中 `el-menu` 的属性以及 HTML 属性 | `Record<String, any>` |   -    |
|  event  | `el-menu`的事件对象，值为`element-plus`中 `el-menu` 的事件以及 HTML事件 | `Record<String, any>` |   -    |
|   ref   |                   `el-menu`组件的实例对象                    |       `Ref<T>`        |   -    |
| itemArr |                          菜单项数组                          | `Array<MenuItemType>` |   -    |

  2. `MenuItemType`

| 属性名  |                             说明                             |         类型          | 默认值 |
| :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
|  attr   | `el-menu-item`的属性对象，值为`element-plus`中 `el-menu-item` 的属性以及 HTML属性 | `Record<String, any>` |   -    |
|  event  | `el-menu-item`的事件对象，值为`element-plus`中 `el-menu-item` 的事件以及 HTML事件 | `Record<String, any>` |   -    |
| itemArr |              `el-sub-menu`的`el-menu-item`数组               | `Array<MenuItemType>` |   -    |
|  icon   |                       菜单项的前缀图标                       |      `IconType`       |   -    |
|  text   |                       菜单项的文本内容                       |       `String`        |   -    |

- 方法

  | 方法名 |        说明         |                参数                 |
  | :----: | :-----------------: | :---------------------------------: |
  |  open  | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
  | close  | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |