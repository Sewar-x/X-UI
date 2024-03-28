# docs 项目

**docs** 项目主要用于介绍公共组件用法和示例。

本节将介绍如何开发、维护组件文档 **docs** 项目。

---



## 一、启动开发环境

### **1.启动开发服务**

1. 依赖安装：`pnpm install`
2. 启动文档 **docs** 项目 `dev server`：
   - 项目根路径执行 `pnpm docs:dev`
   - 进入 **docs** 项目执行 `pnpm docs:dev`
3. 启动本次开发的组件库 `dev server`：
   - 进入相应的组件库目录，执行 `pnpm dev`
   



### **2.开发预览 demo组件** 

> 为了实现各大框架的样式隔离，开发环境下 Demo 预览最终采用了 `iframe` 的方案：
>
> 每个 demo组件实际上是通过 `iframe` 的形式加载以在文档项目中显示。
>
> 如果需要在开发环境的文档项目中预览 demo 组件，需要**到对应的组件库中启动 dev 环境**。
>
> 关于各 ui库 `dev server` 端口说明：
>
> * element-plus：`3333`
>
> * element-ui：`3633`
>
> * ant-design：`3933`

开发环境下预览 demo 组件，启动 demo 服务流程如下：

**方法一：直接启动服务。**

以启动 `element-plus` 组件 Demo 预览为例：

1. 进入 `element-plus` 组件文件夹目录：

   ```shell
   cd packages/element-plus 
   ```

2. 启动element-plus 组件开发预览服务：

   ```shell
   pnpm run dev
   ```

启动完成后，打开文档 `element-plus` 组件进行 Demo 示例预览。

**方法二：命令行启动。**

启动 demo 组件预览服务命令如下：

* 启动 `element-plus` 预览服务：`pnpm run demo:dev-elp`
* 启动 `element-ui`     预览服务：`pnpm run demo:dev-elu`
* 启动 `ant-design`     预览服务：`pnpm run demo:dev-ant`



---



## 二、文档侧边栏说明
### **指南侧边栏**

新增文档指南的侧边栏，需要手动配置侧边栏。

在`docs/.vitepress/configs/sildebar.ts`目录中，添加对应组件库指南配置：

```js
export default {
  '/zh-CN/guide/': [ // 指南侧边栏
    {
      text: '快速开始',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: 'xw-element-plus', link: '/zh-CN/guide/elp-install' },
        { text: 'xw-element-ui', link: '/zh-CN/guide/elu-install' },
        { text: 'xw-ant-design', link: '/zh-CN/guide/antd-install' },
      ]
    },
    {
      text: '开发者指南',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: 'docs项目', link: '/zh-CN/guide/docs-dev' },
        { text: 'element-plus', link: '/zh-CN/guide/elp-dev' },
        { text: 'element-ui', link: '/zh-CN/guide/elu-dev' },
      ]
    }
  ],
  '/zh-CN/components/element-plus': elementPlusSideBar, // elementPlus 侧边栏配置
  '/zh-CN/components/element-ui': elementUiSideBar,// elementUI 侧边栏配置
  '/zh-CN/components/ant-design': antDesignSideBar// antDesign 侧边栏配置
}

```



### **组件库侧边栏**

组件库侧边栏通过插件生成，开发者无需手动配置。

**请按照当前的文件夹层级进行开发**，实例如下：具体一级、二级分类完全参照对应的ui库，可自行参考。

```js
> zh-CN
   > components
      > element-plus
         > Data 数据展示 (对应侧边栏一级菜单)
            > table.md（对应侧边栏二级菜单）
```

## 三、demo 组件引入

组件文档按照对应的 ui框架 的对应组件文档的结构来正常编写即可。

需要注意的点就是**如何导入对应的** `demo组件` :

由于在 docs 项目导入 **demo组件运行状态**、**源代码** 是通过插件实现，节省了很多人工成本，所以开发者需要遵循一定的使用规范。接下来以 `xw-element-plus` 为例进行讲解。

### 1. demo 高度
由于使用 `iframe` 对 demo组件 进行包裹，所以需要手动设置 `iframe` 的高度（**字符串**）。

不传默认为 `"320px"` 。

```html
<xw-demo
   demo-height="270px"
/>
```

### 2. 组件加载和源代码导入
组件加载和组件源码导入通过插件识别 `kebab case` 命名规范的 `sourceCode` 实现。

一下以配置 form 组件为示例。

```js
<xw-demo
    demo-height="550px"
    source-code="element-plus:::form/formDemo"
/>

```

使用 demo 组件展示组件示例，通过 `xw-demo` 组件展示，并传入  `sourceCode` 属性，属性配置如下：

* `sourceCode` : 配置 demo 组件源码, `sourceCode` 最终通过插件会得到个经过 `encode` 的 html 代码。

  * 必填项

  * 示例： `sourceCode=element-plus:::form/formDemo`

  * > 1. 属性值模式： `项目名:::文件地址` ，通过 `:::` 符号对项目名和文件地址进行分割;
    >
    > 2. 分割得到项目名 `element-plus` 会采用 `element-plus` 对应的 dev 端口，且会在 `element-plus` 项目中读取源代码。
    >
    >    ```js
    >    开发环境下 element-plus对应值为： 'http://localhost:3333/'
    >    生产环境下 element-plus对应值为： '/element-plus/'
    >    详细值通过 docs/ 文件下 .env 和 .env.production 环境变量中配置
    >    ```
    >
    > 3. 分割得到路径 `form/formDemo` ，插件会到对应项目的 demo 目录下读取源码文件 (源码文件位于`packages/element-plus/demo/form/formDemo`)，并通过 `prismjs` 对源码进行高亮等处理。
    >
    > 4. 注意 **demo 组件的文件名需要和对应的路由path 一致**（对应案例中的：`/table-custom-columns`），插件会根据文件名拼接 dev 环境的 demo 组件访问地址。

