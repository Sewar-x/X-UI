/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * @description:  token 
 */
export enum TokenEnum {
  // token key
  TOKEN_KEY = 'Bearer',
  // token 默认过期时间
  TOKEN_EXPIRES = 7,
}

/**
 * @description:  本地存儲枚舉 
 */
export enum LocalStorageEnum {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
  cookie = 'cookie'
}


