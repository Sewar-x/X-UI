import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
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
      path: '/task-board',
      component: () => import('./task-board/task-use-demo.vue'),
      name: 'TaskBoard'
    },
    {
      path: '/task-board-advance',
      component: () => import('./task-board/task-advance-demo.vue'),
      name: 'TaskBoardAdvance'
    },
    {
      path: '/tinymc',
      component: () => import('./tinymc/tinymc-demo.vue'),
      name: 'Tinymc'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/task-board-advance'
    },
  ]
})

export default router
