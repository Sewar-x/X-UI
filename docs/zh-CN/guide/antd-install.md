# 使用 sewen-ui/Ant-Design

本节将介绍如何在项目中使用 sewen-ui Ant-Design。

## 环境支持

::: tip 当前封装所使用的库版本

- node 版本为： `18.+`
- Ant-Design 版本为： `4.21.+`
- react 版本为： `18.2.+`
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
npm install antd --save
```

```js [Yarn]
yarn add antd --save
```

```js [PNPM]
pnpm install antd --save
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
   npm install antd --save
   ```

   

## 快速开始

::: danger 关于依赖库
组件库打包时会对第三方包如 `Ant-Design` 、`react` 进行 `externals` 处理，所以 sewen-ui 源代码中没有将 React 相关代码打包。

务必保证使用组件的项目中导入必须要的第三方库。
:::



sewen-ui 的 React 组件库是基于 [Ant Design](https://ant-design.antgroup.com/index-cn) 进行二次封装，因此在使用 sewen-ui 之前，需要将 Ant-Design 完整导入到你的项目。

> 如何引入 Antd 参考 Ant Design 官方手册：
>
> [在 create-react-app 中使用 - Ant Design (antgroup.com)](https://ant-design.antgroup.com/docs/react/use-with-create-react-app-cn)
>
> [在 Vite 中使用 - Ant Design (antgroup.com)](https://ant-design.antgroup.com/docs/react/use-with-vite-cn)

### 引入 sewen-ui

在你的页面组件中直接引入 sewen-ui 的 ant design 组件库

```tsx
import React from "react";
import { XwButton } from "sewen-ui/ant-design";

const ButtonDemo = () => {
  return (
    <>
      <XwButton />
    </>
  );
};

export default ButtonDemo;
```



