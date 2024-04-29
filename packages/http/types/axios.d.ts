export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export type SuccessMessageMode = ErrorMessageMode;

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Success message prompt type
  successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}
export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

export declare type Recordable<T = any> = Record<string, T>;

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface transformOptType {
  Modal?: Fcuntion,
  Message?: Fcuntion,
  token?: string,
  tokenKey?: string,
  tokenExpires?: number,
  storageType?: 'localStorage' | 'sessionStorage' | 'cookie',
  getToken?: Function,
  setToken?: Function,
  clearToken?: Function,
  logout?: Function,
  addAjaxErrorInfo?: Function,
  statusMap?: Record<number, any>
}

export interface checkStatusOptType {
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode,
  statusMap: Record<number, any>,
  Modal: Fcuntion,
  Message: Fcuntion,
  clearToken: Fcuntion,
  logout: Fcuntion,
}


export interface tokenOptType {
  type: 'localStorage' | 'sessionStorage' | 'cookie',
  expires?: number | undefined
}