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
  }
]
