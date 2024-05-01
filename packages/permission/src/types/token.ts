
export interface authorityType {
    menuNames: Array<T>, // 菜单权限名称列表
    rule: Array<T>,// 按钮级别权限
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
    token_key?: string,

    oa_token_keys?: string[],

    locale_key?: string,

    // user info key  
    user_info_key?: string,

    // user authority key  
    user_authority_key?: string,

    // user async route key  
    user_async_route_key?: string
}

export interface StorageOptions {
    type: 'localStorage' | 'sessionStorage' | 'cookie',
    expires?: number | undefined
}