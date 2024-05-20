import Vue from 'vue';
import { OnlyOfficeSetting, onlyofficeGlobalvar } from './settings'

/**
 * 初始化 onlyoffice 
 */
export function initOnlyOffice({
  siteUrl = null, // 当前部署站点地址
  onlyofficeService = null, // onlyoffice 服务地址
  documentService = null, // 文档编辑回调地址
  documentServiceApi = null, // 文档 api 地址
  documentServiceConvert = null, // 文档格式转换服务
  documentServiceCallbackOnlie = null,// 在线编辑文档回调地址
  onlyofficeJwtEncode = null, //onlyoffice 文件加密 api, 返回文件 Token
  onlyofficeHistory = null // 文档历史修改记录  api
}) {
  // 初始化 Onlyoffice 配置
  const SetInst = new OnlyOfficeSetting({
    siteUrl, // 当前部署站点地址
    onlyofficeService, // onlyoffice 服务地址
    documentService, // 文档编辑回调地址
    documentServiceApi, // 文档 api 地址
    documentServiceConvert, // 文档格式转换服务
    documentServiceCallbackOnlie,// 在线编辑文档回调地址
  })
  // Onlyoffice 配置保存到全局变量
  onlyofficeGlobalvar.setting = SetInst.getValue()
  // api 保存到全局变量
  onlyofficeGlobalvar.api = {
    onlyofficeJwtEncode, //onlyoffice 文件加密 api, 返回文件 Token
    onlyofficeHistory // 文档历史修改记录  api
  }
  Vue.prototype.$onlyoffice = {
    onlyofficeJwtEncode, //onlyoffice 文件加密 api, 返回文件 Token
    onlyofficeHistory // 文档历史修改记录  api
  }
}