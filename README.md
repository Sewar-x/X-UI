# XW-UI

XW-UI 是基于 [Element](https://element.eleme.cn/#/zh-CN)、[Element Plus ](https://element-plus.org/zh-CN/component/overview.html)、[Ant Design](https://ant-design.antgroup.com/index-cn) 组件库二次封装，使用 JSON 配置快速开发的中后台组件库



## ✨ 特性

- 📦 开箱即用的 Vue2、Vue3、React 的组件库。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 使用 JSON 配置快速开发。



## 🖥 兼容环境

- 现代浏览器。



## 📦 安装

```shell
# NPM
npm install xw-ui

# Yarn
yarn install xw-ui

# pnpm
pnpm install xw-ui
```

**依赖安装**

XW-UI 是基于 [Element](https://element.eleme.cn/#/zh-CN)、[Element Plus ](https://element-plus.org/zh-CN/component/overview.html)、[Ant Design](https://ant-design.antgroup.com/index-cn) 组件库二次封装，请确保在你的项目需要预先安装以下插件/库：

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



## 📑 版本规范

**递增已发布包中的语义版本**

为了帮助依赖你的代码的开发者，我们建议你从 `1.0.0` 开始你的包版本并按如下方式递增：

| 代码状态             | 阶段     | 规则                                         | 示例版本 |
| -------------------- | -------- | -------------------------------------------- | -------- |
| 首次发布             | 新产品   | 从 1.0.0 开始                                | 1.0.0    |
| 向后兼容的缺陷修复   | 补丁版本 | 增加第三个数字                               | 1.0.1    |
| 向后兼容的新功能     | 次要版本 | 增加中间数字并将最后一位重置为零             | 1.1.0    |
| 破坏向后兼容性的更改 | 主要版本 | 增加第一位数字并将中间和最后一位数字重置为零 | 2.0.0    |

你可以从包的 `package.json` 文件中的依赖中指定包可以接受的更新类型。

例如，要指定最高 1.0.4 的可接受版本范围，请使用以下语法：

- 补丁发布：`1.0` 或 `1.0.x` 或 `~1.0.4`

- 次要版本：`1` 或 `1.x` 或 `^1.0.4`

- 主要版本：`*` 或 `x`

有关语义版本控制语法的更多信息，请参阅 [npm semver 计算器](https://semver.npmjs.com/)。
