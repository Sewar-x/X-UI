export default [
  {
    path: '/basecomponent-basics-use-demo',
    component: () => import('../../basecomponent/basecomponent-basics-use-demo.vue'),
    name: 'basecomponenBasicsUseDemo',
  },
  {
    path: '/basecomponent-element-use-demo',
    component: () => import('../../basecomponent/basecomponent-element-use-demo.vue'),
    name: '/basecomponenElementUseDemo',
  }
  ,
  {
    path: '/basecomponent-user-define-demo',
    component: () => import('../../basecomponent/basecomponent-user-define-demo.vue'),
    name: 'basecomponenUserDefineUseDemo',
  }
]
