# 使用 XW-UI/Element-Plus

本节将介绍如何在项目中使用 XW-UI Element Plus。

## 环境支持
::: tip 当前封装所使用的库版本
- node 版本为： `18+`
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



XW-UI 的 Vue3 组件库是基于 [Element Plus](https://element-plus.org/zh-CN/guide/quickstart.html) 进行二次封装，因此在使用 XW-UI 之前，需要将 Element Plus 完整导入到你的项目。

**完整导入 Element Plus**

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



### 完整引入 XW-UI

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

`x-element-plus` 将会在Vue应用中进行**全局组件注册**。

```ts{5-6,11-13}
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { XElementPlusInstall } from 'xw-ui/element-plus'
import 'xw-ui/element-plus/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
// 注册XElementPlus所有组件
XElementPlusInstall(app)
app.mount('#app')
```



### 按需引入  XW-UI

需要在使用 `XW-UI ` 组件的地方进行按需引入。

```vue{3,9,12}
<template>
  <div>
    <x-basic-form :options="createForm" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { XBasicForm } from "xw-ui/element-plus";
export default defineComponent({
  components: {
    XBasicForm,
  },
  setup() {
    return {
      createForm: {
        mode: {
          username: "XW-UI",
          description: "an vue2/3 & react componet library",
          place: "huizhou",
          remarks: "Vue React",
          github: "https://github.com/Sewar-x/X-UI/",
        },
        attr: {
          "label-width": "30px",
        },
        items: [
          [
            {
              attr: {
                prop: "username",
              },
              component: {
                comp: "el-input",
              },
            },
          ],
          [
            {
              attr: {
                prop: "description",
              },
              component: {
                comp: "el-input",
              },
            },
          ],
          [
            {
              attr: {
                prop: "place",
              },
              component: {
                comp: "el-input",
              },
            },
          ],
          [
            {
              attr: {
                prop: "remarks",
              },
              component: {
                comp: "el-input",
              },
            },
          ],
          [
            {
              attr: {
                prop: "github",
              },
              component: {
                comp: "el-input",
              },
            },
          ],
        ],
      },
    };
  },
});
</script>

```

