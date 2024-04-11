# Form

## 文件说明

- 组件地址： `components/Form/BasicForm.vue`

- 组件类型文件：`components/Form/types.ts`

## 特性

  1. 传递指定格式的 `json` 对象给组件`BasicForm`，组件会以此渲染对应的表单
  2. 组件`BasicForm`接收的表单项数据是二维数组，第一层数组的值是表单每一行的表单项数组，第二层数组的值是每一个具体的表单项，这样规定可以做到动态地增加或删除一行中的表单项，只需在改动行对应的表单项数组增删数据
  3. `Form`中存在两个公共函数：提交——`submit` 和 重置——`reset`，它们的作用是：`submit`是在执行自定义提交方法前进行表单验证、`reset`是在执行自定义重置方法后对表单进行重置，可以通过在`Form-item`所渲染的子组件的`event`属性设置`submit`或`reset`方法来调用，也可以通过设置子组件的属性`publicEvent`的值为submit或reset单独调用表单验证和重置表单，若是想在提交后进行重置可设置`event`的`submit`方法和`publicEvent`的值为reset，注：这两个公共函数主要是通过点击来执行
  4. `BasicForm`组件可以动态计算每一行中所有表单项在父元素内占据的宽度，主要是通过 `el-col` 的 `span` 来划分，可以在表单项创建数据对象中指定`span`的值，值只能为 1~24 的整数，如果`span`的值或一行的表单项未指定`span`且个数为单数，则`span`的值为小数，此时因`element-plus`的原因，表单项所占据的宽度将由内容宽度决定，可能会出现内容宽度超出父元素宽度或父元素宽度剩余的现象，针对父元素宽度剩余，`BasicForm`通过`justify-content: space-between;` 来自调节剩余的父元素宽度，超出父元素宽度则只能依据情况自设定
  5. 依据Vue原则——单向数据流，组件`BasicForm`接收普通数据对象，将其进行深拷贝后，用`ref`做响应式处理，则父组件内的源数据对象与组件`BasicForm`内的响应数据对象互不干涉，而父组件可以通过`content`中每一个`formItem`的`component.event.submit`拿到修改后的数据对象

## 参数 `json` 格式

  ```json
  <formOption> = {
  	mode: {},  // Form绑定的数据对象
      attr: { },  // 参考 element-plus el-form 的属性以及HTML元素属性
      ref: ref(),
  	itemArr: [
      	[
      		{
                  span: 24,	// formItem所占据的宽度 ，只能为1-24
      			colAttr: {} // 包含Form-item的el-col的属性对象
                  attr: {}  // 参考 element-plus el-form-item 的属性以及HTML元素属性
                  component: {  // 渲染组件参数
                      // 所渲染的组件，可渲染原生HTML元素、element-plus组件、自定义组件，所填值皆为元素名
                      // 原生HTML元素、element-plus组件元素名为String，自定义组件为 组件
                      comp: '',
                      attr: {}, // 组件自身属性以及HTML元素属性
                      event: {} // 组件自身事件
                      publicEvent: 'submit' | 'reset',  // 组件调用的公共方法
                      content: '' // 文本内容
                      children: [
                          {
                              comp: '',
                              attr: {},
  							event: {}，
                              content: '' // 文本内容
  							children: []
                          }
                      ]
                  }
              }
      	]
      ]，
  	type: "Form", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  }
  ```

###  参数说明

  1. `FormType`

     | 属性名  |                             说明                             |            类型            | 默认值 |
     | :-----: | :----------------------------------------------------------: | :------------------------: | :----: |
     |  mode   |                         表单数据对象                         |    `Record<String, any>`     |   -    |
     |  attr   | `el-form`的属性对象，值为`element-plus`中 `el-form` 的属性以及 HTML 元素属性 |    `Record<String, any>`    |   -    |
     |   ref   |                   `el-form`组件的实例对象                    |           `Ref<T> `          |   -    |
     | itemArr |                     表单项数组，二维数组                     | `Array<Array<FormItemType>` |   -    |

  2. `FormItemType`

     | 属性名  |                             说明                             |        类型         | 默认值 |
     | :-----: | :----------------------------------------------------------: | :-----------------: | :----: |
     |  span   |                        栅格占据的列数                        |       `Number `       |   24   |
     |  attr   | `el-form-item`的属性对象，值为`element-plus`中 `el-form-item` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
     | colAttr | 包含`el-form-item`的`el-col`的属性对象，值为`element-plus`中 `el-col` 的属性以及 HTML 元素属性 |`Record<String, any>` |   -    |
     |  comp   |              表单项所渲染的子元素组件的属性对象              |    `ComponentType`    |   -    |

  3. `ComponentType extends CompType` 

     |   属性名    |                             说明                             |        类型         | 默认值 |
     | :---------: | :----------------------------------------------------------: | :-----------------: | :----: |
     |    comp     |                           渲染组件                           | `String` \| `Component` |   -    |
     |    attr     | 组件的属性对象，值为组件自身的属性以及 HTML 元素属性以及事件 | `Record<String, any>` |   -    |
     |    event    |               组件事件对象，值为组件自身的事件               | `Record<String, any>` |   -    |
     | publicEvent |                      组件绑定的公共事件                      | `'submit' \| 'reset'` |   -    |
     |  children   | 组件内的子元素组件或插槽内容，如`el-check-group`的`el-check` | `Array<ChildrenType>` |   -    |
     |   content   |                       组件包含文本内容                       |         `any`         |   -    |

- 方法——通过 Ref 调用的方法

  |     方法名      |                             说明                             |                             类型                             |
  | :-------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
  |   `validate`    | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `(callback?: (isValid: Boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
  | `validateField` |                     验证具体的某个字段。                     | `(props?: Arrayable<FormItemProp>, callback?: (isValid: Boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
  |  `resetFields`  |       重置该表单项，将其值重置为初始值，并移除校验结果       |         `(props?: Arrayable<FormItemProp>) => void`          |
  | `scrollToField` |                       滚动到指定的字段                       |                `(prop: FormItemProp) => void`                |
  | `clearValidate` |                 清理某个字段的表单验证信息。                 |         `(props?: Arrayable<FormItemProp>) => void`          |

## 示例

<xw-demo
    demo-height="400px"
    source-code="element-plus:::form/form-demo"
/>