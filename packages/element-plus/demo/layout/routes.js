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