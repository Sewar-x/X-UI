
/**
 * 判断变量是否为函数
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
export function isFunction(functionToCheck: Function) {
  const getType = {}
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  )
}



/**
 * 获取嵌套对象的所有对象的 key 对应 value值
 * @param {*} data 嵌套对象
 * @param {*} arr 存放属性数组
 * @param {*} children 保存嵌套子对象的属性
 * @param {*} key 获取的 value 对应的 key
 * @returns
 */
export function getChildValue(
  data: Array<any> = [],
  arr: Array<any> = [],
  key: string = '',
  children: string = 'children'
) {
  if (!key || data.length <= 0) return
  data.forEach(item => {
    if (item[children]) {
      getChildValue(item.children, arr, key, children)
    }
    arr.push(item[key])
  })
}

/**
 * 获取路由名称
 * @param data 
 * @returns 
 */
export function getRouteNames(data: {
  menu?: Array<any>,
  menuNames: Array<any>,
}) {
  let menuNames: Array<any> = []
  // 递归获取后端路由 name 的数组存入 leftMenuNames
  getChildValue(data?.menu || [], menuNames, 'name', 'children')
  data.menuNames = menuNames
  return data
}