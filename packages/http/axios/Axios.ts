import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { RequestOptions, Result, UploadFileParams } from '../types/axios';
import type { CreateAxiosOptions } from './axiosTransform';
import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '../utils/is';
import { cloneDeep } from 'lodash-es';
import { ContentTypeEnum } from '../enums/httpEnum';
import { RequestEnum } from '../enums/httpEnum';

export * from './axiosTransform';

/**
 * @description:  axios module
 */
export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: Interceptor configuration 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    // 创建取消请求对象，用于忽略重复请求
    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      //从 config.requestOptions 中获取 ignoreCancelToken 属性，如果存在则将其赋值给 ignoreCancel，否则从 this.options.requestOptions 中获取 ignoreCancelToken 属性
      // @ts-ignore
      const { ignoreCancelToken } = config.requestOptions;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;
      //判断 ignoreCancel 是否为 true，如果不是，则将当前请求添加到 axiosCanceler 的 pending 列表中。
      //这样，当请求被取消时，axiosCanceler 可以正确地从 pending 列表中移除该请求
      !ignoreCancel && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      //检查响应是否为null，如果不是，则从axiosCanceler中移除相应的请求。
      //这是因为当请求被取消时，axios会自动从axiosCanceler中移除相应的请求。
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        // @ts-ignore
        return responseInterceptorsCatch(this.axiosInstance, error);
      });
  }

  /**
   * @description: 文件上传方法
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
    });
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  /**
   * @description: get 请求
   * @param config 
   * @param options 
   * @returns 
   */
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  /**
   * @description: post 请求
   * @param config 
   * @param options 
   * @returns 
   */
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  /**
   * @description: put 请求 
   * @param config 
   * @param options 
   * @returns 
   */
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  /**
   * @description: delete 请求
   * @param config 
   * @param options 
   * @returns 
   */
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  /**
   * @description: 请求方法 
   * @param config 
   * @param options 
   * @returns 
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);
    // 请求前转换钩子、请求错误捕获钩子、结果响应钩子
    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
