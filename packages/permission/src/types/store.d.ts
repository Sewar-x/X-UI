import type { AppRouteModule } from "@/types/router";
import type { Router } from 'vue-router';
import type { App } from "vue";



export interface SetupRouterOptions {
    app: App<Element>,
    router: Router,
    publicPath: string,
    asyncRoutes: AppRouteModule[], // 异步路由
    basicRoutes: AppRouteModule[] // 基础路由
}

export interface permissionOptionsType {
    routerMode?: 'hash' | 'history', // 路由模式
    publicPath?: string, // 路由根路径
    router?: Router,  // 路由对象(可选)
    whiteList?: string[], // 白名单
    asyncRoutes?: AppRouteModule[], // 异步路由
    basicRoutes?: AppRouteModule[], // 基础路由
    domain?: string | null, // oa 域名
    Message?: Function, // 消息提示
    getAuthList?: Function | null, // 获取用户权限列表接口
    checkSSOLogin?: Function | null, // 检查oa登录状态接口
    logout?: Function | null, //退出登录接口
    storageType?: 'localStorage' | 'sessionStorage' | 'cookie',  // 本地数据存储类型
    expires?: string,// 本地数据存储过期时间
    TOKEN_KEY?: string, // token key
    SSO_TOKEN_KEYS?: string | Array<any>// 单点登录 Keys
    Message?: Function | undefined // 消息提示组件
    homeRoute: String | undefined // 首页路由(路径)
}