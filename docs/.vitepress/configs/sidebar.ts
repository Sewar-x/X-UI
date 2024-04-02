import elementPlusSideBar from "../pages/element-plus.json" // elementPlus 侧边栏配置
import elementUiSideBar from "../pages/element-ui.json" // elementUI 侧边栏配置
import antDesignSideBar from "../pages/ant-design.json" // antDesign 侧边栏配置

export default {
  '/zh-CN/guide/': [
     // 指南侧边栏
    {
      text: '快速开始',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: 'Element', link: '/zh-CN/guide/elu-install' },
        { text: 'ElementPlus', link: '/zh-CN/guide/elp-install' },
        { text: 'AntDesign', link: '/zh-CN/guide/antd-install' }
      ]
    },
    {
      text: '开发者指南',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: '开发规范', link: '/zh-CN/guide/standar-guide' },
        { text: '文档开发', link: '/zh-CN/guide/docs-dev' },
        { text: 'ElementPlus', link: '/zh-CN/guide/elp-dev' },
        { text: 'ElementUI', link: '/zh-CN/guide/elu-dev' },
        { text: 'AntDesign', link: '/zh-CN/guide/ant-dev' }
      ]
    },
    {
      text: '测试部署指南',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: '组件测试指南', link: '/zh-CN/guide/test-guide' },
        { text: '构建部署指南', link: '/zh-CN/guide/deploy-guide' }
      ]
    },
    {
      text: '其他',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: '开发常见问题', link: '/zh-CN/guide/dev-fqa' },
        { text: '更新日志', link: '/zh-CN/guide/changelog' }
      ]
    }
  ],
  '/zh-CN/components/element-plus': elementPlusSideBar, // elementPlus 侧边栏配置
  '/zh-CN/components/element-ui': elementUiSideBar,// elementUI 侧边栏配置
  '/zh-CN/components/ant-design': antDesignSideBar// antDesign 侧边栏配置
}
