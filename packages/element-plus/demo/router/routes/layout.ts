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
  },
  {
    path: '/layout-topaside-menu-dropdown-demo',
    component: () => import('../../layout/layout-topaside-menu-dropdown-demo.vue'),
    name: 'LayoutTopSideMenuDropdownDemo'
  },
  {
    path: '/layout-topaside-menu-dropdown-custom-demo',
    component: () => import('../../layout/layout-topaside-menu-dropdown-custom-demo.vue'),
    name: 'LayoutTopSideMenuDropdownCustomDemo'
  }
]
