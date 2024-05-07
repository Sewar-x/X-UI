import axios from 'axios';
import type { refreshTokenType, Recordable, storageType } from '../types/axios.d.ts'
import { isFunction } from '../utils/is.ts';
import { Message } from '../plugin/Message'; // 假设这些是处理token的工具函数  
import { setToken, clearToken } from "../plugin/auth"
import { LocalStorageWrapper } from "../plugin/storage"

interface tokenConfigType {
  getToken: Function | undefined,
  tokenKey: string | undefined,
  storageType: string | undefined,
}

let requests: Array<any> = [];
let isRefreshing = false;

/**
 * 刷新 token 方法
 * @param config 
 * @param options 
 * @param refreshTokenConfig 
 * @param refreshToken 
 * @param tokenConfig 
 * @returns 
 */
export async function refreshToken(
  config: object,
  options: object,
  refreshTokenConfig: refreshTokenType,
  refreshToken: string,
  tokenConfig: tokenConfigType,
  storageWrapper: LocalStorageWrapper,
  storageWrapType: storageType
) {
  const {
    url, // 刷新地址
    tokenExpiresKey, // token 过期时间 key
    refreshIdKey, // 刷新id key
    params
  } = refreshTokenConfig
  const { tokenKey } = tokenConfig
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
      refreshId: storageWrapper.getItem(refreshIdKey as string),
      ...params,
    })
      .then(response => {
        const { token, expires, refreshId } = response.data;
        // 替换token  
        if (tokenKey) {
          setToken(tokenKey, token);
        }

        // 保存 token 过期时间
        if (tokenExpiresKey) {
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
 * @param tokenConfig 
 * @returns 
 */
export async function refreshTokenCheck(
  config: object,
  options: object,
  refreshTokenConfig: refreshTokenType,
  tokenConfig: tokenConfigType
) {

  const {
    expires, //过期时间
    interval, // 刷新间隔
    tokenExpiresKey, // token 过期时间存储 key 
    refreshIdKey // 刷新 token id 存储key
  } = refreshTokenConfig


  // 外部传入的获取 token 方法
  const { getToken, tokenKey, storageType } = tokenConfig
  const storageWrapType = (storageType as storageType) || 'cookie'
  const storageWrapper = new LocalStorageWrapper(storageWrapType);



  //========检查刷新 token 接口参数：expires, token 过期时间 =========
  let expiresAt = null // 传入或本地过期时间
  if (!expires) {
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
  // 如果当前时间与过期时间大于间隔时间，不刷新 token
  if (currentTime < expiresAt - interval) {
    return false;
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
  let refreshId = storageWrapper.getItem(refreshIdKey as string);
  if (!refreshId) {
    console.log('========刷新 Token id 不存在!=============');
    return false
  }


  try {
    // 刷新 token
    await refreshToken(config, options, refreshTokenConfig, token, tokenConfig, storageWrapper, storageWrapType);
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