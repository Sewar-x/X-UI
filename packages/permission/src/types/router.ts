import type { RouteMeta, RouteRecordRaw } from "vue-router";
import type { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<T>);

export type AppRouteRecordRaw = RouteRecordRaw & {
  path: string; //路由路径
  name?: string; //路由名称
  order?: number | null | undefined; //路由排序
  component?: Component | string; //视图组件
  hidden?: boolean; //是否在菜单显示
  redirect?: string; //重定向路径
  children?: AppRouteRecordRaw[]; //子菜单
  meta?: RouteMeta //路由元信息
};

export type AppRouteModule = AppRouteRecordRaw;