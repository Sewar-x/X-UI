import components from './components-entry'
export const installer = (Vue) => {
  components.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}
