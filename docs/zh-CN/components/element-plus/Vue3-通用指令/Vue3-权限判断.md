# 权限判断

## hasPermission 指令
 这是一个基于 Vue3 进行封装的自定义指令，在这个插件中，你可以检查传入的系统权限列表和用户拥有的权限列表，来确定用户是否具有某个组件/按钮级别的权限，实现更细粒度的权限控制。

## 使用方法

1. 在你的项目根目录中新建一个permission文件夹，并在文件夹下新建一个index.ts文件和一个modules文件夹。

> modules文件夹用来放置不同模块的权限控制文件（一般各个模块各自建一个.ts文件），而index.ts用来遍历读取modules下的所有文件，并将所有文件转换为键值对的形式，整合成一个包含系统所有权限信息的对象，即：{ 模块名：{ 该模块的权限列表 }, ... }。

- 在index.ts文件中键入以下代码：

```javascript
/**
 * 权限配置模块文件，统一引入所有权限配置文件
 */
const files = import.meta.glob('./modules/*.ts');
const modules = {};
for (const path in files) {
  files[path]().then((mod) => {
    let fileNameMatch = path.match(/([^\/\\]+?)\.\w+$/);
    let fileName = fileNameMatch ? fileNameMatch[1] : null;
    modules[fileName as string] = mod?.default
  });
}

export default modules
```

- 在modules下新建所需要的模块文件，文件中的内容格式形如以下例子（权限key值:  权限标识）：

```javascript
export default {
    add: '/add-add',
    delete: '/delete-delete', 
    edit: '/edit-edit', 
}
```

2. 引入index.ts中整理好的系统预先配置的权限列表，作为我们所需要的参数permissionList，。

```javascript
import permissionList from './permission'
```

3. 通过接口获取当前用户的权限列表，作为我们所需要的参数permissions。

```javascript
import permissions from '存放服务端返回接口权限列表数据的地方'
```

> permissionList形如：
>
> ```json
> {
>     "admin": {
>         "add": "/admin-add",
>         "delete": "/admin-delete",
>         "edit": "/admin-edit"
>     },
>     "user": {
>         "add": "/user-add",
>         "delete": "/user-delete"
>     }
> }
> ```
>
> permissions形如：
>
> ```json
> [
>     "/user-add",
>     "/user-delete"
> ]
> ```

4. 在项目中的入口文件中引入 v-permission，将前面提到的两个参数作为选项，然后使用插件并传入选项：

```javascript
import { createApp } from 'vue'
import App from './views/App.vue'
import { directive } from 'sewen-ui/element-ui'
import permissionList from './permission'
import permissions from '存放服务端返回接口权限列表数据的地方'

const app = createApp(App);

app.use(directive.permission, {
    permissionList,
    permissions
})

app.mount('#app')
```

5. 在文件中使用。

- 以指令的方式使用：

  - v-permission指令形式：

    ```javascript
    <el-button v-permission="{ module: '模块名', auth: '权限key值' }"> 有权限则显示 </el-button>
    ```

  - v-if指令形式：

    ```javascript
    <el-button v-if="hasPermissions({ module: '模块名', auth: '权限key值' })"> 有权限则显示 </el-button>
    ```

- 以方法的方式使用：

  ```javascript
  import { inject } from "vue";
  
  // 注入权限判断方法 hasPermissions
  const hasPermissions = inject("hasPermissions");
  if (hasPermissions({ module: '模块名', auth: '权限key值' })) {
    console.log("用户有权限");
  } else {
    console.log("用户没有权限");
  }
  ```

  ## 贡献者

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
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
    :members="members"
  />
</VPTeamPage>