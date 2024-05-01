import { routesStoreWithOut } from "@/store/routes";
import { useUserStoreWithOut } from "@/store/user";
import { authorityType, TokenType } from "@/types/token";
import type {  RouteItem } from 'vue-router';
import type { AppRouteModule } from "@/types/router";

const routeStore = routesStoreWithOut();
const userStore = useUserStoreWithOut();
// --------------------------路由相关--------------------------
// 获取后台管理路由
 function getAsyncRoutes(asyncRoutes: AppRouteModule[]) {
    return routeStore.getAsyncRoutes(asyncRoutes || [])
}
// 获取所有路由
 function getRoutes() {
    return routeStore.getRoutes
}
// 获取异步路由
 function getAddRoutes() {
    return routeStore.getAddRoutes
}
// 获取二级菜单展示路由
 function getShowRouters() {
    return routeStore.getShowRouters
}

// 设置侧边栏路由
 async function SetRoutes(asyncFilterRoutes: Array<T>, constantAsyncRoutes: Array<T>) {
    await routeStore.SetRoutes(asyncFilterRoutes,constantAsyncRoutes)
}
// 设置侧边栏路由
 async function SetRoute(routes: Array<RouteItem>) {
    await routeStore.SetRoute(routes)
}
// 清空路由数据
 async function ClearRoute() {
    await routeStore.ClearRoute()
}
// 设置二级菜单显示的路由
 async function SetShowRouters(routes: RouteItem) {
    return await routeStore.SetShowRouters(routes)
}
// 生成异步路由
 async function GenerateRoutes(routesMenuNames: Array<RouteItem>, asyncRoutes: AppRouteModule[], basicRoutes: AppRouteModule[]) {
    return await routeStore.GenerateRoutes(routesMenuNames,asyncRoutes,basicRoutes)
}


// --------------------------用户相关--------------------------
// 获取token
 function getToken() {
    return userStore.getToken
}
// 获取权限列表
 function getAuthority() {
    return userStore.getAuthority
}

// 设置token
 async function SetToken(data: TokenType) {
    await userStore.SetToken(data)
}
// 设置权限列表
 async function SetAuthority(authority: authorityType) {
    await userStore.SetAuthority(authority)
}
// 获取用户权限列表
 async function GetAuthority(getAuthList: Function, domain: string) {
    return await userStore.GetAuthority(getAuthList, domain)
}
// 使用 oa token 登录系统
 async function CheckOaLogin(checkOaLogin: Function, domain: string) {
    return await userStore.CheckOaLogin(checkOaLogin, domain)
}
// 退出
 async function Logout(domain: string) {
    await userStore.Logout(domain)
}
// 清空存储数据
 async function ClearLocal(domain: string) {
    await userStore.ClearLocal(domain)
}

export default {
    getAsyncRoutes,
    getRoutes,
    getAddRoutes,
    getShowRouters,
    SetRoutes,
    SetRoute,
    ClearRoute,
    SetShowRouters,
    GenerateRoutes,
    getToken,
    getAuthority,
    SetToken,
    SetAuthority,
    GetAuthority,
    CheckOaLogin,
    Logout,
    ClearLocal
}