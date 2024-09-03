# sewen-ui

> 官方文档：[sewen-ui | Vue2 & Vue3 & React JSON configer Component Library (sewar-x.github.io)](https://sewar-x.github.io/X-UI/)



* 通用组件库：基于 [Element](https://element.eleme.cn/#/zh-CN)、[Element Plus ](https://element-plus.org/zh-CN/component/overview.html)、[Ant Design](https://ant-design.antgroup.com/index-cn) 组件库二次封装，使用 JSON 配置快速开发的中后台组件库。
* Echart 组件
* 插件：
  * xhttp 插件： 基于 axios 二次封装 http 请求插件，在 axios 基础上扩展功能；
  * vivien-permission：一个基于后台管理系统中的路由菜单权限控制系统，通过 vue-router 全局控制后台管理系统的菜单权限。



## ✨ 特性

- ✂ 支持按需引入组件/插件。
- 📦 开箱即用的 Vue2、Vue3、React 的组件库。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 通用组件库使用 JSON 配置快速开发。



## 🛠 组件和插件列表

该库目前包含以下组件和插件：

| 组件                                                         | 介绍                                                         | 插件                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------- |
| [XElement](https://sewar-x.github.io/X-UI/zh-CN/components/element-ui/Vue2%20%E7%BB%84%E4%BB%B6%E6%80%BB%E8%A7%88/Vue2%20%E7%BB%84%E4%BB%B6%E6%80%BB%E8%A7%88.html) | 基于 element-ui  二次封装的通用组件库                        | `sewen-ui/element-ui`   |
| [XElementPlus](https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/Vue3-%E7%BB%84%E4%BB%B6%E6%80%BB%E8%A7%88.html) | 基于 element-plus  二次封装的通用组件库                      | `sewen-ui/element-plus` |
| [XAntDesign](https://sewar-x.github.io/X-UI/zh-CN/components/ant-design/React%20%E7%BB%84%E4%BB%B6%E6%80%BB%E8%A7%88/React%20%E7%BB%84%E4%BB%B6%E6%80%BB%E8%A7%88.html) | 基于 ant-design  二次封装的通用组件库                        | `sewen-ui/ant-design`   |
| [XEchart](https://sewar-x.github.io/X-UI/zh-CN/components/echarts/Vue2-Echarts/Bar%20%E6%9D%A1%E5%BD%A2%E5%9B%BE.html) | 基于 echarts 封装的 echarts  组件库                          |                      |
| [Xhttp](https://sewar-x.github.io/X-UI/zh-CN/components/library/xhttp/%E4%BD%BF%E7%94%A8.html) | 基于 [axios](https://www.axios-http.cn/docs/intro) 二次封装，在 axios 的基础上增加了一些功能的 http 请求库 | `sewen-ui/xhttp`        |
| [vivien-permission](https://sewar-x.github.io/X-UI/zh-CN/components/library/vivien-permission/%E4%BD%BF%E7%94%A8.html) | 基于后台管理系统中的路由菜单权限控制系统，通过 vue-router 全局控制后台管理系统的菜单权限插件 | `sewen-ui/permission`   |





## 🖥 兼容环境

- 现代浏览器。



## 📦 安装

```shell
# NPM
npm install sewen-ui

# Yarn
yarn install sewen-ui

# pnpm
pnpm install sewen-ui
```

**依赖安装**

sewen-ui 是基于 [Element](https://element.eleme.cn/#/zh-CN)、[Element Plus ](https://element-plus.org/zh-CN/component/overview.html)、[Ant Design](https://ant-design.antgroup.com/index-cn) 组件库二次封装，请确保在你的项目需要预先安装以下插件/库：

| 组件库          | 依赖           | 版本      |
| --------------- | -------------- | --------- |
| **Element**     |                |           |
|                 | `vue`          | `~2.6.0`  |
|                 | `element-ui`   | `^2.15.6` |
|                 |                |           |
| **Elment Plus** |                |           |
|                 | `vue`          | `^3.2.36` |
|                 | `element-plus` | `^2.6.2`  |
|                 |                |           |
| **Ant Design**  |                |           |
|                 | `react`        | `^18.2.0` |
|                 | `react-dom`    | `^18.2.0` |
|                 | `antd`         | `^4.21.7` |

**使用 Element 组件库**：安装 Vue2 和 Element

```shell
npm install vue@2.6.0  element-ui
```



**使用 Element Plus 组件库**：安装 Vue3 和 Element plus

```shell
npm install vue@3.2.36  element-plus
```



**使用 Ant Design 组件库**：安装 React 和 Ant Design

```shell
npm install react@18.2.0  react-dom@18.2.0 antd
```



