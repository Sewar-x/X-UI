
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { RequestOptions, Result, Recordable, transformOptType } from '../types/axios';
import type { AxiosTransform } from './axiosTransform.ts';
import { checkStatus } from './checkStatus.ts';
import { RequestEnum, ResultEnum } from '../enums/httpEnum.ts';
import { isString, isUnDef, isNull, isEmpty, isFunction } from '../utils/is.ts';
import { setObjToUrlParams } from '../utils/index.ts';
import { apiEnum } from '../enums/messageEnum.ts';
import { joinTimestamp, formatRequestDate } from './helper.ts';
import { AxiosRetry } from './axiosRetry.ts';





/**
 * @description: 数据处理，方便区分多种处理方式
 */

export function transform(transformOpt: transformOptType): AxiosTransform {
  const { Modal, Message, getToken, clearToken, logout, addAjaxErrorInfo, statusMap = {} } = transformOpt
  return {
    /**
     * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
     */
    transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
      const { isTransformResponse, isReturnNativeResponse } = options;
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnNativeResponse) {
        return res;
      }
      // 不进行任何处理，直接返回
      // 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (!isTransformResponse) {
        return res.data;
      }
      // 错误的时候返回

      const { data } = res;
      if (!data) {
        // return '[HTTP] Request has no return value';
        throw new Error(apiEnum.apiRequestFailed);
      }
      //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
      const { code, result, message } = data;

      // 这里逻辑可以根据项目进行修改,响应结果为成功状态
      const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
      if (hasSuccess) {
        let successMsg = message;

        if (isNull(successMsg) || isUnDef(successMsg) || isEmpty(successMsg)) {
          successMsg = apiEnum.operationSuccess;
        }

        if (options.successMessageMode === 'modal') {
          Modal.success(successMsg, apiEnum.successTip);
        } else if (options.successMessageMode === 'message') {
          Message.success({ message: successMsg });
        }
        return result;
      }

      // 在此处根据自己项目的实际情况对不同的code执行不同的操作
      // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
      let timeoutMsg = checkStatus({
        status: code,
        msg: apiEnum.errorTip,
        errorMessageMode: options.errorMessageMode,
        statusMap,
        Modal,
        Message,
        clearToken,
        logout
      });


      throw new Error(timeoutMsg || apiEnum.apiRequestFailed);
    },

    // 请求之前处理config
    beforeRequestHook: (config, options) => {
      const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
      // 默认将prefix 添加到url
      if (joinPrefix) {
        config.url = `${urlPrefix}${config.url}`;
      }
      //拼接请求完整 url
      if (apiUrl && isString(apiUrl)) {
        config.url = `${apiUrl}${config.url}`;
      }
      const params = config.params || {};
      const data = config.data || false;
      // 转换 formatDate 格式
      formatDate && data && !isString(data) && formatRequestDate(data);
      // get 请求方法参数转换
      if (config.method?.toUpperCase() === RequestEnum.GET) {
        if (!isString(params)) {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
        } else {
          // 兼容restful风格
          config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
          config.params = undefined;
        }
      } else {
        if (!isString(params)) {
          formatDate && formatRequestDate(params);
          if (
            Reflect.has(config, 'data') &&
            config.data &&
            (Object.keys(config.data).length > 0 || config.data instanceof FormData)
          ) {
            config.data = data;
            config.params = params;
          } else {
            // 非GET请求如果没有提供data，则将params视为data
            config.data = params;
            config.params = undefined;
          }
          if (joinParamsToUrl) {
            config.url = setObjToUrlParams(
              config.url as string,
              Object.assign({}, config.params, config.data),
            );
          }
        } else {
          // 兼容restful风格
          config.url = config.url + params;
          config.params = undefined;
        }
      }
      return config;
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config, options) => {
      // 请求之前处理config
      let token = null
      if (getToken && isFunction(getToken)) {
        token = getToken();
      }
      if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
        // jwt token
        (config as Recordable).headers.Authorization = options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token;
      }
      return config;
    },

    /**
     * @description: 响应拦截器处理
     */
    responseInterceptors: (res: AxiosResponse<any>) => {
      return res;
    },

    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
      if (addAjaxErrorInfo && isFunction(addAjaxErrorInfo)) {
        addAjaxErrorInfo(error);
      }
      const { response, code, message, config } = error || {};
      const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
      const msg: string = response?.data?.error?.message ?? '';
      const err: string = error?.toString?.() ?? '';
      let errMessage = '';

      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          errMessage = apiEnum.apiTimeoutMessage;
        }
        if (err?.includes('Network Error')) {
          errMessage = apiEnum.networkExceptionMsg;
        }

        if (errMessage) {
          if (errorMessageMode === 'modal') {
            Modal.error(errMessage, apiEnum.errorTip);
          } else if (errorMessageMode === 'message') {
            Message.error({ message: errMessage });
          }
          return Promise.reject(error);
        }
      } catch (error) {
        throw new Error(error as unknown as string);
      }

      checkStatus({
        status: error?.response?.status,
        msg,
        errorMessageMode,
        statusMap,
        Modal,
        Message,
        clearToken,
        logout
      });

      // 添加自动重试机制 保险起见 只针对GET请求
      const retryRequest = new AxiosRetry();
      const { isOpenRetry } = config.requestOptions.retryRequest;
      config.method?.toUpperCase() === RequestEnum.GET &&
        isOpenRetry &&
        // @ts-ignore
        retryRequest.retry(axiosInstance, error);
      return Promise.reject(error);
    },
  };

}

