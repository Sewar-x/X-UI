import Storage from "@/utils/storage";
import { defineStore } from "pinia";
import { store } from "@/store";
import { getToken, setToken, removeToken, getOAToken } from "@/utils/token";
import storageOptions from "@/utils/storage/setStorage";
import { authorityType, TokenType } from "@/types/token";

interface UserState {
  authority: authorityType, // 用户所有权限
  token?: string | undefined | null,
  expire?: string | undefined | null,
  oa?: {
    ticketName?: string | undefined | null,
    ticketValue?: string | undefined | null,
  }
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
      return this.authority || {};
    }
  },

  actions: {
    SetToken(data: TokenType) {
      const {
        oa = { ticketName: null, ticketValue: null },
        token = null
      } = data;
      this.token = token || ''; // for null or undefined value
      this.oa = oa || { ticketName: null, ticketValue: null };
      setToken(token);
      if (oa.ticketName) {
        const { type } = storageOptions
        const storage = new Storage(type);
        storage.setItem(oa.ticketName, oa.ticketValue as string);
      }
    },
    // 设置用户所有权限列表
    SetAuthority(authority: authorityType) {
      this.authority = authority
    },

    // 获取用户权限列表
    async GetAuthority(getAuthList: Function, domain: string): Promise<T> {
      try {
        if (!getAuthList || typeof getAuthList !== "function") {
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
        const data = await getAuthList({
          token: getToken()
        })
        authority.menuNames = data.menuNames
        authority.rule = data.rule
        this.SetAuthority(authority);
        return authority
      } catch (error) {
        this.ClearLocal(domain);
        return null;
      }
    },

    // 使用 oa token 登录系统
    async CheckOaLogin(checkOaLogin: Function, domain: string) {
      const { key, oaToken } = getOAToken(domain);
      if (!oaToken) return false;
      try {
        if (!checkOaLogin || typeof checkOaLogin !== "function") {
          return Error("checkOaLogin 参数错误")
        }
        /**
         * checkOaLogin 接口使用 oa token 换取当前系统 token
         * @params { string } ticketName:  oa token key
         * @params { string } ticketValue:  oa token 
         * @returns { token: string } 返回对象：token: 当前系统token
         */
        const data = await checkOaLogin({
          ticketName: key,
          ticketValue: oaToken
        })
        setToken(data.token)
        return data;
      } catch (error) {
        this.Logout(domain);
      }
    },

    // 退出
    async Logout(domain: string, logout?: Function) {
      try {
        if (!logout || typeof logout !== "function") {
          return Error("logout 参数错误")
        }
        /**
         * checkOaLogin 接口使用 oa token 换取当前系统 token
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
        this.ClearLocal(domain);
        location.hash = '/login'
      }
    },

    //清空存储数据
    ClearLocal(domain: string) {
      removeToken(domain);
      Storage.clearAll();
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store)
}
