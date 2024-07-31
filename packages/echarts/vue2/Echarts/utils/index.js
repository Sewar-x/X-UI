
/**
 * 判断是否为字符串
 * @param {*} obj
 * @returns
 */
export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

/**
 * 判断是否为对象
 * @param {*} obj
 * @returns
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
/**
 * 判断是否为数组
 * @param {*} obj
 * @returns
 */
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  /**
 * 计算数组总和
 * @param {} array
 * @returns total
 */

  export function sumArray(array = null) {
    if (!array) return 0
    return array.reduce(function (prev, curr, idx, array) {
      return prev + curr
    })
  }

  /**
   * 递归赋值option 属性
   * @param {*} defaultData 默认对象
   * @param {*} newData  新对象
   * @returns
   */
  export function recursionObject(target, ...arg) {
    return arg.reduce((acc, cur) => {
      return Object.keys(cur).reduce((subAcc, key) => {
        const srcVal = cur[key]
        if (isObject(srcVal)) {
          subAcc[key] = recursionObject(subAcc[key] ? subAcc[key] : {}, srcVal)
        } else if (isArray(srcVal)) {
          // series: []，下层数组直接赋值
          subAcc[key] = srcVal.map((item, idx) => {
            if (isObject(item)) {
              const curAccVal = subAcc[key] ? subAcc[key] : []
              return recursionObject(curAccVal[idx] ? curAccVal[idx] : {}, item)
            } else {
              return item
            }
          })
        } else {
          subAcc[key] = srcVal
        }
        return subAcc
      }, acc)
    }, target)
  }