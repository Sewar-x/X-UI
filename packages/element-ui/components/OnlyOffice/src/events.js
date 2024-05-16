import { getHistory } from './request'

export default class OnlyOfficeEvents {
  constructor(configures = null) {
    this.configures = configures
    this.history = []
    this.onRequestHistory = this.onRequestHistory.bind(this)
    this.onRequestHistoryData = this.onRequestHistoryData.bind(this)
    this.onRequestRestore = this.onRequestRestore.bind(this)
    this.onAppReady = this.onAppReady.bind(this)
    this.getHistory = this.getHistory.bind(this)
  }

  /**
   * 获取历史记录
   * @param {*} params
   * @returns
   */
  getHistory = async() => {
    if (this.history.length !== 0) return false
    this.history = await getHistory({
      attachment_id: this.configures?.key,
      userId: this.configures?.user?.id
    })
    return this.history
  };

  /**
   *
   */
  onAppReady = async() => {

  };
  /**
   *  获取历史记录事件
   *  注意：要在 onRequestHistory 事件中获取 history 属性，你需要在该事件处理函数中使用箭头函数来保留正确的 this 上下文。箭头函数的 this 上下文不受调用方式的影响，始终指向定义函数时的对象，即 OnlyOfficeEvents 实例。
   * @returns
   */
  onRequestHistory = async() => {
    if (!window.docEditor) {
      console.error('初始化 docEditor 失败!')
      return false
    }
    await this.getHistory()
    window.docEditor.refreshHistory({
      currentVersion: this.history.length + 1,
      history: this.history
    })
  };

  /**
   * 当用户试图点击文档版本历史中的特定文档版本时调用的函数
   * @param {*} event
   * @returns
   */
  onRequestHistoryData = event => {
    if (!window.docEditor) {
      console.error('初始化 docEditor 失败!')
      return false
    }
    const version = event.data
    window.docEditor.setHistoryData(this.history[version - 1])
  };

  /**
   * 当用户试图通过单击版本历史记录中的 恢复 按钮来恢复文件版本时调用的函数
   * @param {*} event
   */
  onRequestRestore = event => {
  };
}
