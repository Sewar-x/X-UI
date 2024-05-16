# OnlyOffice 

## 什么是 OnlyOffice?

> OnlyOffice 官网：[ONLYOFFICE Api Documentation - Basic concepts](https://api.onlyoffice.com/editors/basic)

[ONLYOFFICE Docs](https://api.onlyoffice.com/editors/getdocs)是一个开源的办公套件，包括文本文档、电子表格、演示文稿和可填写表格的编辑器。 它提供以下功能：

- 创建、编辑和查看文本文档、电子表格、演示文稿和可填写的表格;
- 与其他队友实时协作处理文件。

## 环境

使用 OnlyOffice 需要以下配置：

1. OnlyOffice 服务；
2. OnlyOffice 组件；

此处假设你已经正确搭建 OnlyOffice 服务，主要讲解在 Vue2 中封装的 OnlyOffice 组件。

假如你不知道如何搭建 OnlyOffice 服务，你可以参考：[ONLYOFFICE API文档 - 例](https://api.onlyoffice.com/editors/example/nodejs#security)

## OnlyOffice 组件使用

该 OnlyOffice 组件依赖 Vue-Router，如果你没有安装 Vue-Router，请预先安装 Vue-Router。

1. 创建  OnlyOffice 组件:

   ```vue
   <template>
     <OnlyOffice  v-bind="$attrs" v-on="$listeners"/>
   </template>
   <script>
   import { OnlyOffice } from 'xw-ui/element-ui'
   export default {
     name: 'OnlyOffice',
     components: {OnlyOffice}
   }
   </script>
   ```

   

2. 路由配置中添加 OnlyOffice 组件路由：

   ```javascript
   export default {
     path: 'onlyoffice-viewer',
     name: 'onlyoffice-viewer',
     hidden: true, // 默认隐藏路由，根据你的路由配置决定该字段
     component: () => import('@/components/OnlyOffice/index.vue')
   }
   ```

   

3. 使用 OnlyOffice 打开文件：

   ```javascript
   import {opendFileByOnlyOffice,onlyOfficePermissions} from 'xw-ui/element-ui/OnlyOffice'
   // 文档权限配置
   const permissions =  permissions: {
           // 权限控制
           comment: true, // 评论
           copy: true, // 是否可以复制, 编辑状态下可以复制
           download: true, // 是否可以下载, 编辑状态下可以复制
           modifyContentControl: true,
           modifyFilter: true, 
           print: true, // 是否可以打印文档
           save: true, // 是否可以保存文档
           changeHistory: true, // 通过单击版本历史记录中的 恢复 按钮来恢复文件版本
           edit: true, // 是否可以编辑: 只能查看，传false
           callbackUrl: true,
           autosave: true, // 是否自动保存
           chat: true, // 是否可以在 Onlyoffice 在聊天
           comments: true// 是否可以评论
       },
           
   // 可以单独设置文档权限
   onlyOfficePermissions.setPermissions({
       id: '文件id',
       permissions,
   });
   
   // 通过 onlyoffice 打开文档
   opendFileByOnlyOffice({
       url: '文档 url',
       name: '查看文档的用户名称',
       callbackUrl:'保存文档回调地址',
       attachment_id: '文档id',
       routeQuery: { // 路由参数
          
       },
       permissions: permissions // 也可以在打开文档时直接传入文档文档权限
   })
   ```





## OnlyOffice 组件参数

### ` <OnlyOffice />` 组件属性

| 属性                | 描述                                            | 类型             |
| ------------------- | ----------------------------------------------- | ---------------- |
| `fileOption` (必填) | 文档配置选项                                    | object           |
| `convertTo`(可选)   | 文档转换格式： pdf、xls                         | string           |
| `uid`(必填)         | 查看文档的用户id (用于协同编辑和显示用户信息)   | string 或 number |
| `userName`(必填)    | 查看文档的用户名称 (用于协同编辑和显示用户信息) | string           |

**fileOption 属性**

| 属性                    | 描述                       | 类型   |
| ----------------------- | -------------------------- | ------ |
| url （必填）            | 文档 url                   | string |
| title  （必填）         | 文档标题                   | string |
| callbackUrl  （必填）   | 编辑word后保存时回调的地址 | string |
| attachment_id  （必填） | 文档id,                    | number |

