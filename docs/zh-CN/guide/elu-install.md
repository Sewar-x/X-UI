# 使用 `xw-element-ui`

本节将介绍如何在项目中使用 X Element UI。

## 环境支持
::: tip 当前封装所使用的库版本
- element-plus 版本为： `2.15.+`
- vue 版本为： `2.6.+`
  :::

## 安装

### 1. 使用包管理器
```shell
# NPM
npm install xxx

# Yarn
yarn install xxx

# pnpm
pnpm install xxx
```

## 快速开始
### 1. 完整引入
`xw-element-ui` 将会在Vue应用中进行**全局组件注册**。

```js
// main.js
import Vue from 'vue'
import XWElementUi from '@xw-element-ui'
import '@xw-element-ui/dist/style.css'

Vue.use(XWElementUi)
```

### 2. 按需引入
1. 需要在使用组件的地方手动对 `X组件` 进行导入。
    ```html
    <!-- App.vue -->
    <template>
      <x-table>
        <el-table-column ... />
      </x-table>
    </template>
    
    <script>
      import { XTable } from '@xw-element-ui'
      
      export default {
        name: 'App',
        components: { XTable }
      }
    </script>
    ```
   
2. 在全局中进行 `X组件` 部分注册
    ```js
    import Vue from 'vue';
    import { XTable } from '@xw-element-ui';
    import App from './App.vue';
    
    Vue.component(XTable.name, XTable);
    /* 或写为
     * Vue.use(XTable)
     */
    
    new Vue({
      el: '#app',
      render: h => h(App)
    });
    ```

## 注意事项
::: danger 关于原生库
组件库打包时会对第三方包如 `element-ui` 、`vue` 进行 `externals` 处理，所以务必保证使用组件的项目中导入必须要的第三方库。
:::
