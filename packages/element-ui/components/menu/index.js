import Menu from './menu.vue'

Menu.install = function (Vue) {
  Vue.component(Menu.name, Menu)
}

export const XMenu = Menu

export default XMenu

export * from './'
