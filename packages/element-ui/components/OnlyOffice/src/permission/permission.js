import LocalStorageWrapper from '../storage.js'
import { getDefaultPermissions } from './configure.js'

const permissionKey = 'onlyOfficePermission'
const localStorageWrapper = new LocalStorageWrapper('localStorage');

class OnlyOfficePermissions {
  constructor() {
    // onlyoffice 权限，key 为附件 id, value 为权限对象
    this.permissions = localStorageWrapper.getItem(permissionKey) ? JSON.parse(localStorageWrapper.getItem(permissionKey)) : {}
  }

  /**
   * 获取权限列表
   * @param {*} id 附件id 权限列表
   * @returns
   */
  getPermissions(id) {
    return this.permissions[id] || getDefaultPermissions()
  }

  /**
   * 设置权限
   * @param {*} params
   * */
  setPermissions({ id = null, permissions = {} }) {
    if (!id) {
      throw new Error('设置附件权限失败! 附件 id 不存在, 请检查附件id')
    }
    // 默认权限
    const defaultPermission = getDefaultPermissions()
    // 设置权限
    const setPermission = {
      [id]: Object.assign({}, defaultPermission, permissions)
    }
    // 当前附件权限列表
    const perList = Object.assign({}, this.permissions, setPermission)
    localStorageWrapper.setItem(permissionKey, perList);
  }
}

const onlyOfficePermissions = new OnlyOfficePermissions()
export default onlyOfficePermissions
