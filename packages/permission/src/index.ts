import type { permissionOptionsType } from "@/types/store";
import { isFunction } from "@/utils/index"
import globalState from '@/utils/GlobalState';
import exportFunctions from '@/router/guard/exportFunctions';

// 初始化路由
const initRoute = async (app: any, options: permissionOptionsType) => {
  const { publicPath, router, asyncRoutes, basicRoutes, Message } = options;
  return await import("@/router").then(async (routerMethod: any) => {
    // 创建路由实例
    const routeInstance = routerMethod.setupRouter({ app, router, publicPath, asyncRoutes, basicRoutes });
    const guard = await import("@/router/guard");
    await guard.setupRouterGuard({ router: routeInstance, Message });
    return routeInstance
  });
}

// 初始化 store
const initStore = async (app: any) => {
  return await import("@/store").then(async (store: any) => {
    // 配置状态仓库
    await store.setupStore(app);
    return store
  });
}

async function initPermission(app: any, options: permissionOptionsType, callback?: Function) {
  // 全局存储所有初始化参数
  globalState.setAllState(options)
  await initStore(app);
  //各种路由相关的方法：getRoutes|getAddRoutes|getShowRouters|getAsyncRoutes|SetRoutes|SetRoute|ClearRoute|SetShowRouters
  //各种用户相关的方法：getToken|getAuthority|SetToken|SetAuthority|GetAuthority|checkSSOLogin|Logout|ClearLocal
  await initRoute(app, options);
  if (callback && isFunction(callback)) {
    callback(exportFunctions)
  }
}

export default initPermission;

//处理菜单名称列表
export { getRouteNames } from '@/utils/index';
//设置key
export { setKeys } from '@/utils/token/tokenKey';
// 设置存储方式
export { setStorage } from '@/utils/storage/setStorage';
// 监听用户刷新动作的方法
export { reloadHacker } from '@/router/guard/permissionGuard'
// 设置存储方式
export { globalState }
