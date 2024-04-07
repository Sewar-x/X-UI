# 构建部署指南

当前项目构建和部署方式有两种方案：

1. 本地自动构建和部署
2. Jenkins 自动构建和部署

以下将对两种方案分别介绍部署流程和原理

## **本地自动构建和部署**

本地通过命令行，集成了 版本号修改、组件库构建、文档构建、git 推送、 npm 发布 等流程。

命令行脚本编写在项目根目录的 `package.json` 文件的 `script` 字段中：

```shell
  "scripts": {
    "docs:dev": "pnpm run -C docs docs:dev",
    "docs:build": "pnpm run -C docs docs:build && pnpm run -C packages/element-plus docs:build && pnpm run -C packages/element-ui docs:build &&  pnpm run -C packages/ant-design docs:build ",
    "docs:preview": "pnpm run -C docs docs:preview",
    "demo:dev-elp": "pnpm run -C packages/element-plus dev",
    "demo:dev-elu": "pnpm run -C packages/element-ui dev",
    "demo:dev-ant": "pnpm run -C packages/ant-design dev",
    "test:elp": "pnpm run -C test/packages/element-plus dev",
    "build": "pnpm run build:shared && pnpm run build:elp && pnpm run build:elu && pnpm run build:ant",
    "build:elp": "pnpm run -C packages/element-plus build",
    "build:elu": "pnpm run -C packages/element-ui build",
    "build:ant": "pnpm run -C packages/ant-design build",
    "build:hooks": "pnpm run -C packages/hooks build",
    "build:shared": "pnpm run -C packages/shared build",
    "release": "ts-node scripts/release.ts",
    "lint:script": "eslint --ext .js,.jsx,.ts,.tsx,.vue --fix ./"
  }
```

### **命令行总览**

以下是所有命令行的作用和参数总览

| 命令                   | 作用                                                       | 参数 |
| ---------------------- | ---------------------------------------------------------- | ---- |
| `npm run docs:dev`     | 启动本地组件库文档服务                                     | —    |
| `npm run docs:build`   | 本地构建组件库文档                                         | —    |
| `npm run docs:preview` | 本地预览组件库文档                                         | —    |
| `npm run demo:dev-elp` | 本地查看 `element plus` 组件库 demo                        | —    |
| `npm run demo:dev-elu` | 本地查看 `element ui` 组件库 demo                          | —    |
| `npm run demo:dev-ant` | 本地查看 `ant design` 组件库 demo                          | —    |
| `npm run build`        | 本地构建组件库和相关工具和函数库                           | —    |
| `npm run build:elp`    | 本地构建 `element plus` 组件库                             | —    |
| `npm run build:elu`    | 本地构建 `element ui` 组件库                               | —    |
| `npm run build:ant`    | 本地构建  `ant design` 组件库                              | —    |
| `npm run build:hooks`  | 本地构建  hooks 库                                         | —    |
| `npm run build:shared` | 本地构建 `共享工具` 库                                     | —    |
| `npm run release`      | 本地 版本号修改、组件库构建、文档构建、git 推送、 npm 发布 |      |

### **自动构建和发布**

####  `npm run release`

该命令执行本地 CICD 流程，集成了本地 修改版本号、组件库构建、文档构建、git 推送、 npm 发布 等流程。

* **参数**

  | 参数                      | 作用                    | 示例                                          | 说明                                                         |
  | ------------------------- | ----------------------- | --------------------------------------------- | ------------------------------------------------------------ |
  | `ver` 或 `releaseVersion` | 发布版本号              | `--ver=1.0.30`<br />`--releaseVersion=1.0.30` |                                                              |
  | `t` 或 `tag`              | git 标签                | `--t=latest`<br />`--tag=latest`              |                                                              |
  | `npm`                     | 是否发布到 npm 私有仓库 | `--npm=true`                                  | 默认使用 nrm 管理 npm，并且默认切换到名称为 localhost 的本地 npm 仓库 |
  | `b` 或 `build`            | 是否本地构建组件库      | `--b=false`<br />`--build=false`              |                                                              |
  | `doc` 或 `docBuild`       | 是否本地构建组件库文档  | `--doc=false`<br />`--docBuild=false `        |                                                              |

* **示例**

  ```shell
  # 发布版本号： 1.0.30、 git 标签:latest、 上传到 npm 私有镜像、不进行本地构建、不进行本地文档库构建
  pnpm run release -- --ver=1.0.30 --t=latest --npm=true --b=false --doc=false
  # 发布版本号： 1.0.30、 git 标签:latest、 上传到 npm 私有镜像、不进行本地构建、不进行本地文档库构建
  pnpm run release -- --releaseVersion=1.0.30 --tag=latest --npm=true --build=false --docBuild=false  
  ```

  
