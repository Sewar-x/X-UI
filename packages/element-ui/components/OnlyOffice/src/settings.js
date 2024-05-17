
import LocalStorageWrapper from './storage'
const localStorageWrapper = new LocalStorageWrapper('localStorage');
const storagePrefix = 'OnlyOffice_' // 本地存储前缀

// 代理对象读写方法
const proxyHandler = {
  get: function (target, propKey, receiver) {
    // 尝试从localStorage中获取值  
    const value = localStorageWrapper.getItem(storagePrefix + propKey);

    // 如果localStorage中没有值，则返回undefined（或可以设置一个默认值）  
    return value !== null ? value : undefined;
  },
  set: function (target, propKey, value, receiver) {
    // 添加的后缀地址
    const postFixMap = {
      DOCUMENT_SERVER_API: '/web-apps/apps/api/documents/api.js',
      DOCUMENT_SERVER_CONVERTSERVICE: `/ConvertService.ashx`,
      DOCUMENT_SERVER_CALLBACKURL_ONLINE: `/api/onlineEditCallback`
    }

    const postFix = postFixMap[propKey]
    if (postFix) {
      // 将值保存到localStorage  
      localStorageWrapper.setItem(storagePrefix + propKey, value + postFix);
    } else {
      // 将值保存到localStorage  
      localStorageWrapper.setItem(storagePrefix + propKey, value);
    }

    // 返回true表示设置成功  
    return true;
  }
}

export class OnlyOfficeSetting {
  constructor({
    siteUrl = null, // 当前部署站点地址
    onlyofficeService = null, // onlyoffice 服务地址
    documentService = null, // 文档编辑回调地址
    documentServiceApi = null, // 文档 api 地址
    documentServiceConvert = null, // 文档格式转换服务
    documentServiceCallbackOnlie = null,// 在线编辑文档回调地址
  }) {
    // 初始化对象结构  
    this.Setting = {
      SITE_URL: siteUrl,
      ONLYOFFICE_SERVICE: onlyofficeService,
      DOCUMENT_SERVER: documentService,
      DOCUMENT_SERVER_API: documentServiceApi,
      DOCUMENT_SERVER_CONVERTSERVICE: documentServiceConvert,
      DOCUMENT_SERVER_CALLBACKURL_ONLINE: documentServiceCallbackOnlie
    };

    // 使用 Proxy 创建代理对象  
    this.proxySetting = new Proxy(this.Setting, proxyHandler);
  }

  // 提供一个方法来获取代理对象（如果需要）  
  getValue() {
    return this.proxySetting;
  }
}

export const onlyofficeGlobalvar = {
  setting: {},
  api: {}
}
