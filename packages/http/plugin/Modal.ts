export class Modal {
  constructor(options) {
    this.options = options;
    this.Modal = this.createModal();
  }

  createModal() {
    const { title, message, type, showCancelButton, showConfirmButton, onClose } = this.options;

    // 创建模态框容器
    const Modal = document.createElement('div');
    Modal.className = 'sewen-ui-http-modal-box fade-in';
    Modal.style.position = 'fixed';
    Modal.style.top = '50%';
    Modal.style.left = '50%';
    Modal.style.transform = 'translate(-50%, -50%)';
    Modal.style.zIndex = 1000;


    // 创建标题容器
    const titleContainer = document.createElement('div');
    
    // 添加类型图标
    if (type) {
      const iconEl = document.createElement('i');
      iconEl.className = `sewen-ui-icon el-icon-${type}`;
      titleContainer.appendChild(iconEl);
    }

    // 创建标题
    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    titleContainer.appendChild(titleEl);
    Modal.appendChild(titleContainer);


    // 创建消息内容
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    Modal.appendChild(messageEl);

    // 创建按钮容器
    const buttonsEl = document.createElement('div');
    buttonsEl.className = 'sewen-ui-http-modal-box__buttons';

    // 取消按钮
    if (showCancelButton) {
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.onclick = () => this.close('cancel');
      buttonsEl.appendChild(cancelButton);
    }

    // 确认按钮
    const confirmButton = document.createElement('button');
    confirmButton.textContent = '确认';
    confirmButton.onclick = () => this.close('confirm');
    buttonsEl.appendChild(confirmButton);

    Modal.appendChild(buttonsEl);


    // 将模态框添加到页面中
    document.body.appendChild(Modal);

    // 锁定滚动
    document.body.style.overflow = 'hidden';

    // 绑定关闭事件
    if (onClose) {
      this.onClose = onClose;
      Modal.className = 'sewen-ui-http-modal-box fade-out';
    }

    return Modal;
  }

  close(action) {
    if (this.Modal) {
      this.Modal.remove();
      this.Modal = null;
    }
    if (this.onClose) {
      this.onClose(action);
    }
    // 恢复滚动
    document.body.style.overflow = 'auto';
  }

  // 静态方法
  static alert(message, title = 'Alert', options = {}) {
    return new Modal({ type: 'alert', message, title, ...options });
  }

  static confirm(message, title = 'Confirm', options = {}) {
    return new Modal({ type: 'confirm', message, title, showCancelButton: true, ...options });
  }

  static prompt(message, title = 'Prompt', options = {}) {
    return new Modal({ type: 'prompt', message, title, showCancelButton: true, ...options });
  }

  // 添加 success、error、info、warning 方法
  static success(message, title, options) {
    return this.alert(message, title, { type: 'success', ...options });
  }

  static error(message, title, options) {
    return this.alert(message, title, { type: 'error', ...options });
  }

  static info(message, title, options) {
    return this.alert(message, title, { type: 'info', ...options });
  }

  static warning(message, title, options) {
    return this.alert(message, title, { type: 'warning', ...options });
  }
}

// 添加一些简单的样式
const style = document.createElement('style');
style.textContent = `
.sewen-ui-http-modal-box {
  border: 1px solid #dcdfe6;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 420px;
  padding: 10px;
  text-align: center;
  transition: opacity 2s ease-in-out;  
}

.sewen-ui-http-modal-box h2 {
  display: inline-block;
  margin: 0 0 0 5px;
  font-size: 16px;
  font-weight: 700;
  color: #303133;
}

.sewen-ui-http-modal-box p {
  font-size: 14px;
  color: #606266;
  word-break: break-all;
}

.sewen-ui-http-modal-box__buttons {
  margin-top: 20px;
  text-align: right;
}

.sewen-ui-http-modal-box__buttons button {
  padding: 5px 12px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.sewen-ui-http-modal-box__buttons button:hover {
  opacity: 0.9;
}

.sewen-ui-icon {
  display: inline-block;
}

.el-icon-success {
  color: #67C23A;
}

.el-icon-error {
  color: #f56c6c;
}

.el-icon-info {
  color: #909399;
}

.el-icon-warning {
  color: #E6A23C;
}

.fade-in {  
  opacity: 1;  
}  
    
.fade-out {  
  opacity: 0;  
}

`;

document.head.appendChild(style);

// 使用示例
/**
Modal.success('This is a success message!', 'Success Title');
Modal.error('This is an error message!', 'Error Title');
Modal.info('This is an info message!', 'Info Title');
Modal.warning('This is a warning message!', 'Warning Title');
 */