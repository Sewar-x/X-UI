export default [
  {
    path: '/layout-top-menu-demo',
    component: () => import('../../layout/layout-top-menu-demo.vue'),
    name: 'LayoutTopMenuDemo'
  },
  {
    path: '/layout-side-menu-demo',
    component: () => import('../../layout/layout-side-menu-demo.vue'),
    name: 'LayoutSideMenuDemo'
  },
  {
    path: '/layout-topaside-menu-demo',
    component: () => import('../../layout/layout-topaside-menu-demo.vue'),
    name: 'LayoutTopSideMenuDemo'
  }
]
