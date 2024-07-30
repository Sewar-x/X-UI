
import type { Router, RouteItem } from 'vue-router';
import { Message as showMsg } from '@/plugin/Message.ts';
import { getToken as toGetToken, getSSOToken } from "@/utils/token";
import { routesStoreWithOut } from "@/store/routes";
import { useUserStoreWithOut } from "@/store/user";
import globalState from '@/utils/GlobalState';


const routeStore = routesStoreWithOut();
const userStore = useUserStoreWithOut();

// 获取全局变量




export async function createPermissionGuard(
    router: Router,
    Message: Function | undefined
) {
    /**
     * 问题： 直接使用 router.beforeEach 会导致在刷新页面时无法进入 router.beforeEach 的回调函数
     * 原因：可能是因为在刷新页面时，Vue Router 的初始化过程尚未完成，导致路由守卫无法正常触发。
     * 解决方案：将 router.beforeEach 回调函数的逻辑放在一个异步函数中，并在 Vue Router 初始化完成后再调用这个异步函数。你可以使用 router.isReady() 方法来判断 Vue Router 是否已经初始化完成。
     * isReady: isReady(): Promise<void> 返回一个 Promise，它会在路由器完成初始导航之后被解析，也就是说这时所有和初始路由有关联的异步入口钩子和异步组件都已经被解析。如果初始导航已经发生，则该 Promise 会被立刻解析。
     */
    router.isReady().then(() => {

        router.beforeEach(async (to: any, from: any, next: Function) => {
            // 判断用户是否已经登录，已经登录情况下，进入权限判断
            if (toGetToken()) {
                return await routerPermission(to, from, next, Message)
            } else {
                const whiteList = globalState.getState('whiteList');
                const domain = globalState.getState('domain');
                // 兼容oa 系统单点登录，获取 oa 中的 token
                const { ossToken } = getSSOToken(domain)
                // oa 存在 token，用户已经登录 oa
                if (ossToken) {
                    try {
                        // 使用 oa token 换取当前系统的 token, 登录系统
                        await userStore.checkSSOLogin();

                        return next();
                    } catch (err) {
                        userStore.ClearLocal();
                        return next("/login?redirect=" + to.path);

                    }
                    // 用户未登录, 判断是否进入白名单页面路由
                } else if (whiteList.includes(to.name as string)) {
                    return next();
                } else {
                    return next("/login?redirect=" + to.path);
                }
            }

        });
    });

}


/**
 * 路由权限判断函数,根据路由权限进入不同路由
 */
export async function routerPermission(
    to: RouteItem,
    from: RouteItem,
    next: Function,
    Message: Function | undefined,
) {

    // 已经存在 token, 进入用户登录页面
    if (to.path == '/login' && from) {
        // 从登录页面进入，直接进入登录页面
        if (from.path === '/login' || from.path === '/') {
            const homeRoute =  globalState.getState('homeRoute')
            return next(homeRoute);
        } else {
            //已经存在 token, 从其他页面进入用户登录页面，直接返回来源页面
            return next(from.path);
        }
    } else {
        // 获取是否用户权限
        const canAccess = await canUserAccess(to)
        if (canAccess) {
            return next()
        } else {
            if (Message) {
                Message({
                    message: "您没有权限访问页面,请联系系统管理员!",
                    type: "warning",
                });
            } else {
                showMsg.error({
                    message: "您没有权限访问页面,请联系系统管理员!",
                });
            }
            return false
        }
    }
}





/**
* 获取异步权限
* @param to 
* @returns 
*/
export async function canUserAccess(to: RouteItem) {
    if (!to || to?.name === "Login") return false
    const domain = globalState.getState('domain');
    try {
        const whiteList = globalState.getState('whiteList');
        let accessRoutes = userStore.getAuthority || {}
        if (accessRoutes?.menuNames && accessRoutes?.menuNames?.length === 0) {
            // 获取用户异步路由权限
            accessRoutes = await userStore.GetAuthority()
            // 生成用户所有路由权限
            const asyncRoutes = globalState.getState('asyncRoutes');
            const basicRoutes = globalState.getState('basicRoutes');

            routeStore.GenerateRoutes(accessRoutes?.menuNames || [], asyncRoutes, basicRoutes)
        }
        const allRoutes = [...whiteList, ...accessRoutes?.menuNames]
        return allRoutes.length > 0 && allRoutes.includes(to.name)
    } catch (err) {
        userStore.Logout(domain)
        return false
    }

}


/**
 * 解决刷新不触发 router.beforeEach 回调bug
 * @returns
 */
export async function reloadHacker() {
    if (!window) return
    if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
        // 用户进行了刷新动作
        try {
            let accessRoutes = userStore.getAuthority || {}
            const menuNames = accessRoutes?.menuNames
            if (Array.isArray(menuNames) && accessRoutes?.menuNames?.length === 0) {
                accessRoutes = await userStore.GetAuthority()
                const asyncRoutes = globalState.getState('asyncRoutes');
                const basicRoutes = globalState.getState('basicRoutes');
                routeStore.GenerateRoutes(accessRoutes?.menuNames || [], asyncRoutes, basicRoutes)
            }
            const domain = globalState.getState('domain');
            // 兼容oa 系统单点登录，获取 oa 中的 token
            const { ossToken } = getSSOToken(domain)
            if (!toGetToken() && !ossToken) {
                return userStore.Logout()
            }
        } catch (err) {
            return userStore.Logout()
        }
    }
}
reloadHacker()

