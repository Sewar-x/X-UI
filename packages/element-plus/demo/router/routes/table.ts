export default [
  {
    path: '/table-demo',
    component: () => import('../../table/table-demo.vue'),
    name: 'tableDemo'
  },
  {
    path: '/table-pagination-demo',
    component: () => import('../../table/table-pagination-demo.vue'),
    name: 'tablePaginationDemo'
  }
]
