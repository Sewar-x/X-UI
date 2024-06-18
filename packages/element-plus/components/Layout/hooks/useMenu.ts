import { ref, type Ref} from 'vue'
import type { SideMenuType,LayoutType } from '../types.d.ts'
import type { RouteItem } from 'vue-router';
import { deepClone } from "../../../utils/func"
import { isEmpty } from "../../../utils/is"
import {
    Expand,
    Fold,
  } from "@element-plus/icons-vue";
  
class Menus {
  public topRoutes =  {}
  public sideRoutes = {}

  // 一级菜单展示路由
  getTopRouters(): RouteItem | Object {
    return this.topRoutes
  }
  // 二级菜单展示路由
  getSideRouters(): RouteItem | Object {
    return this.sideRoutes
  }
  /**
   * 设置一级菜单显示的路由
   * @param {} param0
   * @param {*} routes 当前路由对象，包含路由名称 name 或则路由路径
   * @returns
   */
  SetTopRouters(routes: RouteItem) {
    this.topRoutes = routes
  }
  /**
 * 设置二级菜单显示的路由
 * @param {} param0
 * @param {*} routes 当前路由对象，包含路由名称 name 或则路由路径
 * @returns
 */
  SetSideRouters(routes: RouteItem) {
    this.sideRoutes = routes
  }
}

// 顶部路由和侧边栏路由对象
export const menuStore = new Menus()
let topMenuOptions: Ref = ref({}) // 顶部菜单栏配置
let sideMenuOptions: Ref = ref({}) // 侧边栏菜单配置
let _layoutMode: LayoutType = 'aside'
let _routeInstance: any  = null
let _allRoutes: Array<any> =  []
let _asyncRoutes: Array<any>  = []
let _asyncSideRoutes: Array<any> = []
let _defaultTopActive: String = ''


// from 表单配置项
const menuConfig = {
  attr: {
    class: "layout-menu",
    "active-text-color": "#ffd04b",
    collapse: false,
  }, // el-menu的属性对象

  collapse: {
    type: "Icon",
    showIcon: Fold,
    colseIcon: Expand,
    size: 20,
    opendWidth: 200,
    closeWidth: 60,
  }, // 折叠按钮
  event: {}, // el-menu的事件对象
  ref: ref(), // el-menu组件的实例对象
};


const useMenu = ({     
  type = 'side',
  routeInst = {},
  routes= [],
  asyncRoutes = [],
  asyncSideRoutes= [],
  layoutMode = 'aside',
  defaultActive = '',
}:SideMenuType) => {
  // 初始化全局参数
  _layoutMode = layoutMode
  _routeInstance = routeInst
  _allRoutes  = routes
  _asyncRoutes = asyncRoutes
  _asyncSideRoutes = asyncSideRoutes
  _defaultTopActive = defaultActive

  const hanleMap = {
    'top': handleTopOrSideMenuConfig,
    'aside': handleTopOrSideMenuConfig,
    'topAside': handleAsideTopMenuConfig
  }

  const handler =  hanleMap[_layoutMode as string]
  if(handler) {
    handler({
      type
    })
  }
  return {
    topMenuOptions,
    sideMenuOptions
  }
}

/**
 * 设置顶部或侧边菜单栏配置
 */
function handleTopOrSideMenuConfig(){
  const options = deepClone(menuConfig)
  const hanleMap = {
    'top': handleTopMenu,
    'aside': handleAsideMenu,
  }
  const handler =  hanleMap[_layoutMode as string]
  options['menu'] = (handler && handler(_allRoutes,options)) || []
  options.event['select'] =  (name: string) => {
    _routeInstance.push({name})
  }

  setdefaultTopActive(_defaultTopActive as string,options)

  topMenuOptions.value = options
  sideMenuOptions.value = options
  return options
}


/**
 * 设置默认激活菜单栏
 * @param routeName 
 */
function setdefaultTopActive(routeName: string, options: object){
  /* eslint-disable no-unused-vars */  
  options.attr["default-active"] = routeName
  _routeInstance.push({name:routeName})
}

/**
 * 生成仅侧边栏菜单
 */
function handleAsideMenu(routes: Array<any>, options: object){
  const showMenus=  routes.filter(route => !route.hidden ).sort((route1,route2)=> route1.order - route2.order)
  return showMenus.map(route => {
    return {
      attr: {
        index: route.name,
      }, // el-menu-item的属性对象
      icon: {
        name: route?.meta?.icon || '', // 图标名
      },
      title: route.meta.title, // 菜单项文本内容
      subMenu: route.children? handleAsideMenu(route.children,options): []
    }
  })
}

/**
 * 生成仅包含顶部菜单
 */
function handleTopMenu(routes: Array<any>, options: object){
  /* eslint-disable no-unused-vars */  
  options.attr['mode'] = 'horizontal'
  options.attr['popper-offset'] = 20
  delete options.collapse 
  const menus =  handleAsideMenu(routes,options)
  return menus
}


/**
 * 设置顶部和侧边菜单栏配置
 */
function handleAsideTopMenuConfig({
  type
}:SideMenuType) {
  if(type === 'top') {
    generateTopMenuConfig()
  }
  if(type === 'side') {
    generateAsideMenuConfig({
      defaultActive: _defaultTopActive
    })
  }
}

/**
 * topAside 生成顶部菜单栏配置
 * @param param0 
 * @returns 
 */
function generateTopMenuConfig(){
  const topMenus = menuStore.getTopRouters()
  if(!isEmpty(topMenus)){
    console.log("🚀 生成顶部栏函数，顶部菜单栏不是空，直接返回:")
    topMenuOptions.value  = topMenus
    return 
  }
  const options = deepClone(menuConfig)
    // 过滤获取展示路由
  const showMenus = _allRoutes.filter(route => !route.hidden ).sort((route1,route2)=> route1.order - route2.order)
  options['menu'] = showMenus.map(route => {
    return {
      attr: {
        index: route.name,
      }, // el-menu-item的属性对象
      icon: {
        name: route?.meta?.icon || '', // 图标名
      },
      title: route?.meta?.title || '', // 菜单项文本内容
    }
  })
  options.attr['mode'] = 'horizontal'
  options.attr['popper-offset'] = 20
  delete options.collapse 
  options.event['select'] =  (name: string) => {
    generateAsideMenuConfig({
      defaultActive: name
    })
  }
  setdefaultTopActive(_defaultTopActive as string,options)
  topMenuOptions.value = options
  menuStore.SetTopRouters(topMenuOptions.value)
  console.log("🚀 ~ 生成顶部菜单配置====",JSON.parse(JSON.stringify(topMenuOptions.value)))
}

/**
 * topAside 生成侧边菜单栏配置
 * @param param0 
 * @returns 
 */
function generateAsideMenuConfig({
  defaultActive
}:SideMenuType){
  const topMenus = menuStore.getTopRouters()
  if(_layoutMode === 'topAside' && isEmpty(topMenus)){
    console.log("🚀 生成侧边栏函数，顶部菜单栏为空，生成顶部菜单:")

    generateTopMenuConfig()
  }
  const options = deepClone(menuConfig)

  if(!defaultActive) {
    console.log('===生成侧边栏菜单 _defaultTopActive 为空====',  defaultActive)
    sideMenuOptions.value = options
    return 
  }
    // 过滤获取展示路由
  const showMenus = _allRoutes.filter(route => !route.hidden && route.name === defaultActive)
  console.log('===生成侧边栏菜单 showMenus ====',showMenus)
  if(!showMenus || !showMenus[0]) return false
  const asideMenus = handleAsideMenu(showMenus[0].children,options)
  options['menu'] = asideMenus
  options.event['select'] =  (name: string) => {
    _routeInstance.push({name})
  }
  sideMenuOptions.value = deepClone(options)
  menuStore.SetSideRouters(sideMenuOptions.value)
  console.log("🚀 ~ 生成侧边菜单配置====", JSON.parse(JSON.stringify(sideMenuOptions.value)))
}


export { useMenu }