/**
 * onlyoffice 文件加密 api, 返回文件 Token
 */

export function onlyofficeJwtEncode() {
  return new Promise((resolve => {
    resolve({
      data: {
        token: 'onlyoffice 文件 token'
      }
    })
  }))
}


/**
 * 文档历史修改记录  api
 * @param {*} attachment_id 
 * @param {*} userId 
 * @returns 
 */
export function onlyofficeHistory(
  attachment_id,
  userId
) {
  return new Promise((resolve => {
    resolve({
      data: []
    })
  }))
}