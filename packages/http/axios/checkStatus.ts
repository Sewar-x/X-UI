import type { checkStatusOptType } from '../types/axios';
import { apiEnum } from '../enums/messageEnum';
import { deepMerge } from '../utils/index.ts';
import { isFunction } from '../utils/is';


/**
 * 
 * @param status 响应状态码
 * @param msg 提示消息
 * @param errorMessageMode 错误模态提示
 * @param statusMap 响应状态消息和回调 map
 */
export function checkStatus(opt: checkStatusOptType): string {
  const { status, msg, errorMessageMode = 'message', statusMap = {}, Message, Modal, clearToken, logout } = opt;
  const statusDefaultMap = {
    "-1": {
      msg,
    },
    0: {
      msg,
    },
    400: {
      msg,
    },
    401: {
      msg: apiEnum.errMsg401,
      callback: () => {
        if (clearToken && isFunction(clearToken)) {
          clearToken();
        }
        if (logout && isFunction(logout)) {
          logout();
        }
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

  const statusMaps = deepMerge(statusDefaultMap, statusMap || {})


  const err = statusMaps[status]

  if (err) {
    if (errorMessageMode === 'modal') {
      Modal.error(err.msg, apiEnum.errorTip);
    } else if (errorMessageMode === 'message') {
      Message.error({ message: err.msg, key: `global_error_message_status_${status}` });
    }

    const callback = err.callback
    if (callback && isFunction(callback)) {
      callback()
    }
  } else {
    Modal.error('未定义的状态码！', '未定义的状态码！');
  }
  return err?.msg
}
