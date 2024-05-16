import { onlyofficeHistory, onlyofficeJwtEncode } from './api'
/**
 * 生成 onlyoffice token
 * @param {*} config 生成 token 的 hash 值
 * @returns
 */
export async function getOnlyofficeToken(config) {
  let token = null
  try {
    const { data } = await onlyofficeJwtEncode(config)
    token = data.token
  } catch (err) {
    alert('onlyoffice 生成失败！请联系系统管理员 ')
  }
  return token
}

/**
 * 获取历史记录
 * @param {*} param0
 * @returns
 */
export async function getHistory({ attachment_id, userId }) {
  let history = []
  try {
    const { data } = await onlyofficeHistory({
      attachment_id,
      userId
    })
    history = data
  } catch (err) {
    console.log('获取文档历史记录失败!')
  }
  return history
}
