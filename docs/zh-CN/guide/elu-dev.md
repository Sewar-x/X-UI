# 开发 XElementUI 组件

## **一、启动开发环境**

1. 进入组件项目：`packages/element-ui`
2. 安装依赖：`pnpm install`
3. 执行命令：`pnpm dev`

开发服务端口: `3633`

## **二、组件开发流程**

> 组件目录位于工程：`/packages/element-ui/components`。可参照已有组件进行新组件开发。

### **创建组件文件夹**

在`/packages/element-ui/components`目录下，以组件名作为文件夹名称，创建文件夹。

* 文件夹目录规范如下：

  ```shell
  - element-ui # 组件库目录
  │  index.js # 组件统一入口
  │  package.json
  ├─Form # 组件名称作为文件夹名称，文件夹和组件以大写字母开头
  │  │  index.js  # 组件入口文件
  │  │  type.d.js # 组件类型声明
  │  │
  │  └─src # 组件源码目录
  │      XForm.vue # 组件源码
  ```

### **提供组件入口 `index`  文件**

使用 `withInstall` 方法包装组件，`withInstall` 方法用于组件注册，以包装 `Table` 组件代码为示例：

```js
import { withInstall } from '../../utils'

import Form from './src/XForm.vue'
// 使用 withInstall 注册组件并导出组件
export const XForm = withInstall(Form)
// 使用 withInstall 注册组件并导出组件
export default XForm
```

### **按需引入组件入口导出组件**

在 `/packages/element-ui/components/index.ts`  文件中统一导出组件，该文件提供按需引入该组件的入口。

```js {5}
export * from './BasicComponent'
export * from './Button'
export * from './Descriptions'
export * from './Dialog'
export * from './Form'
export * from './Icon'
export * from './Menu'
```

### **一次性引入组件入口文件导出组件**

 在 `/packages/element-ui/index.js`  文件中，引入新开发的组件，该文件提供统一安装组件的入口。

```js {3,7}
import type { App } from 'vue'
import { BasicComponent } from './components/BasicComponent'
import { XForm } from './components/Form'
// 组件列表
export const elmPlusComponents = [
  BasicComponent,
  XForm,
]
// 遍历一次性注册所有组件
export const installer = (app: App) => {
  elmPlusComponents.forEach((comp) => app.use(comp))
}
```



## **三、开发组件 demo**

组件 demo 主要用于在文档中展示组件的用法示例。

### **规范原则**

在开发组件 demo 时，应该尽量遵循以下原则：

1. demo 应该简单，易懂。
2. 一个 demo 展示组件的一种用法。
3.  demo 中不能出现异步请求数据。
4. demo 示例代码要完整规范。

### **demo 开发**

#### **1. 启动 demo 开发开发服务**

* demo 开发服务主要用于在本地调试预览 demo 示例；
* 进入项目目录 `packages/element-ui`；
* 执行命令 `npm run dev` 启动 demo 开发服务。

#### **2. 添加 demo 路由**

**demo 路由作用**：

1. 组件库文档中查找 demo 示例路径：如在 Table 组件路由为 `/table-custom-columns`，则在组件库文档中引入 Form 组件 demo 路由为：`source-code="element-ui:::form/table-custom-columns"`

2. 在开发环境中，通过路由查看 demo 组件示例，对 demo 进行调试预览。

路由文件位于：`packages/element-ui/demo/router.js`

```js {6-10}
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/table-custom-columns',
      component: () => import('./table/table-custom-columns.vue'),
      name: 'TableCustomColumns'
    },
    {
      path: '/data-picker-shortcuts',
      component: () => import('./data-picker/data-picker-shortcuts.vue'),
      name: 'DataPickerShortcuts'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/table-custom-columns'
    },
  ]
})

export default router

```

如上，在 routes 数组中添加 `'/form-demo'` 路由对象。

#### **3.创建 demo 示例**

按照如下步骤创建 demo 示例：

1. **创建 demo 文件夹**： 
   * demo 目录 `packages/element-ui/demo/`中建立对应的组件文件夹；
   * 以组件名称作为文件夹名称。
2. **demo 组件命名：**
   * 以 **组件名+功能** 的方式进行命名。
   * 如: 自定义列的 table 组件：`table-custom-columns.vue`。
3. **添加路由**：
   * 注意：路由不仅仅是当前项目中访问，在 docs 项目中也是需要的，并且 docs 中的插件会通过一定规则来访问demo组件的源码文件，所以 **路由path 需要和 文件名 一致**。

## **四、组件测试**
