export default [
  {
    path: '/search-demo',
    component: () => import('../../search/search-demo.vue'),
    name: 'searchDemo'
  },
  {
    path: '/search-input-demo',
    component: () => import('../../search/search-input-demo.vue'),
    name: 'searchInputDemo'
  },
  {
    path: '/search-cascade-demo',
    component: () => import('../../search/search-cascade-demo.vue'),
    name: 'searchCascadeDemo'
  }
]
