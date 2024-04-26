import type { ErrorMessageMode } from '../types/axios';
import { useMessage } from '../plugin/useMessage';
import { apiEnum } from '../enums/messageEnum';
import { setToken, logout } from '../plugin/user';
import { isEmpty } from '../utils/is';
const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;

/**
 * 
 * @param status 响应状态码
 * @param msg 提示消息
 * @param errorMessageMode 错误模态提示
 * @param statusMap 响应状态消息和回调 map
 */
export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
  statusMap: Record<number, any> = {},
): void {
  const statusDefaultMap = {
    400: {
      msg: msg,
    },
    401: {
      msg: msg || apiEnum.errMsg401,
      callback: () => {
        setToken('');
        logout();
      }
    },
    403: {
      msg: apiEnum.errMsg403,
    },
    404: {
      msg: apiEnum.errMsg404,
    },
    405: {
      msg: apiEnum.errMsg405,
    },
    408: {
      msg: apiEnum.errMsg408,
    },
    500: {
      msg: apiEnum.errMsg500,
    },
    501: {
      msg: apiEnum.errMsg501,
    },
    502: {
      msg: apiEnum.errMsg502,
    },
    503: {
      msg: apiEnum.errMsg503,
    },
    504: {
      msg: apiEnum.errMsg504,
    },
    505: {
      msg: apiEnum.errMsg505,
    }
  }


  const err = isEmpty(statusMap) ? statusDefaultMap[status] : statusMap[status]
  if (err) {
    if (errorMessageMode === 'modal') {
      createErrorModal({
        title: apiEnum.errorTip, content: err.msg
      });
    } else if (errorMessageMode === 'message') {
      error({ content: err.msg, key: `global_error_message_status_${status}` });
    }
  }
}
