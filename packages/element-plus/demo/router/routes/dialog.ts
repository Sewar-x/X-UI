export default [
  {
    path: '/dialog-demo',
    component: () => import('../../dialog/dialog-demo.vue'),
    name: 'dialogDemo'
  },
  {
    path: '/dialog-api-demo',
    component: () => import('../../dialog/dialog-api-demo.vue'),
    name: 'dialogApiDemo'
  },
  {
    path: '/dialog-table-demo',
    component: () => import('../../dialog/dialog-table-demo.vue'),
    name: 'dialogTableDemo'
  },
  {
    path: '/dialog-component-demo',
    component: () => import('../../dialog/dialog-component-demo.vue'),
    name: 'dialogComponentDemo'
  },
  {
    path: '/dialog-table-form-demo',
    component: () => import('../../dialog/dialog-table-form-demo.vue'),
    name: 'dialogTableFormDemo'
  },
  {
    path: '/dialog-dynamic-form-demo',
    component: () => import('../../dialog/dialog-dynamic-form-demo.vue'),
    name: 'dialogDynamicFormDemo'
  },
  {
    path: '/dialog-api-button-demo',
    component: () => import('../../dialog/dialog-api-button-demo.vue'),
    name: 'dialogApiButtonDemo'
  },
  {
    path: '/dialog-component-button-demo',
    component: () => import('../../dialog/dialog-component-button-demo.vue'),
    name: 'dialogComponentButtonDemo'
  },
  {
    path: '/dialog-def-button-demo',
    component: () => import('../../dialog/dialog-def-button-demo.vue'),
    name: 'dialogDefButtonDemo'
  }
]
