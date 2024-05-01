import type { permissionOptions } from "@/types/store";
import { isFunction } from "@/utils/index"

// 初始化路由
const initRoute = async (app: any, options: permissionOptions) => {
  const { publicPath, router, whiteList, asyncRoutes, basicRoutes, getAuthList, checkOaLogin, domain, Message } = options;
  const rOptions = { app, router, publicPath, asyncRoutes, basicRoutes }
  return await import("@/router").then(async (routerMethod: any) => {
    // 创建路由实例
    const routeInstance = routerMethod.setupRouter(rOptions);
    const guard = await import("@/router/guard");
    // 路由守卫
    const pOptions = { router: routeInstance, whiteList, asyncRoutes, basicRoutes, getAuthList, checkOaLogin, domain, Message }
    return guard.setupRouterGuard(pOptions);
  });
}

// 初始化 store
const initStore = async (app: any) => {
  await import("@/store").then(async (store: any) => {
    // 配置状态仓库
    await store.setupStore(app);
  });
}

async function initPermission(app: any, options: permissionOptions, callback?: Function) {
  await initStore(app);
  //各种路由相关的方法：getRoutes|getAddRoutes|getShowRouters|getAsyncRoutes|SetRoutes|SetRoute|ClearRoute|SetShowRouters
  //各种用户相关的方法：getToken|getAuthority|SetToken|SetAuthority|GetAuthority|CheckOaLogin|Logout|ClearLocal
  const params = await initRoute(app, options);
  if (callback && isFunction(callback)) {
    callback(params)
  }
}

export default initPermission;

//处理菜单名称列表
export { getRouteNames } from '@/utils/getRouteNames';
//设置key
export { default as tokenkeys, setKeys } from '@/utils/token/tokenKey';
// 设置存储方式
export { default as storageOptions, setStorage } from '@/utils/storage/setStorage'; 