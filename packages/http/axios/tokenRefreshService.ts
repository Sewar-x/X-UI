import axios from 'axios';
import type { refreshTokenType, Recordable, storageType, transformOptType } from '../types/axios.d.ts'
import { isFunction } from '../utils/is.ts';
import { Message } from '../plugin/Message'; // 假设这些是处理token的工具函数  
import { setToken, clearToken } from "../plugin/auth"
import { LocalStorageWrapper } from "../plugin/storage"
import { formatToDateTime } from "../utils/dateUtil.ts"
import { ResultEnum } from '../enums/httpEnum.ts';


let requests: Array<any> = [];
let isRefreshing = false;

/**
 * 刷新 token 方法
 * @param config 
 * @param options 
 * @param refreshTokenConfig 
 * @param refreshToken 
 * @param configs 
 * @returns 
 */
export async function refreshToken(
  config: object,
  options: object,
  transformOpt: transformOptType,
  refreshToken: string,
  storageWrapper: LocalStorageWrapper,
  storageWrapType: storageType
) {
  const { tokenKey, formatResponse, refreshTokenConfig } = transformOpt

  const {
    url, // 刷新地址
    tokenExpiresKey, // token 过期时间 key
    refreshIdKey, // 刷新id key
    params
  } = refreshTokenConfig as refreshTokenType
  return new Promise((resolve, reject) => {
    if (isRefreshing) {
      // 如果正在刷新，将resolve存入数组，等待刷新后再执行  
      return new Promise(resolve => {
        // 用函数形式将 resolve 存入，等待刷新后再执行
        requests.push((token: string) => {
          if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
            // jwt token
            (config as Recordable).headers.Authorization = options.authenticationScheme
              ? `${options.authenticationScheme} ${token}`
              : token;
          }
          resolve(axios(config))
        })
      });
    }

    // 设置为正在刷新
    isRefreshing = true;

    // 调用刷新token的接口  
    axios.post(url, {
      token: refreshToken,
      refreshId: refreshIdKey ? storageWrapper.getItem(refreshIdKey as string) : null,
      ...params,
    })
      .then(response => {
        console.log('===刷新token 返回数据===', response)
        //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式, 如果不需要统一的格式，需要传入 formatResponse 函数，将服务端返回格式进行转换
        const { code, result, message } = (formatResponse && isFunction(formatResponse)) ? formatResponse(response.data) : response.data;

        // 这里逻辑可以根据项目进行修改,响应结果为成功状态
        const hasSuccess = response.data && code === ResultEnum.SUCCESS;
        if (hasSuccess) {
          const { token, expires, refreshId } = result;
          // 替换token  
          if (tokenKey) {
            console.log('===替换token  ===', tokenKey, token)
            setToken(tokenKey, token);
          }

          // 保存 token 过期时间
          if (tokenExpiresKey) {
            console.log('===保存 token 过期时间===', tokenExpiresKey, expires)
            storageWrapper.setItem(tokenExpiresKey, expires);
          }
          // 保存 token 刷新 id
          if (refreshIdKey) {
            storageWrapper.setItem(refreshIdKey, refreshId);
          }

          // 执行所有等待的请求, 并传入新的 token 参数  
          requests.forEach(resolve => {
            resolve(token);
          });

          requests = []; // 清空队列  
          isRefreshing = false;
          resolve(token);
        } else { // 服务端返回 token 刷新错误消息提示
          if (Message) {
            Message.error({ message });
          }
        }

      })
      .catch(error => {
        // 刷新 token 失败处理
        Message.error('Token刷新失败');
        // 清除 token 
        if (tokenKey) {
          clearToken(tokenKey, {
            type: storageWrapType
          });
        }

        reject(error);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
}


/**
 * 刷新 Token 检查
 * @param config 
 * @param options 
 * @param refreshTokenConfig 
 * @param configs 
 * @returns 
 */
export async function refreshTokenCheck(
  config: object,
  options: object,
  transformOpt: transformOptType
) {
  const { tokenKey, storageType, getToken, refreshTokenConfig } = transformOpt
  const {
    expires, //过期时间
    interval, // 刷新间隔
    tokenExpiresKey, // token 过期时间存储 key 
    refreshIdKey // 刷新 token id 存储key
  } = refreshTokenConfig as refreshTokenType



  const storageWrapType = (storageType as storageType) || 'cookie'
  const storageWrapper = new LocalStorageWrapper(storageWrapType);



  //========检查刷新 token 接口参数：expires, token 过期时间 =========
  let expiresAt = null // 传入或本地过期时间
  if (expires) {
    expiresAt = expires
  } else if (tokenExpiresKey) { // 获取本地保存 token 过期时间
    //expires 是 一个UNIX时间戳，表示 token 过期时间
    let localExpires = storageWrapper.getItem(tokenExpiresKey);
    // 将字符串转换回数字（毫秒）  
    expiresAt = parseInt(localExpires as string, 10)
  }
  if (!expiresAt) {
    console.log('============Token 过期时间不存在，请传入或 存入 token 过期时间=============');
    return false
  }

  // 检查是否需要刷新 token
  const currentTime = Date.now();

  console.log('当前时间：', formatToDateTime(currentTime))
  console.log('token 过期时间：', formatToDateTime(expiresAt))
  console.log('过期时间间隔：', formatToDateTime(expiresAt - interval))
  // 如果当前时间与过期时间大于间隔时间，不刷新 token
  if (currentTime < expiresAt - interval) {
    return false;
  }
  if (currentTime > expiresAt) {
    console.log('====== token 已过期，不刷新 token ======')
    return false
  }


  //========检查刷新 token 接口参数：token =========
  let token = null
  if (getToken && isFunction(getToken)) {
    token = getToken();
    if (!token) {
      console.log('========Token 不存在!=============');
      return false
    }
  }


  //========检查刷新 token 接口参数：refreshId =========
  let refreshId = refreshIdKey ? storageWrapper.getItem(refreshIdKey as string) : null;
  if (!refreshId) {
    console.log('========刷新 Token id 不存在! 不需要 刷新 token id =============');
  }


  try {
    // 刷新 token
    await refreshToken(config, options, transformOpt, token, storageWrapper, storageWrapType);
    return true;
  } catch (error) {
    // 刷新 token 失败处理
    Message.error('Token refresh failed');
    // 清除 token
    if (tokenKey) {
      clearToken(tokenKey, {
        type: storageWrapType,
      });
    }
    throw error;
  }
}