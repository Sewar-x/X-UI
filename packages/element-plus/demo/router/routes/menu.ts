export default [
  {
    path: '/menu-demo',
    component: () => import('../../menu/menu-demo.vue'),
    name: 'MenuDemo'
  },
  {
    path: '/menu-horizontal-demo',
    component: () => import('../../menu/menu-horizontal-demo.vue'),
    name: 'MenuHorizontalDemo'
  }


]
