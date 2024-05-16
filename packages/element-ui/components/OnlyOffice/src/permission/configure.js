/**
 * ==================================================
 *      onlyoffice 权限列表
 * ==================================================
 */
/**
 * onlyoffice 默认权限
 * @returns
 */
export const getDefaultPermissions = (isEdit = false) => {
  return {
    // 权限控制
    comment: true, // 评论
    copy: isEdit, // 是否可以复制, 编辑状态下可以复制
    download: isEdit, // 是否可以下载, 编辑状态下可以复制
    modifyContentControl: true,
    modifyFilter: true,
    print: isEdit,
    save: isEdit,
    changeHistory: isEdit, // 通过单击版本历史记录中的 恢复 按钮来恢复文件版本
    edit: isEdit, // 是否可以编辑: 只能查看，传false
    callbackUrl: isEdit,
    autosave: isEdit, // 是否自动保存
    chat: isEdit,
    comments: isEdit
  }
}


