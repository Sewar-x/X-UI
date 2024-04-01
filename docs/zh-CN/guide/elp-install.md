# 使用 `x-element-plus`

本节将介绍如何在项目中使用 XW-UI Element Plus。

## 环境支持
::: tip 当前封装所使用的库版本
- element-plus 版本为： `2.6.+`
- vue 版本为： `3.2.+`
:::

## 安装

### 1. 安装 XW-UI
```shell
# NPM
npm install xw-ui

# Yarn
yarn install xw-ui

# pnpm
pnpm install xw-ui
```

### 2. 安装相关依赖

```shell
# NPM
npm install vue@3.2.36  element-plus

# Yarn
yarn add vue@3.2.36  element-plus

# pnpm
pnpm install vue@3.2.36  element-plus
```

### 注意

::: danger 关于原生库
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
   npm install vue@3.2.36  element-plus
   ```

   

## 快速开始

::: danger 关于原生库
组件库打包时会对第三方包如 `element-plus` 、`vue` 进行 `externals` 处理，所以务必保证使用组件的项目中导入必须要的第三方库。
:::

### 1.完整引入 Element Plus

> 详细参考 Element plus 官方文档：[组件 | Element](https://element.eleme.cn/#/zh-CN/component/quickstart)

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。



### 2. 完整引入 XW-UI
`x-element-plus` 将会在Vue应用中进行**全局组件注册**。

```ts
// main.ts
import { createApp } from 'vue'
import XWElementPlus from 'xw-ui/element-plus'
import 'xw-ui/element-plus/style.css'

const app = createApp(App)
app.use(XWElementPlus)
```

### 3. 按需引入  XW-UI
需要在使用组件的地方手动对 `X组件` 进行导入。
```html
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

