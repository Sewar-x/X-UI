/**
 * 输入框提示语格式化函数
 * @param {*} data
 * @returns
 */
export function placeholderFormate(data) {
  const { type, label, tips } = data
  const typeTipMap = {
    input: '请输入',
    number: '请输入数字',
    textarea: '请输入',
    richtext: '请输入',
    'date-picker': '请选择',
    'date-picker-color': '请选择',
    daterange: '请选择',
    'time-picker': '请选择',
    select: '请选择',
    cascader: '请选择',
    'remote-search-selector': '请输入'
  }
  return tips || `${typeTipMap[type]}${label}`
}

// 事件统一处理函数
export function eventHandler(params, { name, events, item }) {
  if (events && events[name]) {
    events[name](params)
  } else {
    this.$emit(name, {
      params,
      item
    })
  }
}
