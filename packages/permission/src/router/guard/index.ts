import { createPermissionGuard,reloadHacker } from '@/router/guard/permissionGuard';
import type { permissionOptionsType } from "@/types/store";


// 使用接口作为函数参数的类型 
export async function setupRouterGuard(options: permissionOptionsType) {
    // 在函数体内，可以通过 options 对象来访问传入的参数  
    const { router, Message } = options;
    // 使用参数
    await createPermissionGuard(router, Message)
    reloadHacker()
}
