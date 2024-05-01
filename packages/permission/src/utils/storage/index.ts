
import Cookies from 'js-cookie';

export default class Storage {

  private type: 'localStorage' | 'sessionStorage' | 'cookie';
  constructor(type: 'localStorage' | 'sessionStorage' | 'cookie') {
    this.type = type;
  }

  //获取 Cookies
  getCookies<T>(key: string, params?: object | null): T | null {
    const value = Cookies.get(key, params);
    if (value === undefined) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }
  //设置 Cookies
  setCookies(key: string, value: any, options?: Cookies.CookieAttributes): void {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    return Cookies.set(key, value, options);
  }
  //移除某个Cookies
  removeCookies(key: string, options?: Cookies.CookieAttributes): void {
    Cookies.remove(key, options);
  }
  //清除 Cookies
  clearCookies(): void {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  //存储本地会话数据
  setLocalStorage<T>(k: string, v: T) {
    try {
      window.localStorage.setItem(k, JSON.stringify(v))
    } catch (error) {
      return false
    }
  }
  //获取本地会话数据
  getLocalStorage(k: string) {
    const item = window.localStorage.getItem(k)
    try {
      return item ? JSON.parse(item) : item
    } catch (err) {
      return item
    }
  }
  //移除某个本地会话数据
  removeLocalStorage(name?: string) {
    try {
      return name ? window.localStorage.removeItem(name) : window.localStorage.clear();
    } catch (err) {
      return false
    }
  }
  //清空所有本地会话数据
  clearLocalStorage() {
    try {
      return window.localStorage.clear()
    } catch (err) {
      return false
    }
  }


  //存储临时会话数据
  setSessionStorage<T>(k: string, v: T) {
    try {
      window.sessionStorage.setItem(k, JSON.stringify(v));
    } catch (error) {
      return false
    }
  }
  //获取临时会话数据
  getSessionStorage: (k: string) => any = (k: string) => {
    const item = window.sessionStorage.getItem(k);
    try {
      return item ? JSON.parse(item) : item
    } catch (err) {
      return item
    }
  }
  //移除某个临时会话数据
  removeSessionStorage(name?: string) {
    try {
      return name ? window.sessionStorage.removeItem(name) : window.sessionStorage.clear();
    } catch (err) {
      return false
    }
  }
  //清空所有临时会话数据
  clearSessionStorage() {
    try {
      return window.sessionStorage.clear()
    } catch (err) {
      return false
    }
  }

  setItem(key: string, value: string, options?: Cookies.CookieAttributes): void {
    switch (this.type) {
      case 'localStorage':
        this.setLocalStorage(key, value);
        break;
      case 'sessionStorage':
        this.setSessionStorage(key, value);
        break;
      case 'cookie':
        this.setCookies(key, value, options);
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  getItem(key: string, params?: object | null): string | null {
    switch (this.type) {
      case 'localStorage':
        return this.getLocalStorage(key);
      case 'sessionStorage':
        return this.getSessionStorage(key);
      case 'cookie':
        return this.getCookies(key, params);
      default:
        throw new Error('Invalid storage type');
    }
  }

  removeItem(key: string, options?: Cookies.CookieAttributes): void {
    switch (this.type) {
      case 'localStorage':
        this.removeLocalStorage(key);
        break;
      case 'sessionStorage':
        this.removeSessionStorage(key);
        break;
      case 'cookie':
        this.removeCookies(key, options)
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  clear(): void {
    switch (this.type) {
      case 'localStorage':
        this.clearLocalStorage();
        break;
      case 'sessionStorage':
        this.clearSessionStorage();
        break;
      case 'cookie':
        this.clearCookies();
        break;
      default:
        throw new Error('Invalid storage type');
    }
  }

  // 清除所有
  static clearAll(): void {
    window.localStorage.clear()
    window.sessionStorage.clear()
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }
}


