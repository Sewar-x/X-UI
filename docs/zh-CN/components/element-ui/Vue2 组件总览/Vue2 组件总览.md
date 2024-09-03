# XElementUI 组件总览

## 业务通用型组件

<IntroCard :lists="businesList"/>

## DSL 组件

<IntroCard :lists="dslLists"/>

## 通用组件

<IntroCard :lists="commonLists"/>



<script setup>

const dslLists = [
  {
    title: 'DSL 组件',
    tag: '1.0.0',
    link: null
  }
]

const commonLists = [
  {
    title: 'Button 按钮',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Descriptions 描述列表',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Dialog 弹窗',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Dropdown 下拉',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Form 表单',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Icon 图标',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Menu 菜单',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Popover 弹出层',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Steps 步骤条',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Swiper',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Table 表格',
    tag: '1.0.0',
    link: null
  },
  {
    title: 'Upload 上传',
    tag: '1.0.0',
    link: null
  }
]

const businesList = [

  {
    title: 'OnlyOffice',
    tag: '1.0.0',
    link:'https://sewar-x.github.io/sewen-ui/zh-CN/components/element-ui/Vue2%20业务通用组件/OnlyOffice.html'
  },
  {
    title: '任务看板',
    tag: '1.0.0',
    link:'https://sewar-x.github.io/sewen-ui/zh-CN/components/element-ui/Vue2%20业务通用组件/Vue2-任务看板.html'
  }
]
</script>
