export default [
  {
    path: '/dialog-demo',
    component: () => import('../../dialog/dialog-demo.vue'),
    name: 'dialogDemo'
  },
  {
    path: '/dialog-api-demo',
    component: () => import('../../dialog/dialog-api-demo.vue'),
    name: 'dialogApiDemo'
  }

]
