import type { checkStatusOptType } from '../types/axios';
import { apiEnum } from '../enums/messageEnum';
import { logout } from '../plugin/user';
import { setToken } from '../plugin/auth';
import { deepMerge } from '../utils/index.ts';


/**
 * 
 * @param status 响应状态码
 * @param msg 提示消息
 * @param errorMessageMode 错误模态提示
 * @param statusMap 响应状态消息和回调 map
 */
export function checkStatus(opt: checkStatusOptType): void {
  const { status, msg, errorMessageMode = 'message', statusMap = {}, Message, Modal } = opt;
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

  const statusMaps = deepMerge(statusDefaultMap, statusMap || {})


  const err = statusMaps[status]
  if (err) {
    if (errorMessageMode === 'modal') {
      Modal.error({
        title: apiEnum.errorTip, content: err.msg
      });
    } else if (errorMessageMode === 'message') {
      Message.error({ content: err.msg, key: `global_error_message_status_${status}` });
    }
  }
}
