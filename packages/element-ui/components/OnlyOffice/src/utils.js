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


/** Only office
 *检查文件类型
 * @param {*} fileType 返回文件类型
 * @returns
 */
export function handleDocType(fileType) {
  let docType = ''
  const fileTypesDoc = [
    'doc',
    'docm',
    'docx',
    'dot',
    'dotm',
    'dotx',
    'epub',
    'fodt',
    'htm',
    'html',
    'mht',
    'odt',
    'ott',
    'pdf',
    'rtf',
    'txt',
    'djvu',
    'xps'
  ]
  const fileTypesCsv = [
    'csv',
    'fods',
    'ods',
    'ots',
    'xls',
    'xlsm',
    'xlsx',
    'xlt',
    'xltm',
    'xltx'
  ]
  const fileTypesPPt = [
    'fodp',
    'odp',
    'otp',
    'pot',
    'potm',
    'potx',
    'pps',
    'ppsm',
    'ppsx',
    'ppt',
    'pptm',
    'pptx'
  ]
  if (fileTypesDoc.includes(fileType)) {
    docType = 'word'
  }
  if (fileTypesCsv.includes(fileType)) {
    docType = 'cell'
  }
  if (fileTypesPPt.includes(fileType)) {
    docType = 'slide'
  }
  return docType
}


/**
 * 获取文件类型
 * @param {*} url
 * @returns
 */
export function getFileType(url) {
  if (!url) return null
  const path = url.split('?')[0]
  return path
    ? path
      .split('.')
      .pop()
      .toLowerCase()
    : null
}

/**
 * 参数和配置检查
 * @return {Boolean} true 检测通过
 */
export function paramsCheck({ url, attachment_id = null, user = {} }) {
  if (!url) {
    console.error('文档连接为空！！')
    return false
  }
  if (!attachment_id) {
    console.error('文件 id 为空！！')
    return true
  }
  if (!user.id || !user.name) {
    console.error('缺少用户信息！！')
    return true
  }
  if (!window.DocsAPI) {
    console.error('window.DocsAPI 加载失败！！')
    return false
  }
  return true
}
