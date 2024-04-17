import permission from './permission'
import { hasPermissions } from './permission'

const install = function(Vue) {
  Vue.prototype.$hasPermissions = hasPermissions
  Vue.directive('permission', permission)
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
