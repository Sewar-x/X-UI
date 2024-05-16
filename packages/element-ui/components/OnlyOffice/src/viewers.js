import Vue from 'vue'
import onlyOfficePermissions from './permission/permission.js'
import { getDefaultPermissions } from './permission/configure.js'
/**
 * olnyoffice在线预览文件
 * @param {*} url 文件连接
 * @param {*} name 文件名称
 * @returns
 */
export function opendFileByOnlyOffice({
  url = null,
  name = null,
  title = null,
  isEdit = false,
  callbackUrl = null,
  attachment_id = null,
  id = null,
  routeName = 'onlyoffice-viewer',
  routeQuery = {},
  permissions = null
}) {
  if (!url) return
  const ids = attachment_id || id
  const fileName = name || title
  const fileType = url.split('.').pop().toLowerCase()
  // 不支持的文件后缀
  const unsupportedFileExtensions = ['zip', 'file', 'odt', 'ods', 'odp', 'sxw', 'sxc', 'sxi', 'rtf', 'epub', 'jfif']
  const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg']
  if (unsupportedFileExtensions.includes(fileType)) {
    console.error('不支持该文件格式!请联系系统管理员')
    return false
  }

  if (imageFormats.includes(fileType)) {
    window.open(url, '_blank')
  } else {
    // 获取文件权限
    const perList = permissions || getDefaultPermissions(isEdit)
    // 设置文件权限
    onlyOfficePermissions.setPermissions({ id: ids, permissions: perList })
    if (Vue) {
      const routerData = Vue.prototype.$vue.$router.resolve({
        name: routeName,
        query: { url, title: fileName, callbackUrl, attachment_id: ids, ...routeQuery }
      })
      window.open(routerData.href, '_blank')
    }
  }
}
