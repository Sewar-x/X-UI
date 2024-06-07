import type { TokenKeyOptions } from "@/types/token"; // 确保类型名称与导入的类型匹配  
import globalState from '@/utils/GlobalState';

// 提供一个函数来设置key值  
export function setKeys(keyOptions: TokenKeyOptions) {
  // 创建一个对象来存储key值，这样我们可以动态地修改它们，也可以使用默认值  
  const {
    TOKEN_KEY = '_TOKEN__',
    SSO_TOKEN_KEYS = [],
  } = keyOptions
  globalState.setState("TOKEN_KEY", TOKEN_KEY);
  globalState.setState("SSO_TOKEN_KEYS", SSO_TOKEN_KEYS);
}



