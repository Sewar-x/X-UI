import axios from 'axios';
import type { refreshTokenType, Recordable, storageType, transformOptType } from '../types/axios.d.ts'
import { isFunction } from '../utils/is.ts';
import { Message } from '../plugin/Message'; // 假设这些是处理token的工具函数  
import { setToken, clearToken } from "../plugin/auth"
import { LocalStorageWrapper } from "../plugin/storage"
import { formatToDateTime } from "../utils/dateUtil.ts"
import { ResultEnum } from '../enums/httpEnum.ts';


export default class TokenRefreshService {
  public requests: Array<any>;
  public isRefreshing: boolean;
  public config: object = {};
  public options: object = {};
  public transformOpt: transformOptType

  constructor(transformOpt: transformOptType) {
    this.requests = []
    this.isRefreshing = false
    this.transformOpt = transformOpt
  }



  /**
 * 刷新 token 方法
 * @param refreshToken 
 * @param storageWrapper 
 * @param storageWrapType 
 * @returns 
 */
  public async refreshToken(
    refreshToken: string,
    storageWrapper: LocalStorageWrapper,
    storageWrapType: storageType
  ) {
    const { tokenKey, formatResponse, refreshTokenConfig } = this.transformOpt

    const {
      url, // 刷新地址
      tokenExpiresKey, // token 过期时间 key
      refreshIdKey, // 刷新id key
      params
    } = refreshTokenConfig as refreshTokenType

    if (!refreshToken) {
      return false
    }
    // 设置为正在刷新
    this.isRefreshing = true;
    // 调用刷新token的接口  
    return axios.post(url, {
      token: refreshToken,
      refreshId: refreshIdKey ? await storageWrapper.getItem(refreshIdKey as string) : null,
      ...params,
    })
      .then(response => {
        //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式, 如果不需要统一的格式，需要传入 formatResponse 函数，将服务端返回格式进行转换
        const { code, result, message } = (formatResponse && isFunction(formatResponse)) ? formatResponse(response.data) : response.data;

        // 这里逻辑可以根据项目进行修改,响应结果为成功状态
        const hasSuccess = response.data && code === ResultEnum.SUCCESS;
        if (hasSuccess) {
          const { token, expires, refreshId } = result;
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
      })
  }





  /**
 * 刷新 Token 检查
 * @param config 
 * @param options 
 * @param refreshTokenConfig 
 * @param configs 
 * @returns 
 */
  public async refreshTokenCheck(
    config: object,
    options: object
  ) {
    // 初始化 config
    this.config = config
    // 初始化 options
    this.options = options
    const { tokenKey, storageType, getToken, refreshTokenConfig } = this.transformOpt
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
      let localExpires = await storageWrapper.getItem(tokenExpiresKey);
      // 将字符串转换回数字（毫秒）  
      expiresAt = parseInt(localExpires as string, 10)
    }
    if (!expiresAt) {
      return false
    }

    // 检查是否需要刷新 token
    const currentTime = Date.now();

    console.log('当前时间：', formatToDateTime(currentTime))
    console.log('token 过期时间点：', formatToDateTime(expiresAt))
    console.log('token 刷新时间点：', formatToDateTime(expiresAt - interval))
    // 如果当前时间与过期时间大于间隔时间，不刷新 token
    if (currentTime < expiresAt - interval) {
      console.log('===还没有到刷新时间间隔，不刷新 token===')
      return false;
    }
    if (currentTime > expiresAt) {
      console.log('===token 已经过期了，不刷新 token===')
      return false
    }


    //========检查刷新 token 接口参数：token =========
    let token = null
    if (getToken && isFunction(getToken)) {
      token = getToken();
    } else if (tokenKey) {
      token = await storageWrapper.getItem(tokenKey);
    }
    if (!token) {
      return false
    }

    //========检查刷新 token 接口参数：refreshId =========
    // let refreshId = refreshIdKey ? await storageWrapper.getItem(refreshIdKey as string) : null;
    // if (!refreshId) {
    //   console.log('========刷新 Token id 不存在! 不需要 刷新 token id =============');
    // }


    try {
      if (this.isRefreshing) {
        // 将往后的请求包装成异步 axios 请求，并存入队列
        return this.requests.push((token: string) => {
          return new Promise(resolve => {
            if (token && (this.config as Recordable)?.requestOptions?.withToken !== false) {
              // jwt token
              (this.config as Recordable).headers.Authorization = this.options.authenticationScheme
                ? `${this.options.authenticationScheme} ${token}`
                : token;
            }
            resolve(axios(this.config))
          });
        })

      }
      // 刷新 token
      await this.refreshToken(token, storageWrapper, storageWrapType);
      this.isRefreshing = false;
      // 执行所有等待的请求, 并传入新的 token 参数  
      if (this.requests.length > 0) {
        // 遍历队列，调用队列中所有异步方法，并传入新的 token 作为参数
        this.requests.forEach(callback => {
          callback(token);
        });
        this.requests = []; // 清空队列  
      }
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
}





