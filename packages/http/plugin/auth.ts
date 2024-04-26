/**
 * token 缓存，待完善...
 *  
 */

export function setToken(token: string) {
  console.log('设置用户 token', token)
}

export function getToken() {
  console.log('getToken...')
}

export function getAuthCache<T>(key: string) {
  console.log('getAuthCache...')
}

export function setAuthCache(key: string, value) {
  console.log('setAuthCache...')
}

export function clearAuthCache(immediate = true) {
  console.log('clearAuthCache...')
}
