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