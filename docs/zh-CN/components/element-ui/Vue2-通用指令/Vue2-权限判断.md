# 权限判断

## hasPermission 指令

 该指令是基于 Vue2 封装的指令，用于判断用户是否具有 组件/按钮 级别的权限。



### 使用

1. 在 `main.js` 文件中加入以下代码：

```javascript
import Vue from 'vue'
import { directive } from 'sewen-ui/element-ui'
import permissionList from './permission/index.js'
import permissions from '服务端返回的用户权限列表接口数组'
Vue.use(directive.permission, {
    permissionList, // 预配置的权限列表
    permissions
})
```

2. 创建按钮权限管理文件

在你项目中，新增按钮权限管理文件夹：`src/permission`；

在该文件下新增 index.js 文件和 modules 文件夹；

index.js 文件加入以下代码：`src/permission/index.js` 默认加载 modules 文件夹所有文件内容。

```javascript
/**
 * 权限配置模块文件，统一引入所有权限配置文件
 */

//  require.context返回modules文件夹下所有的文件对象,参考https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
/*
*通过直接获取modules文件夹下的所有文件添加进入modules对象
*回调函数参数：
*modules：文件对象
*modulePath：文件路径
*/
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 获取文件名称
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')

  // 获取路径保存在modulePath文件内容
  const value = modulesFiles(modulePath)

  // 修改modules对象
  modules[moduleName] = value.default

  return modules
}, {})

export default modules

```

`src/permission/modules `  文件夹下创建文件，文件默认导出对象，对象key 为权限标识名称，值为权限标识字符串。

以创建 user.js 用于按钮权限为例：

在 `src/permission/modules/user.js `  文件夹创建 user.js 文件，该文件默认导出以下内容：

```json
export default {
	"add": '用户新增按钮权限字符串标识',
    "delete": '用户删除按钮权限字符串标识',
    "edit": '用户编辑按钮权限字符串标识',
}
```



3. 在组件中使用指令：

* 在 `<template>` 模板中使用:
  ```vue
  v-permission="{module:'模块文件名称',auth:'权限key值'}"
  ```

* 在函数中使用：

  ```js
  this.hasPermissions(module:'模块文件名称',auth:'权限key值')
  ```

  


## 贡献者
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const xhttpMembers = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/28383640?v=4',
    name: 'Sewen',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/Sewar-x' }
    ]
  }
]

const permissionMembers = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/95331757?v=4',
    name: 'Vivien',
    title: 'Staff Frontend Engineer',
    links: [
      { icon: 'github', link: 'https://github.com/yoguoer' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamMembers
    :members="xhttpMembers"
  />
</VPTeamPage>