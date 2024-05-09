/**
* 权限指令
* 使用： v-permission="{module:'模块名称',auth:'权限key值'}"
* const hasPermi = hasPermissions({ module: 'someModule', auth: 'someAuth' });
*/

/**  
  * 初始化全局权限判断方法  
  * permissionList 系统预先配置的权限列表，包含所有权限信息
  * permissions 用户当前权限列表(服务端返回接口权限列表数据) 
 */
export function initHasPermission(options: {
  permissionList: Array<string> | null,
  permissions: Array<string> | null
}
) {
  const { permissionList = null, permissions = null } = options;
  // 返回一个函数，该函数接收一个权限对象并返回是否有权限    
  return (permission: {
    module: string,
    auth: string,
  }) => {
    if (!permissionList || !permissions) {
      throw new Error('permissionList or permissions is null');
    }
    if (permission.module && permission.auth) {
      const value = permissionList[permission.module][permission.auth];
      return permissions.includes(value);
    }
    return false;
  };
}

// 检查权限并执行相应的操作  
function checkPermission(el: any, binding: any, hasPermissions: Function) {
  if (typeof binding.value === 'object' && binding.value.module && binding.value.auth) {
    if (!hasPermissions(binding.value)) {
      el.style.display = 'none';
    } else {
      el.style.display = ''; // 如果有权限，确保元素可见  
    }
  }
}

// 权限指令  
// 创建一个返回指令对象的函数，该函数接受 hasPermissions 函数作为参数  
export default function createPermissionDirective(hasPermissions: Function) {
  return {
    mounted(el: any, binding: any) {
      checkPermission(el, binding, hasPermissions);
    },
    updated(el: any, binding: any) {
      checkPermission(el, binding, hasPermissions);
    }
  };
}




