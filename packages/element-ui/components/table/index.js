import Table from './table.vue'

Table.install = function (Vue) {
  Vue.component(Table.name, Table)
}

export const XTable = Table

export default XTable

export * from './'
