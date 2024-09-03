---
title: sewen-ui
titleTemplate: Vue2 & Vue3 & React JSON Scheme (DSL) Component Library
description: Vue2 & Vue3 & React JSON Scheme (DSL) Component Library
head:
  - - meta
    - name: description
      content: sewen-ui is Vue2 & Vue3 & React JSON Scheme configer Component Library
  - - meta
    - name: keywords
      content: sewen-ui Vue2 Vue3 React Component Library

      
layout: home

hero:
  name: sewen-ui
  text: JSON Scheme (DSL) 组件库
  tagline: 基于 ElementUI、ElementPlus、AntDesign 组件库二次封装，JSON 配置化快速开发中后台组件库
  image:
    src: /images/xw-ui-icon.svg
  actions:
    - theme: brand
      text:  Vue2
      link: /zh-CN/guide/elu-install
    - theme: brand
      text:  Vue3
      link: /zh-CN/guide/elp-install
    - theme: brand
      text:  React
      link: /zh-CN/guide/antd-install
    - theme: alt
      text:  GitHub
      link:  https://github.com/Sewar-xsewen-ui/

features:
  - icon:    ⚡️
    title:   灵活易用
    details: 开箱即用，所有组件支持全量引入和按需引入。
  - icon:    💡
    title:   组件丰富
    details: 通过 JSON Scheme（DSL） 配置化快速开发，保持组件的原始用法基础上，扩展 JSON Scheme（DSL）配置模式，更加灵活便捷。
  - icon:    🗃️
    title:   业务沉淀
    details: 沉淀的业务组件，更贴近业务场景，解决常规业务需求，开发提效。
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
      核心团队成员是那些积极参与维护组件核心项目的人。他们对 sewen-ui 组件做出了贡献。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>