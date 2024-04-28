# XHTTP

xhttp 模块是基于 [axios](https://www.axios-http.cn/docs/intro) 二次封装，在 axios 的基础上增加了一些适配后台管理系统的功能。

## 功能

> axios 功能参考官方文档：[起步 | Axios中文文档 | Axios中文网 (axios-http.cn)](https://www.axios-http.cn/docs/intro)

xhttp 除了支持 axios 的基础功能之外，封装了以下功能：

* 超时重试；

* 请求成功/错误 消息提示;

* 在请求头 `headers.Authorization` 中默认添加 token;

* 错误清除 token；

* 错误退出登录；

* ajax 错误日志收集；

* 固定接口返回格式；

* 默认状态码检查：

  | 状态码 | 提示文案                                | 操作 |
  | ------ | --------------------------------------- | ---- |
  | 400    | 默认错误，返回服务端返回消息提示        |      |
  | 401    | 用户没有权限（令牌、用户名、密码错误）! |      |
  | 403    | 用户得到授权，但是访问是被禁止的!       |      |
  | 404    | 网络请求错误,未找到该资源!              |      |
  | 405    | 网络请求错误,请求方法未允许!            |      |
  | 408    | 网络请求超时!                           |      |
  | 500    | 服务器错误,请联系管理员!                |      |
  | 501    | 网络未实现!                             |      |
  | 502    | 网络错误!                               |      |
  | 503    | 服务不可用，服务器暂时过载或维护!       |      |
  | 504    | 网络超时!                               |      |
  | 505    | http版本不支持该请求!                   |      |





## 安装



## 使用

### TypeScript

```	typescript
import {createXhttp} from 'xw-ui/xhttp'

const defhttp = createXhttp();

interface AccountInfoModel {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
}

defHttp.post<AccountInfoModel>(
    {
      url: '/acount/post',
      params,
    },
    {
      errorMessageMode: 'modal',
    },
);

defHttp.get<AccountInfoModel>(
    {
      url: '/acount/get',
    },
    {
      errorMessageMode: 'none',
    },
);

```



## 参数

`createXhttp(transformOpt: transformOptType, axiosOpt: Partial<CreateAxiosOptions>) ` 方法参数

### transformOpt 参数

| 参数                       | 功能                      | 类型                                           | 默认值         |
| -------------------------- | ------------------------- | ---------------------------------------------- | -------------- |
| `Message`（可选）          | 消息提示组件              | `Fcuntion`                                     |                |
| `Modal`（可选）            | 模态弹窗提示组件          | `Fcuntion`                                     |                |
| `tokenKey`（可选）         | 登录 token Key 值         | `string`                                       | `Bearer`       |
| `tokenExpires`（可选）     | 登录 token 过期时间       | `number`                                       | 7 天           |
| `storageType`（可选）      | token 存储类型            | `localStorage` 或 `sessionStorage` 或 `cookie` | `localStorage` |
| `getToken`（可选）         | 获取 token 方法           | `Function`                                     |                |
| `setToken`（可选）         | 设置 token 方法           | `Function`                                     |                |
| `logout`（可选）           | 退出登录方法              | `Function`                                     |                |
| `addAjaxErrorInfo`（可选） | 添加 ajax 错误日志方法    | `Function`                                     |                |
| `statusMap`（可选）        | 状态码和处理方法 map 对象 | ` Record<number, any>`                         |                |



### axiosOpt 参数

| 参数                                      | 功能                                                | 类型 | 默认值                                                       |
| ----------------------------------------- | --------------------------------------------------- | ---- | ------------------------------------------------------------ |
| axios 配置                                |                                                     |      |                                                              |
| `authenticationScheme`                    | HTTP 验证                                           |      | authentication schemes，e.g: Bearer <br />authenticationScheme: 'Bearer', |
| `timeout`                                 | 接口超时等待时间                                    |      | 10 * 1000                                                    |
| `headers`                                 | http 头参数                                         |      | `{ 'Content-Type': ContentTypeEnum.JSON }`<br />   如果是form-data格式： <br />`{ 'Content-Type': ContentTypeEnum.FORM_URLENCODED }` |
| `transform`                               | 数据处理方式                                        |      |                                                              |
| `requestOptions`                          | 请求选项                                            |      |                                                              |
| `requestOptions.joinPrefix`               | 是否将 prefix 添加到url                             |      | `true`                                                       |
| `requestOptions.isReturnNativeResponse`   | 是否返回原生响应头 比如：需要获取响应头时使用该属性 |      | `false`                                                      |
| `requestOptions.isTransformResponse`      | 需要对返回数据进行处理                              |      | `true`                                                       |
| `requestOptions.joinParamsToUrl`          | post请求的时候添加参数到 url                        |      | `false`                                                      |
| `requestOptions.formatDate`               | 格式化提交参数时间                                  |      | `true`                                                       |
| `requestOptions.errorMessageMode`         | 消息提示组件                                        |      | `message`(可选参数：<br />`none 或 modal 或message`)         |
| `requestOptions.apiUrl`                   | 接口地址                                            |      | `''`                                                         |
| `requestOptions.urlPrefix`                | 接口拼接地址                                        |      | `''`                                                         |
| `requestOptions.joinTime`                 | 是否加入时间戳                                      |      | `true`                                                       |
| `requestOptions.ignoreCancelToken`        | 忽略重复请求                                        |      | `true`                                                       |
| `requestOptions.withToken`                | 是否携带token                                       |      | `true`                                                       |
| `requestOptions.retryRequest`             | 请求重试配置                                        |      |                                                              |
| `requestOptions.retryRequest.isOpenRetry` | 是否开启请求重试                                    |      | `true`                                                       |
| `requestOptions.retryRequest.count`       | 请求重试次数                                        |      | `5`                                                          |
| `requestOptions.retryRequest.waitTime`    | 请求重试等待时间                                    |      | `100`                                                        |
