/**
 * 该方法用于转换 JSON 的 key 值：
 * 输入示例：
 * 1. 输入转换的key:
 *    {
 *      id: "u_id",
 *      name: "u_name",
 *      phone: "u_phone",
 *      age: "u_age",
 *      info: "u_info",
 *    }
 * 2. 输入转换的数据：
 *    {
 *      id: 1,
 *      name: "sewen",
 *      info:{
 *           phone: "1234567",
 *           age: 18,
 *        }
 *     }
 * 输出示例：
 *    {
 *      u_id: 1,
 *      u_name: "sewen",
 *      u_info:{
 *           u_phone: "1234567",
 *           u_age: 18,
 *        }
 *     }
 */



export function transformJsonKeys(map: object, obj: object, direction: 'keyToValue' | 'valueToKey' = 'keyToValue') {
  const directionMap = {
    keyToValue: map,
    valueToKey: reverseJsonKeysValues(map)
  }
  const getMap = directionMap[direction]
  return transformKeys(getMap, obj, direction);
}


export function transformKeys(map: object, obj: object, direction: 'keyToValue' | 'valueToKey' = 'keyToValue') {

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      let newKeyOrValue;
      newKeyOrValue = map[key] || key;
      newObj[newKeyOrValue] = transformKeys(map, value, direction);
    }
  }

  return newObj;
}


/**
 * 反转 JSON 的 key 和 value
 * @param jsonObj 
 * @returns 
 */
export function reverseJsonKeysValues(jsonObj: object) {
  if (typeof jsonObj !== 'object' || jsonObj === null) {
    return jsonObj;
  }

  const reversedObj = {};
  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key) && typeof jsonObj[key] === 'string') {
      reversedObj[jsonObj[key]] = key;
    } else {
      console.warn(`Value for key "${key}" is not a string, skipping.`);
    }
  }

  return reversedObj;
}

/** 
// 示例使用 - key 到 value 转换  
const keyMap = {
  id: "u_id",
  name: "u_name",
  phone: "u_phone",
  age: "u_age",
  info: "u_info",
};

const data = {
  id: 1,
  name: 'sewen',
  info: {
    phone: '1234567',
    age: 18
  }
};

const transformedData = transformJsonKeys(keyMap, data);
console.log(transformedData); // 输出 key 到 value 转换后的对象  
const retransformedData = transformJsonKeys(keyMap, transformedData, 'valueToKey');
console.log(retransformedData); // 输出 key 到 value 转换后的对象  
*/