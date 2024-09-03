# LayoutMenu 布局菜单栏

布局菜单栏是根据后台管理系统的菜单栏布局进行二次封装的组件，内部集成了菜单栏和路由

内部默认与 `vue-router` 绑定，使用路由对象渲染菜单

## 功能

* 根据传入的路由对象，自动生成菜单栏
* 点击菜单自动跳转路由

可以结合 [sewen-ui/permission](https://sewar-x.github.io/sewen-ui/zh-CN/components/library/vivien-permission/%E4%BD%BF%E7%94%A8.html)  插件，自动根据用户权限生成对应的菜单

## 布局

提供三种布局显示：

* 横向菜单栏
* 侧边菜单栏
* 顶部和侧边菜单栏

## 文件说明

- 组件地址：`/element-plus/components/Layout/src/LayoutMenu.vue`
- 组件类型：`components/Layout/types.ts`

::: details 组件类型

```typescript
interface LayoutType {
  layoutMode: 'top' | 'aside' | 'topAside' | 'none'
}

interface SideMenuType {
    type?: 'side' | 'top',
    routeInst?: any,
    routes?: Array<any>,
    asyncRoutes?: Array<any>,
    asyncSideRoutes?: Array<any>,
    layoutMode?: string,
    defaultActive?: string,
    defaultSideActive?: string,
    isShowLogout?: boolean; // 是否显示退出按钮
    isShowFooter?: boolean; // 是否显示footer
}

```
:::



## 参数

仅接收一个 options 参数，该参数为对象，包含以下属性：

| 属性              | 描述                                 | 类型                         | 默认值 |
| ----------------- | ------------------------------------ | ---------------------------- | ------ |
| routes            | 所有路由对象，根据路由对象渲染菜单栏 | object                       |        |
| routeInst         | `vue-router`  实例                   |                              |        |
| layoutMode        | 布局模式                             | `top、aside、topAside、none` | top    |
| defaultActive     | 默认激活的横向菜单，使用路由名称     | String                       |        |
| defaultSideActive | 默认激活的侧边栏菜单，使用路由名称   | String                       |        |
| asyncRoutes       | 异步路由对象                         | `Array<any>`                 | `[]`   |
| asyncSideRoutes   | 侧边栏异步路由                       | `Array<any>`                 |        |
| isShowLogout      | 是否显示退出按钮                     | boolean                      |        |
| isShowFooter      | 是否显示footer                       | boolean                      |        |

路由对象示例:

::: details 组件类型

```javascript
export default [
  {
    path: "/",
    name: "Root",
    redirect: "/login",
    meta: {
      title: "首页",
    },
    hidden: true,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    hidden: true,
  },
  {
    path: "/auth-menus",
    name: "authMenus",
    order: 1,
    hidden: false,
    redirect: "/auth-menus/authMenu1",
    meta: {
      title: "权限菜单",
      hideBreadcrumb: false,
      icon: {
        name: "Document",
        __name: "document",
      },
    },
    children: [
      {
        path: "/authMenu1",
        name: "authMenu1",
        hidden: false,
        meta: {
          title: "权限菜单1",
          icon: {
            name: "Location",
            __name: "location",
          },
        },
      },
      {
        path: "/authMenu2",
        name: "authMenu2",
        hidden: false,
        meta: {
          title: "权限菜单2",
          icon: {
            name: "Location",
            __name: "location",
          },
        },
      },
    ],
  },
  {
    path: "/async-menus",
    name: "asyncMenus",
    order: 2,
    hidden: false,
    redirect: "/async-menus/asyncMenu1",
    meta: {
      title: "异步菜单",
      hideBreadcrumb: false,
      icon: {
        name: "Document",
        __name: "document",
      },
    },
    children: [
      {
        path: "/asyncMenu1",
        name: "asyncMenu1",
        hidden: false,
        meta: {
          title: "异步菜单1",
          icon: {
            name: "Setting",
            __name: "setting",
          },
        },
      },
      {
        path: "/asyncMenu2",
        name: "asyncMenu2",
        hidden: false,
        meta: {
          title: "异步菜单2",
          icon: {
            name: "Setting",
            __name: "setting",
          },
        },
      },
      {
        path: "/asyncMenu3",
        name: "asyncMenu3",
        hidden: false,
        meta: {
          title: "异步菜单3",
          icon: {
            name: "Setting",
            __name: "setting",
          },
        },
      },
    ],
  },
]

```
:::





## 插槽

| 插槽           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| viewer         | 路由显示布局部分插槽，默认为`vue-router` 的  `<router-view>` 组件 |
| sideHeader     | 侧边栏菜单顶部插槽，仅在 layoutMode = 'aside' 时生效         |
| sideFooter     | 侧边栏菜单底部插槽，仅在 layoutMode = 'aside' 时生效         |
| topHeader      | 横向栏菜单顶部插槽，仅在 layoutMode = 'top' 时生效           |
| topFooterLeft  | 横向栏菜单底部插槽，仅在 layoutMode = 'top' 时生效，在”退出“前面 |
| topFooterRight | 横向栏菜单底部插槽，仅在 layoutMode = 'top' 时生效，在”退出“后面 |
| avatarFilled   | 更换横向菜单右侧的头像填充内容                               |
| dropdownMenu   | 更换横向菜单右侧的头像下拉菜单                               |

## 示例

### 横向菜单栏
传入 `options.layoutMode` 参数为 top， 显示为横向菜单栏

<xw-demo
    demo-height="200px"
    source-code="element-plus:::layout/layout-top-menu-demo"
/>

### 侧边菜单栏
传入 `options.layoutMode` 参数为 aside 显示为横向菜单栏

<xw-demo
    demo-height="500px"
    source-code="element-plus:::layout/layout-side-menu-demo"
/>


### 侧边和横向菜单栏
传入 `options.layoutMode` 参数为 topAside 显示为横向菜单栏

<xw-demo
    demo-height="500px"
    source-code="element-plus:::layout/layout-topaside-menu-demo"
/>

### 使用默认横向菜单右侧下拉菜单

<xw-demo
    demo-height="500px"
    source-code="element-plus:::layout/layout-topaside-menu-dropdown-demo"
/>

### 使用自定义横向菜单右侧下拉菜单

<xw-demo
    demo-height="500px"
    source-code="element-plus:::layout/layout-topaside-menu-dropdown-custom-demo"
/>