
// site url
export const SITE_URL = 'https://example.com'

// onlyoffice 服务地址
export const ONLYOFFICE_SERVICE = 'https://example.com:9009'

// 文档编辑回调地址
export const DOCUMENT_SERVER = {
  production: '/prod',
  test: '/test',
  development: '/dev'
}

// 文档 api 地址
export const DOCUMENT_SERVER_API = `${ONLYOFFICE_SERVICE}/web-apps/apps/api/documents/api.js`
// 文档格式转换服务
export const DOCUMENT_SERVER_CONVERTSERVICE = `${ONLYOFFICE_SERVICE}/ConvertService.ashx`
// 在线编辑文档回调地址
export const DOCUMENT_SERVER_CALLBACKURL_ONLINE = `${DOCUMENT_SERVER}/api/onlineEditCallback`


