import { defineConfig } from 'vitepress'
import { docsSite } from '../../config/site'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import footer from './configs/footer'
export default defineConfig({
  title: 'sewen-ui',
  description: 'sewen-ui 是一套基于 Vue3、Vue2、React 的 UI 组件库，主要服务于 PC 界面的中后台产品',
  appearance: false,
  base: `${docsSite}/`,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/sewen-ui-icon.svg'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/sewen-ui-icon.svg',
    nav,
    sidebar,
    footer,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sewar-x' },
    ],
    search: {
      provider: 'local'
    }
  }
})
