/**
 * token 缓存
 *  
 */
import { TokenEnum } from "../enums/httpEnum"
import { tokenOptType } from "../types/axios.d"
import { LocalStorageWrapper } from "./storage"

/**
 * 设置 token
 * @param token 
 * @param options 
 */
export function setToken(key: string, token: string, options: tokenOptType = {
  type: 'localStorage',
  expires: TokenEnum.TOKEN_EXPIRES as number
}) {
  const { type, expires } = options
  const storageWrapper = new LocalStorageWrapper(type);
  const keyName = key || TokenEnum.TOKEN_KEY as string
  storageWrapper.setItem(keyName, token, expires); // 过期时间为 7 天  setToken()
}


/**
 * 获取 token
 * @param key 
 * @param options 
 */
export function getToken(key: string, options: tokenOptType = {
  type: 'localStorage',
}) {
  const { type } = options
  const storageWrapper = new LocalStorageWrapper(type);
  const keyName = key || TokenEnum.TOKEN_KEY as string
  storageWrapper.getItem(keyName);
}

/**
 * 清除token
 * @param key 
 * @param options 
 */
export function clearToken(key: string, options: tokenOptType = {
  type: 'localStorage',
}) {
  const { type } = options
  const storageWrapper = new LocalStorageWrapper(type);
  const keyName = key || TokenEnum.TOKEN_KEY as string
  storageWrapper.removeItem(keyName);
}