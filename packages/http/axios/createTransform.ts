import { Modal } from '../plugin/Modal.ts';
import { Message } from '../plugin/Message.ts';
import { logout } from '../plugin/user.ts';
import { addAjaxErrorInfo } from '../plugin/errorLog.ts';
import { transform } from './transform';
import { TokenEnum, LocalStorageEnum } from "../enums/httpEnum"
import { deepMerge } from '../utils/index.ts';
import { setToken, getToken, clearToken } from '../plugin/auth.ts';
import type { transformOptType } from '../types/axios';

const transformDefOptions = {
  Message,
  Modal,
  tokenExpires: TokenEnum.TOKEN_EXPIRES as number,
  storageType: 'localStorage',
  logout,
  addAjaxErrorInfo
}

/**
 * 创建 transform 对象
 * @param transformOpt 
 * @returns 
 */
export function createTransform(transformOpt: transformOptType) {
  // 获取传入参数
  const { token = '', tokenKey, storageType, tokenExpires, logout } = transformOpt
  const opt: transformOptType = {}
  // 传入参数中存在 tokenKey 参数，则默认使用传入参数的 tokenKey 重置所有 token 相关方法参数
  if (tokenKey) {
    opt.getToken = () => getToken(tokenKey, {
      type: storageType || LocalStorageEnum.localStorage
    })
    opt.setToken = () => setToken(tokenKey, token, {
      type: storageType || LocalStorageEnum.localStorage,
      expires: tokenExpires || TokenEnum.TOKEN_EXPIRES
    })
    opt.clearToken = () => clearToken(tokenKey, {
      type: storageType || LocalStorageEnum.localStorage,
    })
  }

  // 如果传入参数不存在 logout , 则使用默认 logout 方法和传入的 tokenKey 参数
  if (!logout) {
    opt.logout = () => transformDefOptions.logout(tokenKey)
  }
  // 返回 transform 对象, 合并参数和默认参数
  return transform(deepMerge(
    transformOpt,
    Object.assign(transformDefOptions, opt))
  )
}