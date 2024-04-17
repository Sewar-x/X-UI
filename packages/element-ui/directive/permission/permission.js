/**
 * 权限指令
 * 使用： v-permission="{module:'模块名称',auth:'权限key值'}"
 */
import store from '@/store'
import permissionList from '@/permission'

/**
 * 全局权限判断方法
 * @param {*} permission 权限对象，格式 {module:'模块名称',auth:'权限key值'}
 * @param {*} callback 权限回调函数，有权限则执行回调
 * @returns
 */
export function hasPermissions(permission, callback = null) {
  const permissions = store.getters && store.getters.permissions
  if (permission.module && permission.auth) {
    const value = permissionList[permission.module][permission.auth]
    const haspermiss = permissions.includes(value)
    haspermiss && callback && callback()
    return haspermiss
  }
  return false
}

function checkPermission(el, binding) {
  if (!hasPermissions(binding.value)) {
    el.style.display = 'none'
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
