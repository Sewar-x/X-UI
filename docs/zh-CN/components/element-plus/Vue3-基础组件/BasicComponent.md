# BasicComponent  
## 文件说明

- 文件目录: `element-plus/components/BasicComponent/BasicForm.vue`

## 特性

  1. 通用性强，可设置`comp`对象属性`component`的值为原生HTML元素或Element-plus的字符串形式和自定义组件来渲染
  2. 采用了递归的方法，可以依据渲染数据对象进行循环渲染

## 参数格式

  ```json
  <elementOption> = {
    comp: "", // 渲染组件名（字符串形式）或组件
    data: "", // 绑定的响应式数据
    key: "", // 绑定的响应式数据对象的属性名
    attr: {}, // 渲染组件的属性
    event: {}, // 渲染组件的事件
    ref: ref(), // 渲染组件的实例对象
    content: {  // 渲染组件的文本内容
      text: "", // 显示节点文本内容
      key: "" // 节点key
      attr: {}, // 节点属性
      event: {}, // 节点事件
      ref: ref(), // 节点引用
    }, 
    children: [ 
      {
        comp: "",
        data: "",
        attr: "",
        event: "",
        ref: ref()
        content: "",
        children: [],
      }
    ], // 渲染组件的子组件
    type: "component", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  }
  
  // 注：content属性和children属性只会渲染其中一个，优先children
  ```
## 参数说明

### `CompType`

类型: `element-plus/types/global.d.ts-CompType`

```typescript
declare interface CompType {
  comp: string | Component; // 组件标签名称
  className?: string, // 组件类名称
  data?: any; // 传入组件数据
  key?: string; // 组件 key 
  attr?: Recordable; // 组件属性
  event?: Recordable; // 组件事件
  content?: CompContentType; // 组件内容
  children?: Array<CompType> | []; //组件子节点 dom 
  ref?: Ref<T>; // 组件 ref 引用
}
```

|  属性名  |                             说明                             |        类型         | 默认值 |
| :------- | :----------------------------------------------------------- | :------------------ | :----: |
|   comp   |                          渲染的组件                          | `String \| Component` |   -    |
|   data   | 绑定的响应式数据，当响应数据为对象时，必须以`reactive`创建响应式对象，且必须搭配`key`作为响应的对象属性名 |         any         |   -    |
|   key    |                 绑定的响应式数据对象的属性名                 |       String        |        |
|   attr   |                        渲染组件的属性                        | `Record<String, any>` |   -    |
|  event   |                        渲染组件的事件                        | `Record<String, any>`|   -    |
| content  |                      渲染组件的文本内容                      |   `CompContentType`   |   -    |
| children |                       渲染组件的子组件                       |   `Array<CompType>`   |   -    |
|   ref    |                      渲染组件的实例对象                      |       `Ref<T>`        |   -    |

### `CompContentType`

| 属性名 |             说明             |        类型         | 默认值 |
| :----- | :--------------------------- | :------------------ | :----: |
|  text  |        渲染组件的文本        |         `any `        |   -    |
|  key   | 绑定的响应式数据对象的属性名 |       `string`        |   -    |
|  attr  |      渲染组件文本的属性      | `Record<String, any>` |   -    |
| event  |      渲染组件文本的事件      | `Record<String, any>` |   -    |
|  ref   |    渲染组件文本的实例对象    |       `Ref<T>`        |   -    |

## 示例

### 渲染基础 DOM 元素

<xw-demo
    demo-height="150px"
    source-code="element-plus:::basecomponent/basecomponent-basics-use-demo"
/>

### 渲染 element plus 组件

<xw-demo
    demo-height="100px"
    source-code="element-plus:::basecomponent/basecomponent-element-use-demo"
/>

### 渲染自定义组件

<xw-demo
    demo-height="400px"
    source-code="element-plus:::basecomponent/basecomponent-user-define-demo"
/>