import createPermissionDirective from './permission';
import { initHasPermission } from './permission'

// Vue 3 插件定义   
const install = function (app: any, options: {
  permissionList: Array<string> | null,
  permissions: Array<string> | null
} = {
    /** permissionList 系统预先配置的权限列表，包含所有权限信息
    *   permissions 用户当前权限列表(服务端返回接口权限列表数据) 
    */
    permissionList: null,
    permissions: null
  }) {

  // 初始化权限检查函数 
  const hasPermissions = initHasPermission(options);
  // 添加全局方法 $hasPermissions  
  app.config.globalProperties.$hasPermissions = hasPermissions;


  // 提供全局的权限检查对象 
  app.provide('hasPermissions', app.config.globalProperties.$hasPermissions);

  // 使用 hasPermissions 函数创建指令对象  
  const permissionDirective = createPermissionDirective(hasPermissions);
  // 注册全局指令 v-permission  
  app.directive('permission', permissionDirective);

}

// 导出插件对象  
export default {
  install
};