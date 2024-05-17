function setCookie(name, value, options = {}) {
  options = {
    expires: 7, // 默认过期时间为7天  
    path: '/', // 默认路径为根目录  
    domain: '', // 默认为空，表示当前域名  
    secure: false, // 默认为非安全连接  
    ...options // 允许覆盖默认选项  
  };

  if (options.expires) {
    const date = new Date();
    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); // 将天数转换为毫秒  
    options.expires = date.toUTCString();
  }

  let cookieString = `${name}=${value}`;

  for (let optionKey in options) {
    if (options.hasOwnProperty(optionKey) && optionKey !== 'expires') {
      cookieString += `; ${optionKey}=${options[optionKey]}`;
    }
  }

  if (options.expires) {
    cookieString += `; expires=${options.expires}`;
  }

  document.cookie = cookieString;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
}

function deleteAllCookies() {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  }
}

export default class LocalStorageWrapper {
  type = null;

  constructor(type) {
    //'localStorage' | 'sessionStorage' | 'cookie'
    this.type = type;
  }

  setItem(key, value, expires) {
    if ((value !== null || value != undefined) && typeof value === 'object') {
      value = JSON.stringify(value)
    }
    switch (this.type) {
      case 'localStorage':
        window.localStorage.setItem(key, value);
        break;
      case 'sessionStorage':
        window.sessionStorage.setItem(key, value);
        break;
      case 'cookie':
        setCookie(key, value, { expires: expires });
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  getItem(key) {
    let result = null
    let value = null
    switch (this.type) {
      case 'localStorage':
        value = window.localStorage.getItem(key);
        break;
      case 'sessionStorage':
        value = window.sessionStorage.getItem(key);
        break;
      case 'cookie':
        value = getCookie(key);
        break;
      default:
        value = null
    }


    try {
      if (value) {
        result = JSON.parse(value)
      }
    } catch (e) {
      result = value
    }
    return result
  }

  removeItem(key) {
    switch (this.type) {
      case 'localStorage':
        window.localStorage.removeItem(key);
        break;
      case 'sessionStorage':
        window.sessionStorage.removeItem(key);
        break;
      case 'cookie':
        deleteCookie(key);
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  clear() {
    switch (this.type) {
      case 'localStorage':
        window.localStorage.clear();
        break;
      case 'sessionStorage':
        window.sessionStorage.clear();
        break;
      case 'cookie':
        // 对于 cookie，js-cookie 没有直接提供 clear 方法，需要遍历并删除  
        deleteAllCookies()
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }
}

// 使用示例  
/**
const localStorageWrapper = new LocalStorageWrapper('localStorage');  
localStorageWrapper.setItem('key', 'value');  
console.log(localStorageWrapper.getItem('key')); // 输出: value  
localStorageWrapper.removeItem('key');  
  
const sessionStorageWrapper = new LocalStorageWrapper('sessionStorage');  
sessionStorageWrapper.setItem('key', 'value');  
console.log(sessionStorageWrapper.getItem('key')); // 输出: value  
sessionStorageWrapper.removeItem('key');  
  
const cookieWrapper = new LocalStorageWrapper('cookie');  
cookieWrapper.setItem('key', 'value', 7); // 过期时间为 7 天  
console.log(cookieWrapper.getItem('key')); // 输出: value  
cookieWrapper.removeItem('key');
 */
