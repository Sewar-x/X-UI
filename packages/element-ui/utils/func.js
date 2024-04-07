import { createDateRangeShortcuts as create } from '@/xw-ui/shared'

export function createDateRangeShortcuts() {
  const shortcuts = create()
  return shortcuts.map(item => {
    const { value, ...rest } = item
    return {
      ...rest,
      onClick(picker) {
        picker.$emit('pick', value)
      }
    }
  })
}


/**
 * 判断两个值是否相同
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export function isEqual(obj1, obj2) {
  // 先判断类型是否相同
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  // 如果 obj1 和 obj2 都是基本类型，直接比较值
  if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2
  }

  // 如果 obj1 和 obj2 都是对象或数组
  // 先比较它们的长度是否相等
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) {
    return false
  }

  // 比较它们的每个属性/元素是否相等
  for (const key of keys1) {
    if (!isEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  // 如果所有属性/元素都相等，则返回 true
  return true
}

/**
 * 判断两个对象是否相等
 * @param { Object } a
 * @param { Object } b
 * @returns
 **/
export function isObjectValueEqual(a, b) {
  if (!(a instanceof Object) || !(b instanceof Object)) return false
  // 判断两个对象是否指向同一内存，指向同一内存返回 true
  if (a === b) return true // 获取两个对象键值数组
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  // 判断两个对象键值数组长度是否一致，不一致返回 false
  if (aProps.length !== bProps.length) return false // 遍历对象的键值
  for (const prop in a) {
    // 判断 a 的键值，在 b 中是否存在，不存在，返回 false
    // eslint-disable-next-line no-prototype-builtins
    if (b.hasOwnProperty(prop)) {
      // 判断 a 的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回 false
      if (typeof a[prop] === 'object') {
        if (!isObjectValueEqual(a[prop], b[prop])) return false
      } else if (a[prop] !== b[prop]) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}

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
 * 判断是否为 html 元素
 * @param {*} node
 * @returns
 */
export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

/**
 * 判断变量是否为函数
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
export function isFunction(functionToCheck) {
  const getType = {}
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  )
}

/**
 * 生成一个从 start 到 end 的连续数组
 * @param start
 * @param end
 */
export function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start)
}

/**
 * 检查数据类型
 * @param {*} type 数据类型
 * @param {*} data 数据
 * @returns
 */
export function checkType(type, data) {
  if (!type || !data) return false
  if (type === 'String') {
    return typeof data === 'string'
  } else if (type === 'Object') {
    return Object.prototype.toString.call(data) === '[object Object]'
  } else if (type === 'number') {
    return typeof data === 'number'
  } else if (type === 'function') {
    return Object.prototype.toString.call(data) === '[object Function]'
  } else {
    return false
  }
}
/**
 * 判断变量是否未定义
 * @param {} val
 * @returns
 */
export const isUndefined = val => {
  return val === void 0
}

/**
 * 判断是否定义属性
 * @param {*} val
 * @returns
 */
export const isDefined = val => {
  return val !== undefined && val !== null
}

/**
 * 根据对象路由获取嵌套对象内的属性值
 * 用处：1. 使用该方法获取嵌套对象内的属性，避免嵌套对象一层层属性判断
 * @param {*} object 提取的对象
 * @param {*} prop 属性嵌套路径
 * @returns 返回属性值
 */
export const getValueByPath = function (object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

/**
 * 对象转数组
 * @param {*} obj
 * @returns
 */
export function objToArray(obj) {
  if (Array.isArray(obj)) {
    return obj
  }
  return isEmpty(obj) ? [] : [obj]
}

/**
 * 判断是否为空值
 * @param {*} val
 * @returns
 */
export const isEmpty = function (val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}
/**
 * 根据对象路由获取嵌套对象内的属性值
 * 用处：1. 使用该方法获取嵌套对象内的属性，避免嵌套对象一层层属性判断
 * @param {*} object 提取的对象
 * @param {*} prop 属性嵌套路径
 * @returns 返回值包好：属性名，属性值，对象
 */
export function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  const keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    const key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

/**
 * 计算时间
 * @param {*} num 相差天数，正整数为加；负数为减
 * @param {*} date 计算日期
 * @returns
 */
export function dateCalc(num = 1, date = '') {
  if (!date) {
    date = new Date() // 没有传入值时,默认是当前日期
    date =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  date = Date.parse(new Date(date)) / 1000 // 转换为时间戳
  date += 86400 * Number(num) // 修改后的时间戳
  return new Date(parseInt(date) * 1000) // 转换为时间
}

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
// import cloneDeep from 'lodash/cloneDeep'
// export {
//   cloneDeep
// }
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 给内联样式中浏览器前缀，避免浏览器兼容性Bug
 * @param {*} style 内敛样式
 * @returns
 */
export const autoprefixer = function (style) {
  if (typeof style !== 'object') return style
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach(rule => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}

/**
 * 比较两个数组是否相同
 * @param {*} a
 * @param {*} b
 * @returns
 */
export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

/**
 * 获取当前时间
 */
export function timer() {
  // 获取div元素
  // 获取系统当前的年、月、日、小时、分钟、毫秒
  const weeks = ['日', '一', '二', '三', '四', '五', '六']
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()
  const week = weeks[date.getDay()]
  return {
    date,
    year,
    month,
    day,
    hour,
    minutes,
    second,
    week
  }
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
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

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
/*
 * @param {Function} callback  事件回调函数
 * @param {Number} time  延迟执行时间
 * @return function 闭包
 */
export function throttle(time, callback) {
  let pretime = Date.now()
  let timer = null
  return function (...args) {
    if (Date.now() - pretime > time) { // 在限流时间后触发事件
      clearTimeout(timer) // 当限流时间过后并在定时时间到达之前再次触发事件，就清除定时事件
      timer = null // 清空定时器
      pretime = Date.now()
      callback.apply(this, args) // 执行事件
    } else if (!timer) {
      // 如果在限流时间内触发事件并且定时为空(既定时事件不存在)，添加定时事件
      timer = setTimeout(() => {
        callback.apply(this, args)
      }, time)
    }
  }
}

/**
 * requestAnimationFrame 节流
 * 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
 * @param {*} fn
 * @returns
 */
export function rafThrottle(fn) {
  let locked = false
  return function (...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame(_ => {
      fn.apply(this, args)
      locked = false
    })
  }
}

/**
 * 将后端返回的name-id对数组格式化成el-cascader接受的格式label-value
 * @param {*} options 转换的 options 列表
 * @param {*} label 转换的 label 值
 * @param {*} value 转换的 value 值
 * @param {*} level 转换的深度
 * @param {*} remark 选项说明
 * @param {*} appendLabel 附加 label
 */
export function formateOptions(
  options,
  labelKey = 'title',
  valueKey = 'id',
  level = 1,
  remarkKey = null,
  childrenKey = 'children',
  appendLabel = null
) {
  if (level <= 0 || !options || !options.length) {
    return
  }
  const result = []
  options.forEach(item => {
    item['label'] = item[labelKey]
    item['value'] = item[valueKey]
    appendLabel ? (item[appendLabel] = item[labelKey]) : ''
    if (remarkKey) {
      item['remark'] = remarkKey ? item[remarkKey] : ''
      item['slot'] = true
    }
    if (item[childrenKey] && level - 1 > 0) {
      item.children = formateOptions(
        item[childrenKey],
        labelKey,
        valueKey,
        level - 1,
        remarkKey,
        childrenKey,
        appendLabel
      )
    }
    result.push(item)
  })
  return result
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
  data = [],
  arr = [],
  key = '',
  children = 'children'
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
 * 给数组对象中添加属性
 */
export function expandObject(data, key = '', value, callback) {
  data.forEach((item, index) => {
    if (item instanceof Array) {
      expandObject(item, key, value, callback)
    } else {
      if (callback) {
        callback(data, item, index)
      } else {
        item[key] = value
      }
    }
  })
  return data
}

/* base64 transform into url
 * @param {*} code
 * @returns
 */
export function base64ToUrl(code) {
  // Base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符，回车符给去掉，有时候因为存在需要把加号空格之类的换回来，取决于base64存取时的规则。
  code = code.replace(/[\n\r]/g, '')
  const raw = window.atob(code)
  const rawLength = raw.length
  // 转换成pdf.js能直接解析的Uint8Array类型
  const uInt8Array = new Uint8Array(rawLength)
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return window.URL.createObjectURL(
    new Blob([uInt8Array], { type: 'application/pdf' })
  ) // 转成pdf类型
}

// 把base64转成blob
export function dataURLtoBlob(dataurl) {
  // 获取到base64编码
  const arr = dataurl.split(',')
  // 获取mime
  const mime = arr[0].match(/:(.*?);/)[1]
  // 将base64编码转为字符串
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
// 将blob转换为file
export function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return theBlob
}

/**
 * 动态创建a标签实现文件附件的下载
 * @param {*} url
 * @param {*} filename
 * @returns
 */
export function downloadFile(url, filename) {
  if (!url) return
  const link = document.createElement('a') // 创建a标签
  link.style.display = 'none' // 使其隐藏
  link.href = url // 赋予文件下载地址
  link.setAttribute('download', filename) // 设置下载属性 以及文件名
  document.body.appendChild(link) // a标签插至页面中
  link.click() // 强制触发a标签事件
  document.body.removeChild(link)
}
/**
 * 兼容文件和图片的下载
 * @param {*} imgSrc  路径
 * @param {*} fileName 文件名
 */
export function downloadFileImg(imgSrc, fileName) {
  // imgSrc 为图片链接路径
  const alink = document.createElement('a')

  alink.href = imgSrc

  alink.download = fileName // fileName保存提示中用作预先填写的文件名

  alink.click()
}

/**
 * 打开浏览器新窗口，动态创建a标签实现文件附件的下载
 * @param {*} url
 * @param {*} filename
 * @returns
 */
export function openDownLoadFile(url, filename) {
  if (!url) return

  getBlob(url, function (blob) {
    saveAs(blob, filename)
  })
}
function getBlob(url, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (xhr.status === 200) {
      cb(xhr.response)
    }
  }
  xhr.send()
}

function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }
}
/**
 * 串行加载指定的脚本
 * 串行加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param {Array|String}  scripts 指定要加载的脚本
 * @param {Object} options 属性设置
 * @param {Function} callback 成功后回调的函数
 * @return {Array} 所有生成的脚本元素对象数组
 */

export function seriesLoadScripts(scripts, options, callback) {
  if (typeof scripts !== 'object') {
    const scripts = [scripts]
  }
  const HEAD =
    document.getElementsByTagName('head')[0] || document.documentElement
  const s = []
  const last = scripts.length - 1
  // 递归
  const recursiveLoad = function (i) {
    s[i] = document.createElement('script')
    s[i].setAttribute('type', 'text/javascript')
    // Attach handlers for all browsers
    // 异步
    s[i].onload = s[i].onreadystatechange = function () {
      if (!0 || this.readyState === 'loaded' || this.readyState === 'complete') {
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
        if (i !== last) {
          recursiveLoad(i + 1)
        } else if (typeof callback === 'function') {
          callback()
        }
      }
    }
    // 同步
    s[i].setAttribute('src', scripts[i])

    // 设置属性
    if (typeof options === 'object') {
      for (const attr in options) {
        s[i].setAttribute(attr, options[attr])
      }
    }

    HEAD.appendChild(s[i])
  }
  recursiveLoad(0)
}

/**
 * 并行加载指定的脚本
 * 并行加载[同步]同时加载，不管上个是否加载完成，直接加载全部
 * 全部加载完成后执行回调
 * @param {Array|String}  scripts 指定要加载的脚本
 * @param {Object} options 属性设置
 * @param {Function} callback 成功后回调的函数
 * @return {Array} 所有生成的脚本元素对象数组
 */

export function parallelLoadScripts(scripts, options, callback) {
  if (typeof scripts !== 'object') {
    const scripts = [scripts]
  }
  const HEAD =
    document.getElementsByTagName('head')[0] || document.documentElement
  const s = []
  let loaded = 0
  for (let i = 0; i < scripts.length; i++) {
    s[i] = document.createElement('script')
    s[i].setAttribute('type', 'text/javascript')
    // Attach handlers for all browsers
    // 异步
    s[i].onload = s[i].onreadystatechange = function () {
      if (!0 || this.readyState === 'loaded' || this.readyState === 'complete') {
        loaded++
        this.onload = this.onreadystatechange = null
        options && options.removeTag && this.parentNode.removeChild(this)
        if (loaded === scripts.length && typeof callback === 'function') {
          callback()
        }
      }
    }
    // 同步
    s[i].setAttribute('src', scripts[i])

    // 设置属性
    if (typeof options === 'object') {
      for (const attr in options) {
        s[i].setAttribute(attr, options[attr])
      }
    }

    HEAD.appendChild(s[i])
  }
}

export function randomString(len) {
  len = len || 32
  const $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

function getType(obj) {
  const str = Object.prototype.toString.call(obj)
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[str]
}

export function deepCopy(data) {
  let obj
  const types = getType(data)
  if (types === 'array') {
    obj = []
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line no-caller
      obj.push(deepCopy(data[i]))
    }
  } else if (types === 'object') {
    obj = {}
    for (const i in data) {
      // eslint-disable-next-line no-caller
      obj[i] = deepCopy(data[i])
    }
  } else {
    return data
  }
  return obj
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

/**
 *  清空站点所有 cookie
 */
export function clearCookie() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (let i = keys.length; i--;) {
      document.cookie =
        keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.kevis.com
      document.cookie =
        keys[i] +
        '=0;path=/;domain=' +
        document.domain +
        ';expires=' +
        new Date(0).toUTCString() // 清除当前域名下的，例如 .m.kevis.com
      document.cookie =
        keys[i] +
        '=0;path=/;domain=kevis.com;expires=' +
        new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .kevis.com
    }
  }
}

/**
 * 根据key值分类表单数据（用户表单合并单元格）
 * 方法：递归遍历数组，根据分类的key值，依次分类数据
 * @param {*} data 表单数据
 * @param {*} keys 依次分类的列 key
 * @param {*} keyIndex 当前分类key 的下标(可选)
 * @returns 返回按列分类后的表单数据
 * @example
 */
export function classifyByKey(data, keys = [], keyIndex = 0) {
  const key = keys[keyIndex]
  if (!key) return data
  const orderObj = {}
  data.forEach((item, index) => {
    if (orderObj[item[key]]) {
      orderObj[item[key]].push(item)
    } else {
      orderObj[item[key]] = []
      orderObj[item[key]].push(item)
    }
  })
  const sorted = []
  Object.keys(orderObj).forEach(cKey => {
    let ckeyIndex = keyIndex
    sorted.push(...classifyByKey(orderObj[cKey], keys, ++ckeyIndex))
  })

  return sorted
}

/**
 * 根据表单相同列的合并数据（用于 element 表单合并单元格）
 * @param {*} data 表单数据
 * @param {*} spanAll 每一列的合并数据
 * @param {Array} columns 列数据，数组中每一个数据为对象，对象中必须包含 prop 属性
 */
export function getSpanArr(data, spanAll = {}, columns = []) {
  columns.forEach(col => {
    getSpanNum(data, spanAll, col.prop)
  })
}

function getSpanNum(data, spanAll = {}, curName) {
  const spanArry = []
  let pos = 0

  data.forEach((val, i) => {
    if (i === 0) {
      spanArry.push(1)
      pos = 0
    } else {
      // 判断当前列数据与下一行的该列数据是否相同
      if (data[i][curName] === data[i - 1][curName]) {
        // 每一列每一行的合并数量
        spanArry[pos] += 1
        spanArry.push(0)
      } else {
        spanArry.push(1)
        pos = i
      }
    }
  })
  // 把合并数据放入spanAll里面，生成以列属性名为key，合并行数为数组的对象
  spanAll[curName] = spanArry
}

/**
 * 表单单元格合并函数
 * @param {*} spanAll 每一列的合并行数据
 * @param {*} param1
 * @returns
 */
export function tableSpanMethod(
  spanAll,
  { row, column, rowIndex, columnIndex }
) {
  const span = spanAll[column.property] || [] // 根据列属性获取合并行数数组
  const spanNum = span[rowIndex] // 获取行合并数量
  // 得到行合并的数据，如果行和合并数量未定义，表示不需要合并的行，则行数为1；否则行数定义了，如果行数大于0，则返回行数，如果为0不显示当前行
  const rowNum = isUndefined(spanNum) ? 1 : spanNum || 0
  // 列合并
  const colNum = rowNum > 0 ? 1 : 0
  // 当前位置的行合并和列合并数据
  return {
    rowspan: rowNum, // 行数为n，表示从当前行以下 n 行合并为一行；行数为 0 表示不显当前行；行数为 1 表示当前行不合并
    colspan: colNum // 列合并与行合并规则相同
  }
}

/* 移除HTML标签代码*/
export function removeHTMLTag(str) {
  if (!str) return ''
  str = str.replace(/<\/?[^>]*>/g, '') // 去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
  // str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
  str = str.replace(/ /gi, '') // 去掉
  return str
}
// 转意符换成普通字符
export function escape2Html(str) {
  if (!str) return ''
  const arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
}

// 指定符号转驼峰
export function underlineToHump(s, mark) {
  const a = s.split(mark)
  let result = a[0]
  for (let i = 1; i < a.length; i++) {
    result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
  }
  return result
}

// 首字母大写
export function initialsCase(title) {
  if (typeof title !== 'string') return title
  return title.charAt(0).toUpperCase() + title.slice(1)
}

// ---------------时间范围选择器组件相关函数-------------------

/**
 * 获取默认时间范围: 默认为当前时间到上个月的数据
 **/
export function defaultRangetime(format) {
  const time = getCurrentMonth()
  return [parseTime(time[0], format), parseTime(time[1], format)]
}

/**
 * 时间范围列表：时间范围选择
 * @returns
 */
export function rangetimePickerOptionsList() {
  return [
    {
      label: '全年',
      value: [
        parseTime(getCurrentYear()[0], '{y}-{m}-{d}'),
        parseTime(getCurrentYear()[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '当周',
      value: [getCurrentWeek()[0], getCurrentWeek()[1]]
    },
    {
      label: '当月',
      value: [
        parseTime(getCurrentMonth()[0], '{y}-{m}-{d}'),
        parseTime(getCurrentMonth()[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '上个月',
      value: [
        parseTime(getLastMonth()[0], '{y}-{m}-{d}'),
        parseTime(getLastMonth()[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '一季度',
      value: [
        parseTime(getCurrentSeason(1)[0], '{y}-{m}-{d}'),
        parseTime(getCurrentSeason(1)[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '二季度',
      value: [
        parseTime(getCurrentSeason(4)[0], '{y}-{m}-{d}'),
        parseTime(getCurrentSeason(4)[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '三季度',
      value: [
        parseTime(getCurrentSeason(7)[0], '{y}-{m}-{d}'),
        parseTime(getCurrentSeason(7)[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '四季度',
      value: [
        parseTime(getCurrentSeason(10)[0], '{y}-{m}-{d}'),
        parseTime(getCurrentSeason(10)[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '上半年',
      value: [
        parseTime(getHalfYearSeason(1)[0], '{y}-{m}-{d}'),
        parseTime(getHalfYearSeason(1)[1], '{y}-{m}-{d}')
      ]
    },
    {
      label: '下半年',
      value: [
        parseTime(getHalfYearSeason(10)[0], '{y}-{m}-{d}'),
        parseTime(getHalfYearSeason(10)[1], '{y}-{m}-{d}')
      ]
    }
  ]
}

/**
 * 时间范围选择器：时间范围选择
 * @returns
 */
export function rangetimePickerOptions() {
  return {
    shortcuts: [
      {
        text: '全年',
        onClick(picker) {
          const time = getCurrentYear()
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '去年',
        onClick(picker) {
          const time = getLastYear()
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '当月',
        onClick(picker) {
          const time = getCurrentMonth()
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '上个月',
        onClick(picker) {
          const time = getLastMonth()
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '一季度',
        onClick(picker) {
          const time = getCurrentSeason(1)
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '二季度',
        onClick(picker) {
          const time = getCurrentSeason(4)
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '三季度',
        onClick(picker) {
          const time = getCurrentSeason(7)
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '四季度',
        onClick(picker) {
          const time = getCurrentSeason(10)
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '上半年',
        onClick(picker) {
          const time = getHalfYearSeason(1)
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      },
      {
        text: '下半年',
        onClick(picker) {
          const time = getHalfYearSeason(10)
          picker.$emit('pick', [
            parseTime(time[0], '{y}-{m}-{d}'),
            parseTime(time[1], '{y}-{m}-{d}')
          ])
        }
      }
    ]
  }
}

// ----------------------------时间相关处理函数------------------------

/** 时间格式化**/
export function formatDate(date) {
  const myyear = date.getFullYear()
  let mymonth = date.getMonth() + 1
  let myweekday = date.getDate()
  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return myyear + '-' + mymonth + '-' + myweekday
}

/**
 * 获取本周从周一 0:00 开始到当天的时间区间
 *
 */
export function getCurrentWeek() {
  const date = new Date()
  // getDay 获取当天是周几, 周日是0，周六是 6，因此需要对周日特殊处理
  const nowDayOfWeek = date.getDay() === 0 ? 6 : date.getDay() - 1
  const startTimeMs = new Date(
    date.getTime() - nowDayOfWeek * 24 * 60 * 60 * 1000
  )
  const startTime = formatDate(startTimeMs)
  const endTime = formatDate(date)
  return [startTime, endTime]
}

/**
 * **得到本季度开始的月份**
 * @param month 需要计算的月份
 ***/
export function getQuarterSeasonStartMonth(month) {
  // let quarterMonthStart = 0
  const spring = 0 // 春
  const summer = 3 // 夏
  const fall = 6 // 秋
  const winter = 9 // 冬
  // 月份从0-11
  if (month < 3) {
    return spring
  }

  if (month < 6) {
    return summer
  }

  if (month < 9) {
    return fall
  }
  return winter
}

/**
 * **获得该月的天数**
 * @param year 年份
 * @param month 月份
 * */
export function getMonthDays(year, month) {
  // 本月第一天 1-31
  const relativeDate = new Date(year, month, 1)
  // 获得当前月份0-11
  let relativeMonth = relativeDate.getMonth()
  // 获得当前年份4位年
  let relativeYear = relativeDate.getFullYear()

  // 当为12月的时候年份需要加1
  // 月份需要更新为0 也就是下一年的第一个月
  if (relativeMonth === 11) {
    relativeYear++
    relativeMonth = 0
  } else {
    // 否则只是月份增加,以便求的下一月的第一天
    relativeMonth++
  }
  // 一天的毫秒数
  const millisecond = 1000 * 60 * 60 * 24
  // 下月的第一天
  const nextMonthDayOne = new Date(relativeYear, relativeMonth, 1)
  // 返回得到上月的最后一天,也就是本月总天数
  return new Date(nextMonthDayOne.getTime() - millisecond).getDate()
}

/**
 * **获得本季度的起止日期**
 * @param { Number } 获取的季度； 1：一季度； 2：二季度； 3：三季度； 4：四季度
 */
export function getCurrentSeason(season = null) {
  // 起止日期数组
  const startStop = []
  // 获取当前时间
  const currentDate = new Date()
  // 获得当前月份0-11
  const currentMonth = currentDate.getMonth()
  // 获得当前年份4位年
  const currentYear = currentDate.getFullYear()
  // 获得本季度开始月份
  const quarterSeasonStartMonth = getQuarterSeasonStartMonth(
    season || currentMonth
  )
  // 获得本季度结束月份
  const quarterSeasonEndMonth = quarterSeasonStartMonth + 2

  // 获得本季度开始的日期
  const quarterSeasonStartDate = new Date(
    currentYear,
    quarterSeasonStartMonth,
    1
  )
  // 获得本季度结束的日期
  const quarterSeasonEndDate = new Date(
    currentYear,
    quarterSeasonEndMonth,
    getMonthDays(currentYear, quarterSeasonEndMonth)
  )
  // 加入数组返回
  startStop.push(formatDate(quarterSeasonStartDate))
  startStop.push(formatDate(quarterSeasonEndDate))
  // 返回
  return startStop
}

/** *
 * **得到本年的起止日期**
 *
 */
export function getCurrentYear() {
  // 起止日期数组
  const startStop = []
  // 获取当前时间
  const currentDate = new Date()
  // 获得当前年份4位年
  const currentYear = currentDate.getFullYear()

  // 本年第一天
  const currentYearFirstDate = new Date(currentYear, 0, 1)
  // 本年最后一天
  const currentYearLastDate = new Date(currentYear, 11, 31)
  // 添加至数组
  startStop.push(formatDate(currentYearFirstDate))
  startStop.push(formatDate(currentYearLastDate))
  // 返回
  return startStop
}

/** *
 * **得到去年的起止日期**
 *
 */
export function getLastYear() {
  // 起止日期数组
  const startStop = []
  // 获取当前时间
  const currentDate = new Date()
  // 获得当前年份4位年
  const lastYear = currentDate.getFullYear() - 1

  // 年第一天
  const currentYearFirstDate = new Date(lastYear, 0, 1)
  // 年最后一天
  const currentYearLastDate = new Date(lastYear, 11, 31)
  // 添加至数组
  startStop.push(formatDate(currentYearFirstDate))
  startStop.push(formatDate(currentYearLastDate))
  // 返回
  return startStop
}

/**
 * **得到本半年开始的月份**
 * @param month 需要计算的月份
 ***/
export function getYearStartMonth(month) {
  // let quarterMonthStart = 0
  const up = 0 // 上
  const down = 6 // 下
  // 月份从0-11

  if (month < 6) {
    return up
  } else {
    return down
  }
}

/**
 * **获得本半年的起止日期**
 * @param { Number } month 获取的月份属于上下半年；
 */
export function getHalfYearSeason(month = null) {
  // 起止日期数组
  const startStop = []
  // 获取当前时间
  const currentDate = new Date()
  // 获得当前月份0-11
  const currentMonth = currentDate.getMonth()
  // 获得当前年份4位年
  const currentYear = currentDate.getFullYear()
  // 获得本季度开始月份
  const quarterSeasonStartMonth = getYearStartMonth(month || currentMonth)
  // 获得本季度结束月份
  const quarterSeasonEndMonth = quarterSeasonStartMonth + 5

  // 获得本季度开始的日期
  const quarterSeasonStartDate = new Date(
    currentYear,
    quarterSeasonStartMonth,
    1
  )
  // 获得本季度结束的日期
  const quarterSeasonEndDate = new Date(
    currentYear,
    quarterSeasonEndMonth,
    getMonthDays(currentYear, quarterSeasonEndMonth)
  )
  // 加入数组返回
  startStop.push(formatDate(quarterSeasonStartDate))
  startStop.push(formatDate(quarterSeasonEndDate))
  // 返回
  return startStop
}

/**
 * **获得当前时间的上个月起止日期**
 */
export function getLastMonth() {
  // 起止日期数组
  const startStop = []
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() - 1
  // if (month < 0) {
  //   year--
  //   month = 11
  // }

  // 获得开始的日期
  const startDate = new Date(year, month, 1)
  // 获得结束的日期
  const endDate = new Date(year, month, getMonthDays(year, month))
  // 加入数组返回
  startStop.push(formatDate(startDate))
  startStop.push(formatDate(endDate))
  // 返回
  return startStop
}

/**
 * **获得当前时间的上个月起止日期**
 */
export function getCurrentMonth() {
  // 起止日期数组
  const startStop = []
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  // 获得开始的日期
  const startDate = new Date(year, month, 1)
  // 获得结束的日期
  const endDate = new Date(year, month + 1, 0)
  // 加入数组返回
  startStop.push(formatDate(startDate))
  startStop.push(formatDate(endDate))
  // 返回
  return startStop
}

/**
 * 动态创建iframe
 * @param dom 创建iframe的容器，即在dom中创建iframe。dom可以是div、span或者其他标签。
 * @param src iframe中打开的网页路径
 * @param onload iframe加载完后触发该事件，可以为空
 * @param hidden 是否显示iframe
 * @return 返回创建的iframe对象
 */
export function createIframe({ dom, src, onload, onerror, hidden = false }) {
  // 在document中创建iframe
  const iframe = document.createElement('iframe')

  // 设置iframe的样式
  iframe.style.width = hidden ? '0' : '100%'
  iframe.style.height = hidden ? '0' : '100%'
  iframe.style.margin = '0'
  iframe.style.padding = '0'
  iframe.style.overflow = 'hidden'
  iframe.style.border = 'none'

  // 绑定iframe的onload事件
  if (isFunction(onload) || isFunction(onerror)) {
    if (iframe.attachEvent) {
      onload && iframe.attachEvent('onload', onload)
      onerror && iframe.attachEvent('onerror', onerror)
    } else if (iframe.addEventListener) {
      onload && iframe.addEventListener('load', onload)
      onerror && iframe.addEventListener('error', onerror)
    } else {
      onload && (iframe.onload = onload)
      onerror && (iframe.onerror = onerror)
    }
  }

  iframe.src = src
  // 把iframe加载到dom下面
  dom.appendChild(iframe)
  return iframe
}

/**
 * 销毁iframe，释放iframe所占用的内存。
 * @param iframe 需要销毁的iframe对象
 */
export function destroyIframe(iframe) {
  if (!iframe) return
  // 把iframe指向空白页面，这样可以释放大部分内存。
  iframe.src = 'about:blank'
  try {
    iframe.contentWindow.document.write('')
    iframe.contentWindow.document.clear()
  } catch (e) {
    console.error(e)
  }
  // 把iframe从页面移除
  iframe.parentNode.removeChild(iframe)
}
/**
 * 获取当天日期
 * @returns 返回当天日期
 */
export function timeDefault() {
  var date = new Date()
  var today =
    date.getFullYear() +
    '-' +
    timeAdd((date.getMonth() + 1).toString()) +
    '-' +
    timeAdd(date.getDate().toString())
  return today
}
// 当日期小于10自动补0
export function timeAdd(m) {
  if (m.length < 2) {
    m = '0' + m
  }
  return m
}

/**
 * 随机生成不重复颜色的函数
 * @param {*} numColors 生成颜色个数
 * @returns
 */
export function generateRandomColors(numColors) {
  const colors = []
  while (colors.length < numColors) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
    if (colors.indexOf(color) === -1) {
      colors.push(color)
    }
  }
  return colors
}

/**
 * 格式化列数,将一维数组转为二维数组，singleColums 为单列显示数据
 * @param { Array } data 格式化数据
 * @param { Number } columns 列数
 * @param { Number } singleColums 单列显示数据
 * @returns
 */
export function formatColmnsNum({ data = [], columns = null, singleColums = [] }) {
  if (!isArray(data) || !columns) return data
  const result = []
  for (let index = 0; index < data.length; index++) {
    const value = data[index]
    if (singleColums.includes(value)) {
      result.push([value])
    } else if (index % columns === 0) {
      const endIndex = Math.min(index + columns, data.length)
      const chunk = data.slice(index, endIndex)
      chunk.forEach((chunkItem, sindex) => {
        if (singleColums.includes(chunkItem)) {
          chunk.splice(sindex, 1)
        }
      })
      result.push(chunk)
    }
  }

  return result
}

/**
 *  如果是横屏状态，强制旋转到竖屏
 */
export function forcePortrait(reset = false) {
  if (!reset) {
    if (window.orientation === 0 || window.orientation === -180) {
      document.documentElement.style.transform = 'rotate(-90deg)'
      document.documentElement.style.width = '100vh'
      document.documentElement.style.height = '100vw'
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.position = 'fixed'
      document.documentElement.style.top = '50%'
      document.documentElement.style.left = '50%'
      document.documentElement.style.marginLeft = '-50vh'
      document.documentElement.style.marginTop = '-50vw'
    }
  } else {
    document.documentElement.style.transform = 'rotate(0deg)'
    document.documentElement.style.width = 'auto'
    document.documentElement.style.height = 'auto'
    document.documentElement.style.overflow = 'auto'
    document.documentElement.style.position = 'relative'
    document.documentElement.style.top = 'auto'
    document.documentElement.style.left = 'auto'
    document.documentElement.style.marginLeft = 'auto'
    document.documentElement.style.marginTop = 'auto'
  }
}

/**
 * 获取移动端横竖屏状态
 * @returns
 */
export function getOrientation() {
  let orientation
  if (window.orientation === undefined) {
    orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait'
  } else {
    orientation = (Math.abs(window.orientation) === 90) ? 'landscape' : 'portrait'
  }
  return orientation
}

/**
 * 监听横竖屏变化
 * @param {*} callback
 * @returns
 */
export function onOrientationChange(callback) {
  let orientation = getOrientation()
  const handleOrientationChange = function () {
    const newOrientation = getOrientation()
    if (newOrientation !== orientation) {
      orientation = newOrientation
      callback(orientation)
    }
  }
  window.addEventListener('orientationchange', handleOrientationChange, false)
  return function () {
    window.removeEventListener('orientationchange', handleOrientationChange, false)
  }
}
