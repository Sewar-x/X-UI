import { createAxios } from './createAxios';
import { createTransform } from './createTransform';
import type { CreateAxiosOptions } from './axiosTransform';
import type { transformOptType } from '../types/axios';
import TokenRefreshService from './tokenRefreshService.ts'
/**
 * 创建 xhttp 实例
 * @param transformOpt 
 * @param opts 
 * @returns 
 */
export function createXhttp(transformOpt: transformOptType, opts: Partial<CreateAxiosOptions>) {
  const transform = createTransform(transformOpt, new TokenRefreshService(transformOpt));
  return createAxios(transform, opts);
}

export {
  createTransform,
  createAxios
}
