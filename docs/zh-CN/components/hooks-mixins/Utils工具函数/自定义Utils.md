# 自定义 Utils

## 介绍
 自定义工具函数位于 `packages/shared` 文件中, 你可以在这里添加自己的工具函数.

## 使用

```js
// 引入使用工具
import { deepMerge } from 'sewen-ui/shared'
```

## 自定义函数列表

| 函数名                  | 作用                                                         | 参数                                                         | 返回值           |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| `deepMerge`             | 深度遍历合并两个对象，当存在相同key值时，第二个参数对象的值覆盖第一个参数对象的值 | `data1, data2 `                                              | 合并后的对象     |
| `transformJsonKeys`     | 将 JSON 对象的 key 转成指定的 key,通常用于转换后端返回的数据字段 | `map: object, obj: object, direction: 'keyToValue' | 'valueToKey' = 'keyToValue'` | 返回转换后的值   |
| `reverseJsonKeysValues` | 反转 JSON 的key值和 value 值                                 | `jsonObj: object`                                            | 返回反转后的对象 |

### transformJsonKeys

当后端返回的接口数据字段与前端字段不对应时，可以使用该方法进行数据字段转换。

用法示例

```javascript
// 引入使用工具
import { transformJsonKeys } from 'sewen-ui/shared'
// 需要转换的 Key
const keyMap = {
  id: "u_id",
  name: "u_name",
  phone: "u_phone",
  age: "u_age",
  info: "u_info",
};
// 被转换的数据，通常是后端返回的接口数据
const data = {
  id: 1,
  name: 'sewen',
  info: {
    phone: '1234567',
    age: 18
  }
};
// 从 key 到 value 转换数据
const transformedData = transformJsonKeys(keyMap, data);
console.log(transformedData); 
// 输出 key 到 value 转换后的对象
/**
{
    "u_id": 1,
    "u_name": "sewen",
    "u_info": {
        "u_phone": "1234567",
        "u_age": 18
    }
}
*/

// 反转 value 到 key, 通常前端将表单再次反转回后端需要的字段
const retransformedData = transformJsonKeys(keyMap, transformedData, 'valueToKey');
console.log(retransformedData); // 输出 key 到 value 转换后的对象  

/**
{
    "id": 1,
    "name": "sewen",
    "info": {
        "phone": "1234567",
        "age": 18
    }
}
*/
```

