import { type Component, type Ref } from "vue";

declare type T = any;
declare type Recordable<T = any> = Record<string, T>;

declare interface IconType {
  isSvgIcon: boolean;
  name: string;
  size?: number | string;
  color?: string;
  style?: object;
}

interface CompContentType {
  text: any;
  key?: string;
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
}

declare interface CompType {
  comp: string | Component; // 组件标签名称
  className?: string, // 组件类名称
  data?: any; // 传入组件数据
  key?: string; // 组件 key 
  attr?: Recordable; // 组件属性
  event?: Recordable; // 组件事件
  content?: CompContentType; // 组件内容
  children?: Array<CompType> | []; //组件子节点 dom 
  ref?: Ref<T>; // 组件 ref 引用
}

declare interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_LEGACY: boolean;
  VITE_USE_IMAGEMIN: boolean;
  VITE_GENERATE_UI: string;
}