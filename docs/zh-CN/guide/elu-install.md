# 使用 sewen-ui/Element-UI

本节将介绍如何在项目中使用 sewen-ui Element UI。

## 环境支持

::: tip 当前封装所使用的库版本

- node 版本为： `14.17.+`
- element-ui 版本为： `2.15.+`
- vue 版本为： `3.2.+`
  :::

## 安装

### 1. 安装 sewen-ui

```js [NPM]
# npm
npm install sewen-ui
```

```js [Yarn]
# yarn
yarn install sewen-ui
```

```js [PNPM]
# pnpm
pnpm install sewen-ui
```

### 2. 安装相关依赖

```js [NPM]
npm install element-ui -S
```

```js [Yarn]
yarn add element-ui -S
```

```js [PNPM]
pnpm install element-ui -S
```

### 注意

::: danger 关于 npm 镜像源
sewen-ui 发布在私有 npm 镜像中，下载该包之前先切换 npm 镜像源
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

5. 安装以上步骤安装 sewen-ui

   ```shell
   npm install sewen-ui
   ```

6. 安装相关依赖

   ```shell
   # 切换镜像源到 npm 下载相关依赖
   nrm use npm
   # 安装相关依赖
   npm install element-ui -S
   ```

   

## 快速开始

::: danger 关于依赖库
组件库打包时会对第三方包如 `element-UI` 、`vue` 进行 `externals` 处理，所以 sewen-ui 源代码中没有将 Vue 相关代码打包。

务必保证使用组件的项目中导入必须要的第三方库。
:::



sewen-ui 的 Vue2 组件库是基于 [Element UI](https://element.eleme.cn/#/zh-CN/guide/design) 进行二次封装，因此在使用 sewen-ui 之前，需要将 Element UI 完整导入到你的项目。

**完整导入 Element UI**

在 main.js 中写入以下内容：

```javascript {2-3,6}
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

以上代码便完成了 Element UI 的导入。需要注意的是，样式文件需要单独引入。

> 详细参考 Element UI 官方文档：[组件 | Element](https://element.eleme.cn/#/zh-CN/component/quickstart)



### 完整引入 sewen-ui

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

`x-element-UI` 将会在Vue应用中进行**全局组件注册**。

```ts {4-7,9-10}
// main.js
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import XWUI from 'sewen-ui'
import 'sewen-ui/packages/element-ui/dist/style.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
XWUI.XElementUI.XElementUiInstall(Vue)
new Vue({
  render: h => h(App),
}).$mount('#app')

```

使用 `sewen-ui`:

```vue
<template>
  <XTable :data="tableData" :default-columns="defaultColumns">
    <el-table-column prop="date" label="日期" width="90"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="90"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="90"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </XTable>
</template>

<script>
export default {
  name: "TableCustomColumns",
  data() {
    return {
      defaultColumns: ["日期", "姓名", "地址"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1516 弄111",
        },
      ],
    };
  },
};
</script>
```



### 按需引入  sewen-ui 组件

直接在使用的地方使用完整路径 (`sewen-ui/packages/element-ui/dist/index.es.js`) 导入相关组件即可：
```vue
<template>
  <x-table :data="tableData" :default-columns="defaultColumns">
    <el-table-column prop="date" label="日期" width="90"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="90"> </el-table-column>
    <el-table-column prop="age" label="年龄" width="90"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </x-table>
</template>

<script>
// 使用完整路径导入组件
import { XTable } from "sewen-ui/packages/element-ui/dist/index.es.js";
export default {
  name: "TableCustomColumns",
  // 指定使用的组件
  components: { XTable },
  data() {
    return {
      defaultColumns: ["日期", "姓名", "地址"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          age: 20,
          address: "上海市普陀区金沙江路 1516 弄111",
        },
      ],
    };
  },
};
</script>

```



