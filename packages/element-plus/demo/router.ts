import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // demo 路由配置，路由的 path 需求和 demo 组件的文件名称一致！
  routes: [
    {
      path: '/form-demo',
      component: () => import('./form/formDemo.vue'),
      name: 'FormDemo'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/form-demo'
    },
  ]
})

export default router
