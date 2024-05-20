import permissions from './permission'
import { initHasPermission } from './permission'
// permissionList 系统预先配置的权限列表，permissions 用户当前权限列表(服务端返回接口权限列表数据)
const install = function (Vue, options = {
  permissionList: null,
  permissions: null
}) {
  Vue.prototype.$hasPermissions = () => initHasPermission(options)
  Vue.directive('permission', permissions)
}

permissions.install = install
export const permission = permissions
export default permission
