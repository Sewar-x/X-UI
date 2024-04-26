import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFunction } from '../utils/is';

// Used to store the identification and cancellation function of each request
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');
/**
 * AxiosCanceler类主要用于处理axios请求中的取消操作
 * 当一个请求被取消时，它会从待处理列表中移除该请求。这样可以避免重复发送请求，提高性能。
 */
export class AxiosCanceler {
  /**
   * 将请求添加到待处理列表中
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // If there is no current request in pending, add it
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: 清除所有待处理请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  /**
   * 从待处理列表中移除请求
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: 重置待处理列表
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}

/**
 * =========================================
 * 使用方法如下：

  const axiosCanceler = new AxiosCanceler();
  // 添加请求
  axiosCanceler.addPending({
    method: 'GET',
    url: 'https://api.example.com/data',
  });

  // 发送请求
  axios.get('https://api.example.com/data')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

  // 取消请求
  axiosCanceler.removePending({
    method: 'GET',
    url: 'https://api.example.com/data',
  });
 */