import type { permissionOptionsType } from "@/types/store"
// GlobalState.ts  
class GlobalState {
    private static instance: GlobalState | null = null;
    private readonly state: permissionOptionsType = {
        routerMode: 'hash', // 路由模式
        publicPath: '', // 公共路径
        whiteList: [],// 路由白名单
        getAuthList: null, // 获取权限列表 api
        checkSSOLogin: null,// 换取 oa token api
        asyncRoutes: [], // 异步路由
        basicRoutes: [], // 基础路由
        logout: null, // 退出登录 api
        domain: null, // cookie 存储域名
        storageType: "cookie",// 本地数据存储类型
        expires: undefined, // 本地数据存储过期时间
        TOKEN_KEY: '_TOKEN__', // token key
        SSO_TOKEN_KEYS: [],// 单点登录 Keys
        homeRoute: '/',
    }; // 或者使用具体的类型，如interface  

    // 私有构造函数，确保外部不能直接通过new创建实例  
    private constructor() { }

    // 获取单例实例  
    public static getInstance(): GlobalState {
        if (!GlobalState.instance || GlobalState.instance == null) {
            GlobalState.instance = new GlobalState();
        }
        return GlobalState.instance;
    }

    // 设置全局状态, 设置单个全局状态 
    public setState(key: keyof permissionOptionsType, value: any): void {
        this.state[key] = value;
    }

    // 一次性设置全局状态  
    public setAllState(initValue: permissionOptionsType): void {
        for (const key in initValue) {
            // @ts-ignore
            // 使用 TypeScript 的类型守卫确保 key 在 this.state 中存在  
            if (key in this.state) {
                // @ts-ignore
                this.state[key] = initValue[key];
            }
        }
    }

    // 获取全局状态  
    public getState(key: keyof permissionOptionsType): any {
        return this.state[key];
    }


}

// 导出单例的getter方法，以便在其他模块中使用  
export default GlobalState.getInstance();

/** 
// 使用示例  
// 在其他模块中  
import globalState from './GlobalState';  

// 设置全局状态  
globalState.setState('username', 'JohnDoe');  

// 获取全局状态  
console.log(globalState.getState('username')); // 输出: JohnDoe  

*/