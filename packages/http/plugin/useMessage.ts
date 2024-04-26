/**
 * 消息提示框，待完善...
 *  
 */

function Message() {
  return {
    success: (msg: string) => alert(`${msg} 成功`),
    error: (msg: string) => alert(`${msg} 失败`),
  }

}

function notification(msg: string) {
  return alert(msg)
}

function createConfirm(msg: string) {
  return alert(msg)
}

function createSuccessModal({ title, content }: { title: string, content: string }) {
  return alert(title)
}

function createErrorModal({ title, content }: { title: string, content: string }) {
  return alert(title)
}

function createInfoModal({ title, content }: { title: string, content: string }) {
  return alert(title)
}


function createWarningModal({ title, content }: { title: string, content: string }) {
  return alert(title)
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: Message(),
    notification: notification,
    createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}