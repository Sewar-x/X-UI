import type { Ref } from 'vue'
export interface LayoutType {
    layoutMode: 'top' | 'aside' | 'topAside' | 'none'
}

export interface SideMenuType {
    type?: 'side' | 'top',
    routeInst?: any,
    routes?: Array<any>,
    asyncRoutes?: Array<any>,
    asyncSideRoutes?: Array<any>,
    layoutMode?: string,
    defaultActive?: string
  }