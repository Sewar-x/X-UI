# 开发 XAntDesign 组件

## **一、启动开发环境**

1. 进入组件项目：`packages/ant-design`
2. 安装依赖：`pnpm install`
3. 执行命令：`pnpm dev`

开发服务端口: `3933`

## **二、组件开发流程**

> 组件目录位于工程：`/packages/ant-design/components`。可参照已有组件进行新组件开发。

### **创建组件文件夹**

在`/packages/ant-design/components`目录下，以组件名作为文件夹名称，创建文件夹。

* 文件夹目录规范如下：

  ```shell
  - ant-design # 组件库目录
  │  index.ts # 组件统一入口
  │  package.json
  ├─Form # 组件名称作为文件夹名称，文件夹和组件以大写字母开头
  │  │  index.ts  # 组件入口文件
  │  │  type.d.ts # 组件类型声明
  │  │
  │  └─src # 组件源码目录
  │      XForm.tsx # 组件源码
  ```

### **提供组件入口 `index`  文件**

入口文件可以对组件进行别名，需要提供默认导出和单个导出：

```js
import Button from './button'
export const XButton = Button
export default XButton
```

### **按需引入组件入口导出组件**

在 `/packages/ant-design/components/index.ts`  文件中统一导出组件，该文件提供按需引入该组件的入口。

```js {1}
export * from './button'
```

### **一次性引入组件入口文件导出组件**

 在 `/packages/ant-design/index.ts`  文件中，引入新开发的组件，该文件提供统一安装组件的入口。

```js {3,17}
export * from './components'
export * from './hooks'
```



## **三、开发组件 demo**

组件 demo 主要用于在文档中展示组件的用法示例。

### **规范原则**

在开发组件 demo 时，应该尽量遵循以下原则：

1. demo 应该简单，易懂。
2. 一个 demo 展示组件的一种用法。
3. demo 中不能出现异步请求数据。
4. demo 示例代码要完整规范。

### **demo 开发**

#### **1. 启动 demo 开发开发服务**

* demo 开发服务主要用于在本地调试预览 demo 示例；
* 进入项目目录 `packages/ant-design`；
* 执行命令 `npm run dev` 启动 demo 开发服务。

#### **2. 添加 demo 路由**

**demo 路由作用**：

1. 组件库文档中查找 demo 示例路径：如在 Form 组件路由为 `/form-demo`，则在组件库文档中引入 Form 组件 demo 路由为：

   `ant-design:::button/button-demo`
   
2. 在开发环境中，通过路由查看 demo 组件示例，对 demo 进行调试预览。

路由文件位于：`packages/ant-design/demo/router.ts`

```js {6-9}
import * as React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import lazyLoad from "../hooks/lazyLoad";
import { RouteObject } from "../types";
const router: RouteObject[] = [
  {
    path: "/button-demo",
    element: lazyLoad(React.lazy(() => import("./button/button-demo"))),
  },
  {
    path: "*",
    element: <Navigate to="/button-demo" />,
  },
];

const Router = () => {
  const routes = useRoutes(router);
  return routes;
};

export default Router;

```

如上，在 routes 数组中添加 `'/button-demo'` 路由对象。

#### **3.创建 demo 示例**

按照如下步骤创建 demo 示例：

1. **创建 demo 文件夹**： 
   * demo 目录 `packages/ant-design/demo/`中建立对应的组件文件夹；
   * 以组件名称作为文件夹名称。
2. **demo 组件命名：**
   * 以 **组件名+功能** 的方式进行命名。
   * 如: 自定义列的 table 组件：`table-custom-columns.tsx`。
3. **添加路由**：
   * 注意：路由不仅仅是当前项目中访问，在 docs 项目中也是需要的，并且 docs 中的插件会通过一定规则来访问 demo 组件的源码文件，所以 **路由path 需要和 文件名 一致**。

## **四、组件测试**
