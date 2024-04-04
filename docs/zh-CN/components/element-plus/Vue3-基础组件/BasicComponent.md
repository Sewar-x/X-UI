# BasicComponent  
## 文件说明

- 组件地址: `components/BasicComponent/BasicForm.vue`

- 组件类型文件: `types/global.d.ts-CompType`

## 特性

  1. 通用性强，可设置`comp`对象属性`component`的值为原生HTML元素或Element-plus的字符串形式和自定义组件来渲染
  2. 采用了递归的方法，可以依据渲染数据对象进行循环渲染

## 参数`json`格式

  ```json
  <elementOption> = {
    comp: "", // 渲染组件名（字符串形式）或组件
    data: "", // 绑定的响应式数据
    key: "", // 绑定的响应式数据对象的属性名
    attr: {}, // 渲染组件的属性
    event: {}, // 渲染组件的事件
    ref: ref(), // 渲染组件的实例对象
    content: {  // 渲染组件的文本内容
      text: "",
      key: ""
      attr: {},
      event: {},
      ref: ref(),
    }, 
    children: [
      {
        comp: "",
        data: "",
        attr: "",
        event: "",
        ref: ref()
        content: "",
        children: "",
      }
    ], // 渲染组件的子组件
    type: "component", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  }
  
  // 注：content属性和children属性只会渲染其中一个，优先children
  ```
### 参数说明

  1. `CompType`

     |  属性名  |                             说明                             |        类型         | 默认值 |
     | :------: | :----------------------------------------------------------: | :-----------------: | :----: |
     |   comp   |                          渲染的组件                          | `String \| Component` |   -    |
     |   data   | 绑定的响应式数据，当响应数据为对象时，必须以`reactive`创建响应式对象，且必须搭配`key`作为响应的对象属性名 |         any         |   -    |
     |   key    |                 绑定的响应式数据对象的属性名                 |       String        |        |
     |   attr   |                        渲染组件的属性                        | `Record<String, any>` |   -    |
     |  event   |                        渲染组件的事件                        | `Record<String, any>`|   -    |
     | content  |                      渲染组件的文本内容                      |   `CompContentType`   |   -    |
     | children |                       渲染组件的子组件                       |   `Array<CompType>`   |   -    |
     |   ref    |                      渲染组件的实例对象                      |       `Ref<T>`        |   -    |

  2. `CompContentType`

     | 属性名 |             说明             |        类型         | 默认值 |
     | :----: | :--------------------------: | :-----------------: | :----: |
     |  text  |        渲染组件的文本        |         `any `        |   -    |
     |  key   | 绑定的响应式数据对象的属性名 |       `string`        |   -    |
     |  attr  |      渲染组件文本的属性      | `Record<String, any>` |   -    |
     | event  |      渲染组件文本的事件      | `Record<String, any>` |   -    |
     |  ref   |    渲染组件文本的实例对象    |       `Ref<T>`        |   -    |
