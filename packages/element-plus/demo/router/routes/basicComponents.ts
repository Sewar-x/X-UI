export default {
  path: '/basecomponent',
  name: 'basecomponenDemo',
  redirect: "/basecomponent/basics-use-demo",
  children: [
    {
      path: 'basics-use-demo',
      component: () => import('../../baseComponents/basics-use-demo.vue'),
      name: 'basecomponenBasicsUseDemo',
    },
    {
      path: 'element-use-demo',
      component: () => import('../../baseComponents/element-use-demo.vue'),
      name: 'basecomponenElementUseDemo',
    }
    ,
    {
      path: 'user-define-demo',
      component: () => import('../../baseComponents/user-define-demo.vue'),
      name: 'basecomponenUserDefineUseDemo',
    }
  ]
}

