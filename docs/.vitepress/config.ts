import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import footer from './configs/footer'
export default defineConfig({
  title: 'XW-UI',
  description: '',
  appearance: false,
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/xw-ui-icon.svg'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/xw-ui-icon.svg',
    nav,
    sidebar,
    footer,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Sewar-x' },
    ]
  }
})
