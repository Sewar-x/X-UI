# XElementPlus 组件总览

## DSL 组件

<IntroCard :lists="dslLists"/>

## 通用组件

<IntroCard :lists="commonLists"/>

## 业务通用型组件

<IntroCard :lists="businesList"/>

<script setup>

const dslLists = [
  {
    title: 'DSL 组件',
    tag: '1.0.0',
    link:'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Button%E6%8C%89%E9%92%AE.html'
  }
]

const commonLists = [
  {
    title: 'Button 按钮',
    tag: '1.0.0',
    link:'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Button%E6%8C%89%E9%92%AE.html'
  },
  {
    title: 'Descriptions 描述列表',
    tag: '1.0.0',
    link:'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Descriptions%E6%8F%8F%E8%BF%B0%E5%88%97%E8%A1%A8.html'
  },
  {
    title: 'Dialog 弹窗',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Dialog%E5%BC%B9%E7%AA%97.html'
  },
  {
    title: 'Dropdown 下拉',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Dropdown%E4%B8%8B%E6%8B%89.html'
  },
  {
    title: 'Form 表单',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Form%E8%A1%A8%E5%8D%95.html'
  },
  {
    title: 'Icon 图标',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Icon%E5%9B%BE%E6%A0%87.html'
  },
  {
    title: 'Menu 菜单',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Menu%E8%8F%9C%E5%8D%95.html'
  },
  {
    title: 'Popover 弹出层',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Popover%E5%BC%B9%E5%87%BA%E5%B1%82.html'
  },
  {
    title: 'Steps 步骤条',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Steps%E6%AD%A5%E9%AA%A4%E6%9D%A1.html'
  },
  {
    title: 'Swiper',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Swiper.html'
  },
  {
    title: 'Table 表格',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Table%E8%A1%A8%E6%A0%BC.html'
  },
  {
    title: 'Upload 上传',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Upload%E4%B8%8A%E4%BC%A0.html'
  }
]

const businesList = [
  {
    title: 'AdvanceSearch 高级搜索',
    tag: '1.0.0',
    link: 'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E4%B8%9A%E5%8A%A1%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/AdvanceSearch-%E9%AB%98%E7%BA%A7%E6%90%9C%E7%B4%A2.html'
  },
  {
    title: 'LayoutMenu 布局菜单栏',
    tag: '1.0.0',
    link:'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E4%B8%9A%E5%8A%A1%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/LayoutMenu-%E5%B8%83%E5%B1%80%E8%8F%9C%E5%8D%95%E6%A0%8F.html'
  },
  {
    title: '任务看板',
    tag: '1.0.0',
    link:'https://sewar-x.github.io/X-UI/zh-CN/components/element-plus/Vue3-%E4%B8%9A%E5%8A%A1%E9%80%9A%E7%94%A8%E7%BB%84%E4%BB%B6/Vue3-%E4%BB%BB%E5%8A%A1%E7%9C%8B%E6%9D%BF.html'
  }
]
</script>
