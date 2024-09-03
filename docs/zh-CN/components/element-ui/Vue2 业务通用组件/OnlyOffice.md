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
     <XOnlyOffice v-bind="$attrs" v-on="$listeners" />
   </template>
   <script>
   import {
     XOnlyOffice,
     init,
     // opendByOnlyOffice,
     permissions,
   } from "sewen-ui/packages/element-ui/dist/index.es.js";
   export default {
     name: "OnlyOffice",
     components: { XOnlyOffice },
     beforeCreate() {
       init({
         siteUrl: "http://siteUrl", // 当前部署站点地址
         onlyofficeService: "http://onlyofficeService", // onlyoffice 服务地址
         documentService: "http://documentService", // 文档编辑回调地址
         documentServiceApi: "http://documentServiceApi", // 文档 api 地址
         documentServiceConvert: "http://documentServiceConvert", // 文档格式转换服务
         documentServiceCallbackOnlie: "http://documentServiceCallbackOnlie", // 在线编辑文档回调地址
         onlyofficeJwtEncode: () => {
           console.log("===onlyofficeJwtEncode===");
         }, //onlyoffice 文件加密 api, 返回文件 Token
         onlyofficeHistory: () => {
           console.log("===onlyofficeHistory===");
         }, // 文档历史修改记录  api
       });
    
       console.log("=======permissions===", permissions);
     },
   };
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
   import {opendByOnlyOffice,permissions} from  "sewen-ui/packages/element-ui/dist/index.es.js";
   // 文档权限配置
   const onlyOfficePermissions = {
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
   permissions.setPermissions({
       id: '文件id',
       permissions:onlyOfficePermissions,
   });
   
   // 通过 onlyoffice 打开文档
   opendByOnlyOffice({
       url: '文档 url',
       name: '查看文档的用户名称',
       callbackUrl:'保存文档回调地址',
       attachment_id: '文档id',
       routeQuery: { // 路由参数
          
       },
       permissions: onlyOfficePermissions // 也可以在打开文档时直接传入文档文档权限
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

### 方法

| 方法              | 描述                                                       | 参数                                                         | 返回值 |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| init              | 初始化 OnlyOffice                                          | 对象，对象包含以下值                                         |        |
|                   |                                                            | siteUrl   // 当前部署站点地址                                |        |
|                   |                                                            | onlyofficeService  // onlyoffice 服务地址                    |        |
|                   |                                                            | documentService // 文档编辑回调地址                          |        |
|                   |                                                            | documentServiceApi // 文档 api 地址                          |        |
|                   |                                                            | documentServiceConvert // 文档格式转换服务                   |        |
|                   |                                                            | documentServiceCallbackOnlie  // 在线编辑文档回调地址        |        |
|                   |                                                            | onlyofficeJwtEncode  //onlyoffice 文件加密 api, 返回文件 Token |        |
|                   |                                                            | onlyofficeHistory   // 文档历史修改记录  api                 |        |
| permissions       | 文档权限配置对象,包含getPermissions 和 setPermissions 方法 |                                                              |        |
|                   | getPermissions 获取文档权限                                | id // 文档 id                                                |        |
|                   | setPermissions 设置文档权限                                | { id: 文档id permissions: 权限对象 }                         |        |
| opendByOnlyOffice | 使用 OnlyOffice 打开文档                                   |                                                              |        |
|                   |                                                            |                                                              |        |



### 全局变量

在调用 `initOnlyOffice` 方法后，会将 OnlyOffice 配置自动注入 Vue 全局变量中：

```javascript
 Vue.prototype.$onlyoffice = {
  	siteUrl, // 当前部署站点地址
    onlyofficeService, // onlyoffice 服务地址
    documentService, // 文档编辑回调地址
    documentServiceApi, // 文档 api 地址
    documentServiceConvert, // 文档格式转换服务
    documentServiceCallbackOnlie,// 在线编辑文档回调地址
 }
```

