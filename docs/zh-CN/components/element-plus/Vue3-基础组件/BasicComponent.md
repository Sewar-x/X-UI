# BasicComponent  

一个用于渲染动态组件或元素的“元组件”。

通用的 JSON 配置组件，通过配置 Virtual DOM 结构，渲染组件列表，提供 Form、Table、Dialog 等基础组件 JSON 配置功能的基础组件，也可以直接使用 JSON 描述 Virtual DOM 结构，渲染组件。

该组件支持原生 DOM 元素节点和 Element Plus 元素节点，也支持使用自定义组件作为元素节点。

底层采用 Vue 的 [`<component/>`](https://cn.vuejs.org/api/built-in-special-elements.html#component) 组件二次封装。



## 说明

文件目录: `/element-plus/components/BasicComponent/BasicForm.vue`

::: tip

BasicComponent  是基于`<component>`进行二次封装，使该组件具备递归循环渲染的特性；

而 `<component>`具有类似组件的特性，也是模板语法的一部分。但它们并非真正的组件，同时在模板编译期间会被编译掉。因此，它们通常在模板中用小写字母书写。

:::

## 特性

  1. **通用性强**：可设置 `comp` 对象属性 `component` 的值为原生HTML元素或 Element Plus 的字符串形式和自定义组件来渲染;
  2. **支持递归循环组件**：采用了递归的方法，可以依据渲染数据对象进行循环渲染，底层对  [`<component/>`](https://cn.vuejs.org/api/built-in-special-elements.html#component) 组件二次封装。可以使   [`<component/>`](https://cn.vuejs.org/api/built-in-special-elements.html#component) 组件具有递归渲染的能力。如递归渲染侧边栏菜单。

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
        content: {},
        children: [],
      }
    ], // 渲染组件的子组件
    type: "component", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  }
  
  // 注：content属性和children属性只会渲染其中一个，优先children
  ```
## 参数说明

### `CompType`

类型:  （文件`/element-plus/types/global.d.ts`）

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
  slotScope?: any // 作用域插槽参数
}

```

|  属性名  |                             说明                             |        类型         | 默认值 |
| :------- | :----------------------------------------------------------- | :------------------ | :----: |
|   comp   |                          渲染的组件                          | `String 或 Component` |   -    |
|   data   | 绑定的响应式数据，当响应数据为对象时，必须以`reactive`创建响应式对象，且必须搭配`key`作为响应的对象属性名 |         `any`         |   -    |
|   key    |                 绑定的响应式数据对象的属性名                 |       `String`      |        |
|   attr   |                        渲染组件的属性                        | `Record<String, any>` |   -    |
|  event   |                        渲染组件的事件                        | `Record<String, any>`|   -    |
| content  |                      渲染组件的文本内容                      |   `CompContentType`   |   -    |
| children |                       渲染组件的子组件                       |   `Array<CompType>`   |   -    |
|   ref    |                      渲染组件的实例对象                      |       `Ref<T>`        |   -    |
| slotScope | 作用域插槽参数 | `any` |  |

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