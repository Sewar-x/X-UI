import { createRouter, createWebHashHistory } from 'vue-router'
// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager("./routes/**.ts") as any; // vite 2.9.18 版本时需要换成这个
// const modules = import.meta.glob("./routes/**.ts", {eager: true}) as any;  // Vite 5.33 版本时需要换成这个
let routeModuleList: Array<any> = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  if (Array.isArray(mod)) {
    routeModuleList = [...mod, ...routeModuleList]
  } else {
    routeModuleList.push(mod)
  }
});

const routes = [
  ...routeModuleList,
  {
    path: '/:pathMatch(.*)*',
    redirect: ''
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  // demo 路由配置，路由的 path 需求和 demo 组件的文件名称一致！
  routes
})

export default router
