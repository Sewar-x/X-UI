
import { defineStore } from "pinia";
import { store } from "@/store";
import type { RouteItem } from 'vue-router';
import type { AppRouteModule } from "@/types/router";

/**
 * Filter asynchronous routing tables by recursion
 * 过滤没有权限的常量路由路由：递归前端路由，查找 name 不存在的路由，删除
 * @param routes asyncRoutes
 * @param roles
 */
export function filterRoutes(routesInstans: Array<T>, routesMenuNames: Array<T>): void {
  // 开发环境侧边栏路由不由后端管理系统控制
  // if (process.env.NODE_ENV === envEnum.DEVELOPMENT) return
  // 测试和生产环境下，对常量路由进行过滤
  for (let i = 0; i < routesInstans.length; i++) {
    const route = routesInstans[i]
    if (route.children) {
      filterRoutes(route.children, routesMenuNames)
    }
    if (routesMenuNames && routesMenuNames.length > 0 && (!route?.hidden)) {
      route.hidden = (routesMenuNames.indexOf(route.name) < 0)
    }
  }
}


interface routesState {
  routes: Array<RouteItem>;
  addRoutes: Array<RouteItem>;
  showRouters: Array<RouteItem> | Object;
}

export const useRoutesStore = defineStore({
  id: "routes-store",

  state: (): routesState => ({
    routes: [], // 权限路由
    addRoutes: [], // 异步路由
    showRouters: {} // 后台管理-二级展示的路由
  }),

  getters: {
    // 所有路由
    getRoutes(): Array<RouteItem> {
      return this.routes;
    },

    // 异步路由
    getAddRoutes(): Array<RouteItem> {
      return this.addRoutes;
    },

    // 二级菜单展示路由
    getShowRouters(): RouteItem | Object {
      return this.showRouters;
    },

    // 获取异步路由
    getAsyncRoutes(asyncRoutes: AppRouteModule[]): Array<RouteItem | null> {
      const asyncRoute = (asyncRoutes[0] && asyncRoutes[0]?.children) as Array<RouteItem>;
      return asyncRoute;
    }
  },

  actions: {
    // 设置所有路由
    SetRoutes(asyncFilterRoutes: Array<T>, constantAsyncRoutes: Array<T>) {
      this.routes = constantAsyncRoutes.concat(asyncFilterRoutes).sort((value1: RouteItem, value2: RouteItem) => value1?.order - value2?.order) //所有路由
      this.addRoutes = asyncFilterRoutes //新增异步路由获取后台管理系统路由(前台未设置权限页面，因此异步路由即为后台管理路由)
    },

    // 设置侧边栏路由
    SetRoute(routes: Array<RouteItem>) {
      this.routes = routes
    },

    // 清空路由数据
    ClearRoute() {
      this.addRoutes = []
      this.routes = []
      this.showRouters = {}
    },

    // 生成异步路由
    GenerateRoutes(routesMenuNames: Array<RouteItem>, asyncRoutes: AppRouteModule[], basicRoutes: AppRouteModule[]) {
      // 过滤常量路由：过滤没有权限的异步路由
      filterRoutes(basicRoutes, routesMenuNames)
      // 过滤异步路由：过滤没有权限的异步路由
      filterRoutes(asyncRoutes, routesMenuNames)
      this.SetRoutes(asyncRoutes, basicRoutes)
      return asyncRoutes
    },

    /**
     * 设置二级菜单显示的路由
     * @param {} param0
     * @param {*} routes 当前路由对象，包含路由名称 name 或则路由路径
     * @returns
     */
    SetShowRouters(routes: RouteItem) {
      const { name, matched } = routes
      let topRouteName = name // 二级路由顶部菜单栏名称
      if (matched && matched.length > 0) { // 根据路由匹配路径获取二级顶部菜单栏名称
        topRouteName = matched[0].name
      }
      const filterRouter = this.routes.map((item: RouteItem) => {
        if (item.name !== topRouteName) {
          item.hidden = true
        } else {
          item.hidden = false
        }
        return item
      })
      this.SetRoute(filterRouter)
      return routes
    }


  },
});

export function routesStoreWithOut() {
  return useRoutesStore(store);
}

