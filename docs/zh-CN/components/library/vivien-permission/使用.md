# permission 插件

## 介绍

vivien-permission 插件是一个基于后台管理系统中的路由菜单权限控制系统，通过 vue-router 全局控制后台管理系统的菜单权限。



## 功能

| 功能             | 介绍                                                     |
| ---------------- | -------------------------------------------------------- |
| 菜单路由权限控制 | 通过接口返回权限路由名称，控制当前登录用户的路由权限     |
| 按钮级别权限控制 | 通过接口返回按钮权限列表名称，控制当前登录用户的按钮权限 |
| 单点登录         | 使用当前插件的系统和其他系统相互登录                     |



## 安装

### 1. 安装相关依赖

> 该控制系统使用 vue-router 全局控制路由菜单权限，使用 js-cookie 作为 token 存储，依赖 pinia 存储用户菜单权限。

- js-cookie

```bash
# npm
npm install js-cookie
```

```bash
# yarn
yarn install js-cookie
```

```bash
# pnpm
pnpm install js-cookie
```

- pinia

```bash
# npm
npm install pinia
```

```bash
# npm
npm install pinia
```

```bash
# pnpm
pnpm install pinia
```

- vue-router

```bash
# npm
npm install vue-router@4
```

```bash
# yarn
yarn install vue-router@4
```

```bash
# pnpm
pnpm install vue-router@4
```

### 2. 安装插件

```bash
# npm
npm install vivien-permission
```

```bash
# yarn
yarn install vivien-permission
```

```bash
# pnpm
pnpm install vivien-permission
```



## 使用插件

### 引入vivien-perimission

在你的项目中直接引入 XW-UI 的 vivien-perimission 插件

```js
// 引入插件初始化方法
import bootstrap from "vivien-permission"

// 初始化插件
await bootstrap(app, options, callback)
```

> 注意：该插件依赖 vue-router 和 pina，因此在初始化插件之前需要你预先初始化 vue-router 和 pinia，你也可以将 vue-router 是实例 router 对象传入插件中的 `options.router` 参数中，在插件中进行初始化路由和 pinia;
>
> 如果你没有预先创建 pinia 的实例，插件内部会预先创建。



下面是一个例子，展示了最简单的用法

```javascript
import { createApp } from 'vue'
import App from './views/App.vue'
import { createPinia } from 'pinia'
import bootstrap from "vivien-permission"
import { whiteList, asyncRoutes, basicRoutes } from "这是你的接口路由配置"
import { getAuthList, checkOaLogin } from "这是你的接口"
import router from '这是你的router实例';  
import ElMessage from '这是你的消息提示';  

const app = createApp(App);
const pinia = createPinia()

app.use(router)
.use(pinia)

const domain = '.example.com' // 你的系统域名
const publicPath = import.meta.env.VITE_PUBLIC_PATH // 系统 publicPath 目录
//定义一个符合 permissionOptions 接口的对象 
const options = {
  publicPath, // 系统 publicPath 目录
  router,  // 路由对象（可选）
  whiteList, // 路由白名单
  asyncRoutes, // 异步路由
  basicRoutes, // 基础路由
  getAuthList, // 获取用户权限列表
  checkOaLogin, // 检查oa登录状态
  domain, // oa 域名
  ElMessage // 消息提示
}

await bootstrap(app, options, (params)=> {
    console.log(params)
})

app.mount('#app')

```



## 配置

### `bootstrap(app, options, callback)`

| 参数     | 介绍                                        |
| -------- | ------------------------------------------- |
| app      | vue3 实例，通过 `createApp(App)` 创建的实例 |
| options  | 对象类型，初始化参数值                      |
| callback | 初始化回调方法，回调参数中返回路由相关方法  |



#### **options 参数**

**类型：**

```typescript
interface PermissionGuardOptions {
    router: Router,  // 路由对象
    whiteList: string[], // 白名单
    asyncRoutes: AppRouteModule[], // 异步路由
    basicRoutes: AppRouteModule[], // 基础路由
    getAuthList: Function, // 获取用户权限列表
    checkOaLogin: Function, //  使用 oa token 换取当前系统的 token, 登录系统
    domain: string, // oa 域名
    Message: Function // 消息提示组件
}

type AppRouteRecordRaw = RouteRecordRaw & {
  path: string; //路由路径
  name?: string; //路由名称
  order?: number | null | undefined; //路由排序
  component?: Component | string; //视图组件
  hidden?: boolean; //是否在菜单显示
  redirect?: string; //重定向路径
  children?: AppRouteRecordRaw[]; //子菜单
  meta?: RouteMeta //路由元信息
};
```

| 参数         | 介绍                                                    | 类型                                                |
| ------------ | ------------------------------------------------------- | --------------------------------------------------- |
| router       | vue-router 实例对象                                     | `Router`                                            |
| whiteList    | 路由白名单                                              | `Array<RouteName>` 数组<br />数组内每一项为路由名称 |
| asyncRoutes  | 异步加载的路由列表                                      | `AppRouteModule[]` 数组<br />数组内每一项为路由对象 |
| basicRoutes  | 基础路由，非异步加载的路由                              | `AppRouteModule[]` 数组<br />数组内每一项为路由对象 |
| getAuthList  | 获取权限列表异步方法(接口)                              | `Function`                                          |
| checkOaLogin | 方法，使用 oa token 换取当前系统的 token 接口, 登录系统 | `Function`                                          |
| domain       | oa 域名                                                 | `String`                                            |
| Message      | 消息提示组件                                            | `Function`                                          |

#### **getAuthList 接口**

传入用户的 token，返回用户的菜单权限列表和按钮权限列表。

```javascript
getAuthList({
    token: '' // 当前用户 token
})
```

* 参数:
  * 类型： 对象
  * 参数值：
    * token: 当前登录系统的用户 token

* 返回值：

  * 类型：对象

  * 返回值：

    * ```json
      {
          menuNames: [], // 菜单权限名称列表
      	rule: [],// 按钮级别权限
      }
      ```

      * menuNames: 菜单权限列表，数组中每一项为路由名称。
      * rule： 按钮级别权限列表，数组中每一项为按钮权限标识字符串。



#### **checkOaLogin 接口**

传入其他系统的 token，返回当前系统的 token，用于 其他系统 和 使用当前插件系统的 单点登录。 

```javascript
checkOaLogin({
     ticketName: key,
     ticketValue: oaToken
})
```

* 参数:
  * 类型： 对象。
  * 参数值：
    * ticketName: 其他系统的存储用户 token 的 key 值；
    * ticketValue: 其他系统的存储用户的 token ；

* 返回值：

  * 类型：对象。

  * 返回值：

    * ```json
      {
          token: '' //当前系统的 token 值
      }
      ```

      * token: 当前系统的 token 值。



#### callback 回调函数

初始化方法 `bootstrap(app, options, callback)` 第三个参数 callback 为回调函数，该回调函数的参数接收用于获取和控制权限相关的方法。

```javascript
 bootstrap(app, options, ({
    getRoutes,
    getAddRoutes,
    getShowRouters,
    SetRoutes,
    SetRoute,
    ClearRoute,
    SetShowRouters,
    GenerateRoutes,
    getToken,
    getAuthority,
    SetToken,
    SetAuthority,
    GetAuthority,
    CheckOaLogin,
    Logout,
    ClearLocal
 })=> {
})
```

**回调参数说明：**

| 方法           | 说明                         | 参数                                                         | 返回值                   |
| -------------- | ---------------------------- | ------------------------------------------------------------ | ------------------------ |
| getRoutes      | 获取所有路由表               |                                                              | 所有路由表               |
| getAddRoutes   | 获取所有异步路由表           |                                                              | 所有异步路由表           |
| getShowRouters | 获取二级菜单展示路由的路由表 |                                                              | 二级菜单展示路由的路由表 |
| SetRoutes      | 设置所有路由                 | `(asyncFilterRoutes: Array<T>, constantAsyncRoutes: Array<T>) `<br />asyncFilterRoutes 异步(权限)路由表<br />constantAsyncRoutes 常规路由表 |                          |
| SetRoute       | 设置所有路由                 | `(routes: Array<RouteItem>)`<br />routes 所有路由表          |                          |
| ClearRoute     | 清空路由数据                 |                                                              |                          |
| SetShowRouters | 设置二级菜单路由             | `(routes: RouteItem)`<br />routes:二级菜单显示的路由         | 二级菜单显示的路由       |
| GenerateRoutes | 生成异步路由表               | `(routesMenuNames: Array<RouteItem>, asyncRoutes: AppRouteModule[], basicRoutes: AppRouteModule[])`<br />routesMenuNames: 异步路由列表路由名称数组<br />asyncRoutes：异步路由表<br />basicRoutes：常规路由表 | 异步路由表               |
| getToken       | 获取用户 token               |                                                              | 用户 token               |
| getAuthority   | 获取用户权限列表             |                                                              | 用户权限列表             |
| SetToken       | 设置用户 token               | `{token: '用户token', oa: {ticketName:'其他系统token key', ticketValue:'其他系统 token 值' }}` |                          |
| SetAuthority   | 设置用户权限列表             | `{authority: []}`                                            |                          |
| GetAuthority   | 获取用户权限列表             | `(getAuthList: Function, domain: string)`<br />getAuthList: 获取用户权限列表接口<br />domain： 系统域名 | 用户权限列表             |
| CheckOaLogin   | 使用其他系统 token 登录系统  | `(checkOaLogin: Function, domain: string)`<br />checkOaLogin: 用其他系统 token 换取当前系统的接口<br />domain: 当前系统域名 |                          |
| Logout         | 退出当前系统                 | `(domain: string, logout?: Function)`<br />domain: 当前系统域名<br />logout： 退出系统接口 |                          |
| ClearLocal     | 清空存储数据                 | `{domain: 当前系统域名}`                                     |                          |

