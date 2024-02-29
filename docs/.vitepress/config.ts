import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import footer from './configs/footer'
import { mdPlugin } from './configs/plugins'

const base = '/'

export default defineConfig({
  title: 'x-ui-design',
  description: '',
  appearance: false,
  base,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/x-ui-icon.svg'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/x-ui-icon.svg',
    nav,
    sidebar,
    footer
  }
})
