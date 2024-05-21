export default [
  {
    path: '/descriptions-demo',
    component: () => import('../../descriptions/descriptions-demo.vue'),
    name: 'descriptionsDemo'
  },
  {
    path: '/descriptions-slot-demo',
    component: () => import('../../descriptions/descriptions-slot-demo.vue'),
    name: 'descriptionsSlotDemo'
  },
  {
    path: '/descriptions-component-demo',
    component: () => import('../../descriptions/descriptions-component-demo.vue'),
    name: 'descriptionsComponentDemo'
  },
  {
    path: '/descriptions-dynamic-component-demo',
    component: () => import('../../descriptions/descriptions-dynamic-component-demo.vue'),
    name: 'descriptionsDynamicComponentDemo'
  }
]
