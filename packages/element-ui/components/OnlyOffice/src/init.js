/**
 * 初始化 onlyoffice 
 */
export default function initOnlyOffice({
  siteUrl = null, // 当前部署站点地址
  onlyofficeService = null, // onlyoffice 服务地址
  documentService = null, // 文档编辑回调地址
  documentServiceApi = null, // 文档 api 地址
  documentServiceConvert = null, // 文档格式转换服务
  documentServiceCallbackOnlie = null,// 在线编辑文档回调地址
  onlyofficeJwtEncode = null, //onlyoffice 文件加密 api, 返回文件 Token
  onlyofficeHistory = null // 文档历史修改记录  api
}) {

}