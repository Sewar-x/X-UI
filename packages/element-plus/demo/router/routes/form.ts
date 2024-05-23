export default [
  {
    path: '/form-demo',
    component: () => import('../../form/form-demo.vue'),
    name: 'formDemo'
  },
  {
    path: '/form-tailwind-demo',
    component: () => import('../../form/form-tailwind-demo.vue'),
    name: 'formTailwindDemo'
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
  },
  {
    path: '/form-cross-cascade-demo',
    component: () => import('../../form/form-cross-cascade-demo.vue'),
    name: 'formCrossCascadeDemo'
  }

]
