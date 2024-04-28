
import { clearToken } from "./auth"
import { TokenEnum } from "../enums/httpEnum"

/**
 * 退出登录, 默认通过清除用户 token 记录来退出登录
 */
export async function logout(tokenKey?: string) {
  console.log('===退出登录===')
  const keyName = tokenKey || TokenEnum.TOKEN_KEY as string
  clearToken(keyName)
}


