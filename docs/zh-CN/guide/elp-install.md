# 使用 XW-UI/Element-Plus

本节将介绍如何在项目中使用 XW-UI Element Plus。

## 环境支持
::: tip 当前封装所使用的库版本
- element-plus 版本为： `2.6.+`
- vue 版本为： `3.2.+`
:::

## 安装

### 1. 安装 XW-UI

```js [NPM]
# npm
npm install xw-ui
```

```js [Yarn]
# yarn
yarn install xw-ui
```

```js [PNPM]
# pnpm
pnpm install xw-ui
```

### 2. 安装相关依赖

```js [NPM]
npm install element-plus
```

```js [Yarn]
yarn add element-plus
```

```js [PNPM]
pnpm install element-plus
```

### 注意

::: danger 关于 npm 镜像源
XW-UI 发布在私有 npm 镜像中，下载该包之前先切换 npm 镜像源
:::

如果你使用的私有 npm 仓库，请先将镜像源切换到你的私有 npm 仓库，推荐使用 [nrm](https://www.npmjs.com/package/nrm)  来管理你的镜像源。

你可以按照以下步骤使用 nrm 切换镜像源：

1. 全局安装nrm包：

   ```shell
   npm install -g nrm
   ```

2. 查看nrm的包源

   ```shell
   nrm ls // 查看当前npm的包源
   ```

3. 添加 npm 镜像源，将你的 npm 私有仓库地址添加到 nrm:

   ```shell
   nrm add your-private-npm http://your-private-npm-domain/
   ```

   > 将以上 `your-private-npm` 替换成你的镜像源名称（自定义），`http://your-private-npm-domain/` 替换成你的 npm 仓库地址

4. 使用 nrm 切换成私有 npm 仓库：

   ```shell
   nrm use your-private-npm
   ```

5. 安装以上步骤安装 XW-UI

   ```shell
   npm install xw-ui
   ```

6. 安装相关依赖

   ```shell
   # 切换镜像源到 npm 下载相关依赖
   nrm use npm
   # 安装相关依赖
   npm install element-plus
   ```

   

## 快速开始

::: danger 关于依赖库
组件库打包时会对第三方包如 `element-plus` 、`vue` 进行 `externals` 处理，所以 XW-UI 源代码中没有将 Vue 相关代码打包。

务必保证使用组件的项目中导入必须要的第三方库。
:::



### 完整引入 XW-UI

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

XW-UI 的 Vue3 组件库是基于 [Element Plus](https://element-plus.org/zh-CN/guide/quickstart.html) 进行二次封装，因此在使用 XW-UI 之前，需要将 Element Plus 导入到你的项目。

#### **1. 完整导入 Element Plus**

在 main.js 中写入以下内容：

```javascript{3-4,9}
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

以上代码便完成了 Element Plus 的导入。需要注意的是，样式文件需要单独引入。

> 详细参考 Element plus 官方文档：[组件 | Element](https://element.eleme.cn/#/zh-CN/component/quickstart)

#### **2. 完整引入 XW-UI**
`x-element-plus` 将会在Vue应用中进行**全局组件注册**。

```ts{5-6,11}
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import XWElementPlus from 'xw-ui/element-plus'
import 'xw-ui/element-plus/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus).use(XWElementPlus)
app.mount('#app')
```



### 按需引入  XW-UI

#### **1. 自动导入（推荐）**

您需要使用额外的插件来导入要使用的 Element Plus 组件。

1. 首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
# npm
npm install -D unplugin-vue-components unplugin-auto-import

# pnpm
pnpm install -D unplugin-vue-components unplugin-auto-import
```

2. 然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

**[Vite](https://element-plus.org/zh-CN/guide/quickstart.html#vite)**

```js
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

[**Webpack**](https://element-plus.org/zh-CN/guide/quickstart.html#webpack)

```js
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

想了解更多打包 ([Rollup](https://rollupjs.org/), [Vue CLI](https://cli.vuejs.org/)) 和配置工具，请参考 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import#install)。

3. 需要在使用 `XW-UI ` 组件的地方进行按需引入。

```vue
<template>
  <XBasicForm :options="createForm"></XBasicForm>
</template>

<script setup lang="ts">
// 使用的文件直接按需引入
import { XBasicForm } from "xw-ui/element-plus";
// 响应数据
let obj = {};
// from 表单配置项
const createForm = {
  mode: obj,
  attr: {
    "label-width": "30px",
  },
  itemArr: [],
};
</script>
<style scoped lang="less"></style>
```



#### 2. 手动导入

Element Plus 提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。

1. 你需要安装 [unplugin-element-plus](https://github.com/element-plus/unplugin-element-plus) 来导入样式。 配置文档参考 [docs](https://github.com/element-plus/unplugin-element-plus#readme).

```js
// vite.config.ts
import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  // ...
  plugins: [ElementPlus()],
})
```

::: danger 当前封装所使用的库版本
如果使用 `unplugin-element-plus` 并且只使用组件 API，你需要手动导入样式。

Example:

```
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
```

:::



2. 需要在使用 `XW-UI ` 组件的地方进行按需引入。

```vue
<template>
  <XBasicForm :options="createForm"></XBasicForm>
</template>
<script>
    // 使用的文件按需引入 Element Plus 相关组件
	import { ElForm,ElFormItem } from 'element-plus'
    // 使用的文件按需引入 XW-UI 相关组件
	import { XBasicForm } from "xw-ui/element-plus";
    export default {
        components: {  ElForm,ElFormItem,XBasicForm },
    }
</script>
<script setup lang="ts">
// 响应数据
let obj = {};
// from 表单配置项
const createForm = {
  mode: obj,
  attr: {
    "label-width": "30px",
  },
  itemArr: [],
};
</script>
<style scoped lang="less"></style>
```

