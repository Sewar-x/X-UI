interface Mergeable {
  [key: string]: any;
}

/**
 * 递归合并两个对象，假如对象内的值是数组，则使用后面的值覆盖前面的值，如果对象内的数据的对象，则递归合并数据
 * @param obj1 合并对象（相同值被 obj2 覆盖）
 * @param obj2 
 * @returns 
 */
export function deepMerge(obj1: Mergeable, obj2: Mergeable): Mergeable {
  // 确保输入是对象
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    throw new Error('Both arguments should be objects');
  }

  // 创建一个新对象，用于存储合并后的结果
  const result = Object.assign({}, obj1);

  // 遍历 obj2 的属性
  for (const key in obj2) {
    // 如果 obj2 的属性在 obj1 中也存在
    if (obj1.hasOwnProperty(key)) {
      // 如果属性值都是对象，并且不是数组，则递归合并
      if (typeof obj1[key] === 'object' && obj2[key] !== null && !Array.isArray(obj1[key]) && !Array.isArray(obj2[key])) {
        result[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        // 否则，使用 obj2 的值覆盖 obj1 的值（处理数组情况）
        result[key] = obj2[key];
      }
    } else {
      // 如果 obj1 中不存在 obj2 的属性，则直接复制
      result[key] = obj2[key];
    }
  }

  return result;
}

/**
 * 深拷贝
 * @param obj 
 * @param hash 
 * @returns 
 */
export function deepClone(obj: any, hash: WeakMap<any, any> = new WeakMap()) {
  // 处理基本数据类型和null  
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }

  // 处理Date和RegExp对象  
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 如果存在循环引用，则从hash中取出  
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 初始化克隆对象或数组  
  let cloneTarget: Object | Array<any> = Array.isArray(obj) ? [] : {};

  // 存储当前对象，以便处理可能的循环引用  
  hash.set(obj, cloneTarget);

  // 遍历对象的所有属性  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone(obj[key], hash);
    }
  }

  return cloneTarget;
}  