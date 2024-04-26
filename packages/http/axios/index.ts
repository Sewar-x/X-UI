import { Message, Modal } from '../plugin/useMessage.ts';
import { logout } from '../plugin/user.ts';
import { addAjaxErrorInfo } from '../plugin/errorLog.ts';
import { setToken, getToken } from '../plugin/auth.ts';
import { createAxios } from './createAxios';
import { createTransform } from './transform';


const transform = createTransform({
  Message,
  Modal,
  getToken,
  setToken,
  logout,
  addAjaxErrorInfo,
  statusMap: {}
});


export const defHttp = createAxios(transform);