import Storage from "@/utils/storage";
import globalState from '@/utils/GlobalState';
// oa 中单点登录使用 token 可能存在两个 key 值，需要循环使用两个 key 获取 cookies 中的 token
// 旧 OA 使用 SIAMJWT, 新 OA 使用 SIAMTGT 和 LtpaToken
// OA 系统中会使用'SIAMTGT', 'SIAMJWT' 换取该 token 进行登录, 在内嵌 oa 页面中必须使用 LtpaToken  进行跳转登录 oa

interface tokenInfoType {
  token: string | null | undefined,
  expire?: number | string | null,
  key?: string | null,
  ticketName: string,
  ticketValue: string
}

/**
 * 设置 Token 信息
 * @param {*} param
 */
export function setTokenInfo({ token, expire, key, ticketName, ticketValue }: tokenInfoType, domain: string): string | null | undefined {
  const storageType = globalState.getState('storageType')
  const storage = new Storage(storageType);
  const TOKEN_KEY = globalState.getState('TOKEN_KEY');
  storage.setItem(TOKEN_KEY, token as string)
  SetSSOToken(ticketName, ticketValue, domain)
}

/**
 * 移除 Token 信息
 */
export function removeAuthToken(domain: string) {
  removeToken(domain)
  removeSSOToken(domain)
}

/**
 * 获取 Token
 * @param {*} key
 * @returns
 */
export function getToken(key?: string | undefined): string {
  const TOKEN_KEY = globalState.getState('TOKEN_KEY');
  const setKey = key || TOKEN_KEY;
  const storageType = globalState.getState('storageType');
  const storage = new Storage(storageType);
  return storage.getItem(setKey) as string;
}

/**
 * 设置 Token
 * @param {*} token
 * @returns
 */
export function setToken(token: string | null | undefined) {
  const storageType = globalState.getState('storageType');
  const storage = new Storage(storageType);
  const TOKEN_KEY = globalState.getState('TOKEN_KEY');
  return storage.setItem(TOKEN_KEY, token || '')
}

/**
 * 移除 Token
 * @returns
 */
export function removeToken(domain: string) {
  const storageType = globalState.getState('storageType');
  const storage = new Storage(storageType);
  removeSSOToken(domain)
  const TOKEN_KEY = globalState.getState('TOKEN_KEY');
  return storage.removeItem(TOKEN_KEY)
}

interface oaTokensType {
  key: string | null,
  ossToken: string | null | undefined,
}
/**
 * 获取 Token, 由于 OA 使用三个 token，因此需要遍历获取 token
 * @returns
 */
export function getSSOToken(domain: string): oaTokensType {
  let key = null
  let ossToken = null
  const storageType = globalState.getState('storageType');
  const storage = new Storage(storageType);
  const SSO_TOKEN_KEYS = globalState.getState('SSO_TOKEN_KEYS');
  for (const keys of SSO_TOKEN_KEYS) {
    ossToken = storage.getItem(keys, {
      domain: domain
    })
    if (ossToken) {
      key = keys
      break
    }
  }

  return {
    key,
    ossToken
  }
}

/**
 * 设置 OA token
 * @param {*} TOKEN_KEY
 * @param {*} token
 * @returns
 */
export function SetSSOToken(tokenKey: string, token: string, domain: string) {
  const storageType = globalState.getState('storageType');
  const storage = new Storage(storageType);
  return storage.setItem(tokenKey, token, {
    expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
    domain: domain
  })
}

/**
 * 清空所有 oa token
 */
export function removeSSOToken(domain: string) {
  const storageType = globalState.getState('storageType');
  const storage = new Storage(storageType);
  const SSO_TOKEN_KEYS = globalState.getState('SSO_TOKEN_KEYS');
  SSO_TOKEN_KEYS.forEach((key: string) =>
    storage.removeItem(key, {
      domain: domain
    })
  )
}

