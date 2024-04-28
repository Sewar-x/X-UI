export class Message {
  constructor(options = {}) {
    this.options = options;
    this.messageInstance = null;
    this.createMessage();
  }

  createMessage() {
    const { type, message, duration = 3000, showClose = false, onClose } = this.options;

    // 创建消息容器
    const messageEl = document.createElement('div');
    messageEl.classList.add('xw-ui-http-message', `xw-ui-http-message__${type || 'info'}`, 'xw-ui-http-message--info');

    if (showClose) {
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('xw-ui-http-message__close-btn');
      closeBtn.textContent = '×';
      closeBtn.onclick = () => this.close();
      messageEl.appendChild(closeBtn);
    }

    // 插入消息内容
    if (typeof message === 'string') {
      messageEl.textContent = message;
    } else if (typeof message === 'function') {
      messageEl.appendChild(message());
    }

    // 将消息容器添加到页面中
    document.body.appendChild(messageEl);

    // 设置消息消失的定时器
    if (duration > 0) {
      this.timeout = setTimeout(() => this.close(), duration);
    }

    // 绑定关闭事件
    if (onClose) {
      this.onClose = onClose;
    }

    this.messageInstance = messageEl;
  }

  close() {
    if (this.messageInstance) {
      this.messageInstance.remove();
      this.messageInstance = null;
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.onClose) {
      this.onClose();
    }
  }

  // 静态方法，用于创建不同类型的消息
  static create(options) {
    return new Message(options);
  }

  // 预定义不同类型的消息
  static success(options) {
    return this.create({ ...options, type: 'success' });
  }

  static error(options) {
    return this.create({ ...options, type: 'error' });
  }

  static warning(options) {
    return this.create({ ...options, type: 'warning' });
  }

  static info(options) {
    return this.create({ ...options, type: 'info' });
  }

  // 关闭所有消息的实例
  static closeAll() {
    document.querySelectorAll('.xw-ui-http-message').forEach(messageEl => {
      messageEl.remove();
    });
  }
}

/**
 * 
 * 
// 显示一个成功的消息
Message.success({ message: 'This is a success message' });

// 显示一个错误的消息，并在 5 秒后消失
Message.error({ message: 'This is an error message', duration: 5000 });

// 关闭所有消息
Message.closeAll();
 */