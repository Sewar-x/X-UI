import type { AppRouteModule } from "@/types/router";
import type { Router } from 'vue-router';
import type { App } from "vue";

export interface PermissionGuardOptions {
    router: Router,  // 路由对象
    whiteList: string[], // 白名单
    asyncRoutes: AppRouteModule[], // 异步路由
    basicRoutes: AppRouteModule[], // 基础路由
    getAuthList: Function, // 获取用户权限列表
    checkOaLogin: Function, // 检查oa登录状态
    domain: string, // oa 域名
    Message: Function // 消息提示
}

export interface SetupRouterOptions {
    app: App<Element>,
    router: Router,
    publicPath: string,
    asyncRoutes: AppRouteModule[], // 异步路由
    basicRoutes: AppRouteModule[] // 基础路由
}

export interface permissionOptions {
    publicPath: string,
    router?: Router,  // 路由对象(可选)
    whiteList: string[], // 白名单
    asyncRoutes: AppRouteModule[], // 异步路由
    basicRoutes: AppRouteModule[], // 基础路由
    getAuthList: Function, // 获取用户权限列表
    checkOaLogin: Function, // 检查oa登录状态
    domain: string, // oa 域名
    Message: Function // 消息提示
}