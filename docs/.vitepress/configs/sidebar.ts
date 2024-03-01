import elementPlusSideBar from "../pages/element-plus.json" // elementPlus 侧边栏配置
import elementUiSideBar from "../pages/element-ui.json" // elementUI 侧边栏配置
import antDesignSideBar from "../pages/ant-design.json" // antDesign 侧边栏配置

export default {
  '/zh-CN/guide/': [ // 指南侧边栏
    {
      text: '快速开始',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: 'xw-element-plus', link: '/zh-CN/guide/elp-install' },
        { text: 'xw-element-ui', link: '/zh-CN/guide/elu-install' },
        { text: 'xw-ant-design', link: '/zh-CN/guide/antd-install' },
      ]
    },
    {
      text: '开发者指南',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: 'docs项目', link: '/zh-CN/guide/docs-dev' },
        { text: 'element-plus', link: '/zh-CN/guide/elp-dev' },
        { text: 'element-ui', link: '/zh-CN/guide/elu-dev' },
      ]
    }
  ],
  '/zh-CN/components/element-plus': elementPlusSideBar, // elementPlus 侧边栏配置
  '/zh-CN/components/element-ui': elementUiSideBar,// elementUI 侧边栏配置
  '/zh-CN/components/ant-design': antDesignSideBar// antDesign 侧边栏配置
}
