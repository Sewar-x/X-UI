import { defineStore } from "pinia";
import Storage from "@/utils/storage";
import { store } from "@/store";
import { getToken, setToken, removeToken, getSSOToken } from "@/utils/token";
import { authorityType, TokenType } from "@/types/token";
import globalState from '@/utils/GlobalState';
import { isFunction } from "@/utils/index"
interface UserState {
  authority: authorityType, // 用户所有权限
  token?: string | undefined | null,
  expire?: string | undefined | null,
  oa?: {
    ticketName?: string | undefined | null,
    ticketValue?: string | undefined | null,
  },

}

export const useUserStore = defineStore({
  id: "user-store",

  state: ():
    UserState => ({
      authority: {
        menuNames: [],  // 菜单权限名称列表，取路由表中的 name 字段
        rule: [], // 按钮级别权限
      },
      // token
      token: undefined,
      expire: undefined, // token 过期时间
      oa: {
        ticketName: null, // oa token key
        ticketValue: null // oa token value
      }
    }),

  getters: {
    // 获取 token
    getToken(): string {
      return getToken();
    },
    // 获取所有权限
    getAuthority(): authorityType {
      // @ts-ignore
      return this.authority || {
        menuNames: [],  // 菜单权限名称列表，取路由表中的 name 字段
        rule: [], // 按钮级别权限
      };
    }
  },

  actions: {
    // 设置 token
    SetToken(data: TokenType) {
      const {
        oa = { ticketName: null, ticketValue: null },
        token = null
      } = data;
      // @ts-ignore
      this.token = token || ''; // for null or undefined value
      // @ts-ignore
      this.oa = oa || { ticketName: null, ticketValue: null };
      setToken(token);
      // 存储 oa token
      if (oa.ticketName) {
        const storageType = globalState.getState('storageType')
        const storage = new Storage(storageType);
        storage.setItem(oa.ticketName, oa.ticketValue as string);
      }
    },

    // 设置用户所有权限列表
    SetAuthority(authority: authorityType) {
      // @ts-ignore
      this.authority.menuNames = authority.menuNames
      // @ts-ignore
      this.authority.rule = authority.rule
    },

    // 获取用户权限列表
    async GetAuthority(): Promise<any> {
      try {
        const getAuthList = globalState.getState('getAuthList')
        if (!isFunction(getAuthList)) {
          return Error("getAuthList 参数错误")
        }
        const authority: authorityType = {
          menuNames: [], // 菜单权限名称列表
          rule: [],// 按钮级别权限
        }
        /**
         *请求获取路由权限列表，返回对象：
         {
            menuNames: [], // 菜单权限名称列表
            rule: [],// 按钮级别权限
         }
         */
        const token  = getToken()
        if(!token){
          return Error("token 不存在！ ")
        }
        const data = await getAuthList({token})
        authority.menuNames = data.menuNames
        authority.rule = data.rule
        this.SetAuthority(authority);
        return authority
      } catch (error) {
        // @ts-ignore
        this.ClearLocal();
        return null;
      }
    },

    // 使用 oa token 登录系统
    async checkSSOLogin(): Promise<any> {
      const domain = globalState.getState('domain')
      const checkSSOLogin = globalState.getState('checkSSOLogin')
      // @ts-ignore
      const { key, oaToken } = getSSOToken(domain);
      if (!oaToken) return false;
      try {
        // @ts-ignore
        if (!isFunction(checkSSOLogin)) {
          return Error("checkSSOLogin 参数错误")
        }
        /**
         * checkSSOLogin 接口使用 oa token 换取当前系统 token
         * @params { string } ticketName:  oa token key
         * @params { string } ticketValue:  oa token 
         * @returns { token: string } 返回对象：token: 当前系统token
         */
        const data = await checkSSOLogin({
          ticketName: key,
          ticketValue: oaToken
        })
        setToken(data.token)
        return data;
      } catch (error) {
        this.Logout();
      }
    },

    // 退出
    async Logout() {
      try {
        const logout = globalState.getState('logout')
        if (!isFunction(logout)) {
          return Error("logout 参数错误")
        }
        /**
         * checkSSOLogin 接口使用 oa token 换取当前系统 token
         * @params { string } ticketName:  oa token key
         * @params { string } ticketValue:  oa token 
         * @returns { token: string } 返回对象：token: 当前系统token
         */
        await logout({
          token: getToken()
        })
      } catch (error) {
        console.error(error);
      } finally {
        this.ClearLocal();
        location.hash = '/'
      }
    },

    //清空存储数据
    ClearLocal() {
      const domain = globalState.getState('domain')
      // @ts-ignore
      removeToken(domain);
      Storage.clearAll();
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store)
}
