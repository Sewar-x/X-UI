import { useMessage } from '../plugin/useMessage.ts';
import { setToken, logout } from '../plugin/user.ts';
import { addAjaxErrorInfo } from '../plugin/errorLog.ts';
import { getToken } from '../plugin/auth.ts';
import { createAxios } from './createAxios';
import { createTransform } from './transform';


const transform = createTransform({
  useMessage,
  setToken,
  logout,
  addAjaxErrorInfo,
  getToken
});


export const defHttp = createAxios(transform);