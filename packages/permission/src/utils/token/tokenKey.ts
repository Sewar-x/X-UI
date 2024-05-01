import type { TokenKeyOptions } from "@/types/token"; // 确保类型名称与导入的类型匹配  
  
// 创建一个对象来存储key值，这样我们可以动态地修改它们，也可以使用默认值  
const tokenkeys = {  
  TOKEN_KEY: '_TOKEN__',  
  OA_TOKEN_KEYS: ['SIAMTGT', 'SIAMJWT'],  
  LOCALE_KEY: '_LOCALE__',  
  USER_INFO_KEY: '_USER__INFO__',  
  USER_AUTHORITY_KEY: '_USER__AUTHORITY__',  
  USER_ASYNC_ROUTE_KEY: '_USER_ASYNC_ROUTE_' 
};  
  
// 提供一个函数来设置key值  
export function setKeys(keyOptions: TokenKeyOptions) {  
  if (keyOptions.token_key) tokenkeys.TOKEN_KEY = keyOptions.token_key;  
  if (keyOptions.oa_token_keys) tokenkeys.OA_TOKEN_KEYS = keyOptions.oa_token_keys;  
  if (keyOptions.locale_key) tokenkeys.LOCALE_KEY = keyOptions.locale_key;  
  if (keyOptions.user_info_key) tokenkeys.USER_INFO_KEY = keyOptions.user_info_key;  
  if (keyOptions.user_authority_key) tokenkeys.USER_AUTHORITY_KEY = keyOptions.user_authority_key;  
  if (keyOptions.user_async_route_key) {  
    tokenkeys.USER_ASYNC_ROUTE_KEY = keyOptions.user_async_route_key;  
  }  
}  

// 导出keys对象，以便在其他地方使用  
export default tokenkeys;  
  
// 枚举仍然可以单独导出  
export enum envEnum {  
  DEVELOPMENT = "development",  
  PRODUCTION = "production",  
  TEST = "test",  
}  
  
export enum LoginEnum {  
  USERNAME = "username",  
  PASSWORD = "password",  
  REMEMBERME = "rememberMe",  
}  
