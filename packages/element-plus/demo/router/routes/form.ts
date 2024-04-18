export default [
  {
    path: '/form-demo',
    component: () => import('../../form/form-demo.vue'),
    name: 'formDemo'
  },
  {
    path: '/form-slot-demo',
    component: () => import('../../form/form-slot-demo.vue'),
    name: 'formSlotDemo'
  },
  {
    path: '/form-cascade-demo',
    component: () => import('../../form/form-cascade-demo.vue'),
    name: 'formCascadeDemo'
  },
  {
    path: '/form-link-demo',
    component: () => import('../../form/form-link-demo.vue'),
    name: 'formLinkDemo'
  }
]
