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
  },
  {
    path: '/table-search-demo',
    component: () => import('../../table/table-search-demo.vue'),
    name: 'tableSearchDemo'
  },
  {
    path: '/table-search-col-filter-demo',
    component: () => import('../../table/table-search-col-filter-demo.vue'),
    name: 'tableSearchColFilterDemo'
  },
  {
    path: '/table-slot-demo',
    component: () => import('../../table/table-slot-demo.vue'),
    name: 'tableSlotClickShowDemo'
  },
  {
    path: '/table-search-link-demo',
    component: () => import('../../table/table-search-link-demo.vue'),
    name: 'tableSearchLinkDemo'
  }
 
]
