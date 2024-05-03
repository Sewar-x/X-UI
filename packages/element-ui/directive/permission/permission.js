/**
 * 权限指令
 * 使用： v-permission="{module:'模块名称',auth:'权限key值'}"
 */


/**
 * 初始化全局权限判断方法
 * @param {*} permission 权限对象，格式 {module:'模块名称',auth:'权限key值'}
 * @param {*} callback 权限回调函数，有权限则执行回调
 * @returns
 */

export function initHasPermission(options) {
  // permissionList 系统预先配置的权限列表，permissions 用户当前权限列表(服务端返回接口权限列表数据)
  const { permissionList = null, permissions = null } = options
  return () => {
    if (!permissionList || !permissions) {
      return Error('permissionList or permissions is null')
    }
    if (permission.module && permission.auth) {
      const value = permissionList[permission.module][permission.auth]
      const haspermiss = permissions.includes(value)
      haspermiss && callback && callback()
      return haspermiss
    }
    return false
  }
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
