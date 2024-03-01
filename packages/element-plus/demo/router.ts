import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // demo 路由配置，路由的 path 需求和 demo 组件的文件名称一致！
  routes: [
    {
      path: '/table-custom-columns',
      component: () => import('./table/table-custom-columns.vue'),
      name: 'TableCustomColumns'
    },
    {
      path: '/data-picker-shortcuts',
      component: () => import('./data-picker/data-picker-shortcuts.vue'),
      name: 'DataPickerShortcuts'
    },
    {
      path: '/menu-voice-cloud',
      component: () => import('./menu/menu-voice-cloud.vue'),
      name: 'MenuVoiceCloud'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/table-custom-columns'
    },
  ]
})

export default router
