import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from "vue-router";
import type { AppRouteModule } from "../types/router";
import type { SetupRouterOptions } from "../types/store";
import type { App } from "vue";
import globalState from '@/utils/GlobalState';

// 创建一个可以被 Vue 应用程序使用的路由实例
export function toCreateRouter(
  publicPath: string, // 历史记录路径
  asyncRoutes: AppRouteModule[], // 异步路由
  basicRoutes: AppRouteModule[] // 基础路由
) {
  return createRouter({
    // 创建一个 hash 历史记录。
    history: globalState.getState('routerMode') === 'hash' ? createWebHashHistory(publicPath) : createWebHistory(publicPath),
    // 应该添加到路由的初始路由列表。
    routes: [...asyncRoutes, ...basicRoutes] as unknown as RouteRecordRaw[],
  });
}


function hasRouteraBeenSetup(app: App<Element>): boolean {
  return app.config.globalProperties.$router !== undefined; //已经创建为true，未创建为false
}

// config router
// 配置路由器
export function setupRouter(Options: SetupRouterOptions) {
  const { app, router, publicPath, asyncRoutes, basicRoutes } = Options;
  let route; // 尝试从应用实例上获取路由器
  if (!router && !hasRouteraBeenSetup(app)) {
    // 如果没有设置router，则创建并使用它
    route = toCreateRouter(publicPath, asyncRoutes, basicRoutes);
    app.use(route);
  } else {
    // 已经设置路由  
    route = router || app.config.globalProperties.$router
    console.log('router has already been set up.');
  }
  return route; // 无论app.$router是否存在，都会返回路由实例
}

