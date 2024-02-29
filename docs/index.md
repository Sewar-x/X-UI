---
layout: home

hero:
  name: XW-UI
  text: JSON 配置化组件库
  tagline: 基于 ElementUI、ElementPlus、AntDesign 组件库二次封装，JSON 配置化快速开发中后台组件库
  image:
    src: /images/xw-ui-icon.svg
  actions:
    - theme: brand
      text:  Vue3
      link: /zh-CN/guide/elp-install
    - theme: brand
      text:  Vue2
      link: /zh-CN/guide/elu-install
    - theme: brand
      text:  React
      link: /zh-CN/guide/antd-install
    - theme: alt
      text:  Gitee
      link: https://gitee.com/jokerxw/x-component-library

features:
  - icon: ⚡️
    title: 便捷
    details: 开箱即用，所有组件支持全量引入和按需引入。
  - icon: 🤟
    title: 易用
    details: 通过 JSON 配置化快速开发，保持组件的原始用法，扩展、沉淀常用基础功能。
  - icon: 💻
    title: 业务
    details: 更贴近业务场景，解决常规业务需求，开发提效。
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/28383640?v=4',
    name: 'Sewen',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/Sewar-x' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/95331757?v=4',
    name: 'Vivien',
    title: 'Staff Frontend Engineer',
    links: [
      { icon: 'github', link: 'https://github.com/yoguoer' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      团队成员
    </template>
    <template #lead>
      核心团队成员是那些积极参与维护一个或多个核心项目的人。他们对 XW-UI 组件做出了重大贡献，并对项目及其用户的成功做出了长期的承诺。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>