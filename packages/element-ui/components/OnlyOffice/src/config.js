import { randomString, handleDocType, getFileType, paramsCheck } from './utils.js'
import { getOnlyofficeToken, getHistory } from './request'
import OnlyOfficeEvents from './events.js'
import onlyOfficePermissions from './permission/permission.js'
import { onlyofficeGlobalvar } from './settings.js'
const OnlyOfficeSetting = onlyofficeGlobalvar.setting



/**
 * 获取文档配置信息
 * 文档配置项：https://api.onlyoffice.com/editors/advanced
 * @param title {*} 文档标题
 * @param url {*} 文档连接
 * @param callbackUrl {*} 文档编辑回调
 * @returns
 */
export async function getEditorConfigure(options) {
  // 参数合法检查
  if (!paramsCheck(options)) {
    console.error('配置参数错误！！')
    return {}
  }
  const {
    title = null,
    url = null,
    callbackUrl = null,
    attachment_id = null,
    user = {} // 用户信息
  } = options

  // 获取文件权限
  const permissions = onlyOfficePermissions.getPermissions(attachment_id)

  // 在线编辑回调，根据传入的 callbackUrl 是否包含文档站点地址，不包含自动拼接
  const onlineCallback = callbackUrl
    ? callbackUrl.match(OnlyOfficeSetting.SITE_URL)
      ? callbackUrl
      : `${OnlyOfficeSetting.SITE_URL}/${callbackUrl}`
    : `${OnlyOfficeSetting.SITE_URL}${OnlyOfficeSetting.DOCUMENT_SERVER_CALLBACKURL_ONLINE}`

  const documentUrl = documentUrl ? (documentUrl.match(OnlyOfficeSetting.SITE_URL) ? documentUrl : `${OnlyOfficeSetting.SITE_URL}${url}`) : null
  // onlyoffice 回调参数地址
  const onlineCallbackParams = `${onlineCallback}?attachment_id=${attachment_id}&userId=${user?.id}`

  // 文件类型
  const filetype = getFileType(url)
  // 文档转换类型
  const documentType = handleDocType(filetype) || filetype

  // 协同编辑需要相同 id,编辑状态下使用 附件id作为 key，查看状态下使用随机值
  const documentKey = permissions.edit
    ? `${attachment_id}` || randomString(10)
    : randomString(10)

  // 文档配置对象
  const configure = {
    type: null,
    documentType,
    token: null,
    document: {
      async: false,
      outputtype: filetype,
      url: documentUrl,
      filetype,
      key: documentKey, // 协同编辑需要相同 id,编辑状态下使用 附件id作为 key，查看状态下使用随机值
      title,
      permissions: permissions
    },
    editorConfig: {
      canUseHistory: true,
      callbackUrl: permissions.callbackUrl ? onlineCallbackParams : null, // "编辑word后保存时回调的地址,默认使用
      customization: {
        autosave: permissions.autosave, // 是否自动保存
        chat: permissions.chat,
        comments: permissions.comments,
        help: false,
        hideRightMenu: false, // 定义在第一次加载时是显示还是隐藏右侧菜单。 默认值为false
        spellcheck: true // 拼写检查,
      },
      user: {
        // 当前用户信息，协同编辑需要使用用户信息
        id: user?.id,
        name: user?.name
      }
    },
    width: '100%',
    height: window?.innerHeight ? `${window?.innerHeight}px` : '1000px',
    events: new OnlyOfficeEvents({
      key: documentKey,
      user: user,
      url: documentUrl
    })
  }

  // 获取历史记录
  const history = await getHistory({
    attachment_id: attachment_id,
    userId: user?.id
  })
  if (history && history[0]) {
    configure.document.key = history[0].key
    configure.document.url = `${OnlyOfficeSetting.SITE_URL}${OnlyOfficeSetting.DOCUMENT_SERVER}${history[0].url}`
  }
  // 注意： 生成 token 参数为整个配置对象！！，服务端在生成 token 方法 jwtEncode 中需要将密钥加入 密钥配置中， Node.js 服务端参考 Node.js 示例，示例 参考： https://juejin.cn/post/7195426970749337660
  configure.token = await getOnlyofficeToken(configure)
  return configure
}

export default {
  // 文档 api 地址
  DOCUMENT_SERVER_API: OnlyOfficeSetting.DOCUMENT_SERVER_API,
  // 文档格式转换服务
  DOCUMENT_SERVER_CONVERTSERVICE: OnlyOfficeSetting.DOCUMENT_SERVER_CONVERTSERVICE,
  // 在线编辑文档回调地址
  DOCUMENT_SERVER_CALLBACKURL_ONLINE: OnlyOfficeSetting.DOCUMENT_SERVER_CALLBACKURL_ONLINE,
  getEditorConfigure,
  getOnlyofficeToken
}
