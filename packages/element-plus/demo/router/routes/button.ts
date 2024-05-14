export default [
  {
    path: '/button-demo',
    component: () => import('../../button/button-demo.vue'),
    name: 'buttonDemo'
  },
  {
    path: '/button-group-demo',
    component: () => import('../../button/button-group-demo.vue'),
    name: 'buttonGroupDemo'
  }
]
