/**
 * 消息提示框，待完善...
 *  
 */
import { ElMessageBox, ElMessage } from 'element-plus'


export const Message = {
  success: (options: Object) => ElMessageBox({
    type: 'success',
    ...options,
  }),
  error: (options: Object) => ElMessageBox({
    type: 'error',
    ...options,
  }),
}


export const Modal = {
  success: (options: Object) => ElMessage({
    type: 'success',
    ...options,
  }),
  error: (options: Object) => ElMessage({
    type: 'error',
    ...options,
  }),
}


