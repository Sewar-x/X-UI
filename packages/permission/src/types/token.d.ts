
export interface authorityType {
    menuNames: Array<any>, // 菜单权限名称列表
    rule: Array<any>,// 按钮级别权限
}

export interface TokenType {
    token?: string | undefined | null,
    expire?: string | undefined | null,
    oa?: {
        ticketName?: string | undefined | null,
        ticketValue?: string | undefined | null,
    }
}

export interface TokenKeyOptions {
    // 存储 token key 
    TOKEN_KEY?: string,
    // 存储单点登录 sso token key 
    SSO_TOKEN_KEYS?: string[],
}

export interface StorageOptions {
    storageType: 'localStorage' | 'sessionStorage' | 'cookie',
    expires?: number | undefined
}