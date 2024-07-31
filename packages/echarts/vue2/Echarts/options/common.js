import echart from '../theme/theme.scss'
import { sumArray } from '../utils'
/**
 * 柱状图平均值线配置
 * */
export function getMarkLine(options = {}, data = null) {
  return {
    symbol: options.showAverage ? 'circle' : 'none',
    data: [
      {
        type: 'average',
        label: { // 自定义显示标签
          normal: {
            show: !!options.showAverage,
            color: 'inherit',
            formatter: function(params) {
              if (!data || !data.series) return 0
              const series = data.series[params.seriesIndex]
              const dataSet = series && series.data
              if (!dataSet) return 0
              const average = sumArray(dataSet) / dataSet.length
              return average.toFixed(2)
            },
            type: 'solid'
          }
        },
        lineStyle: {
          normal: {
            width: options.showAverage ? 2 : 0,
            type: 'dashed'
          }
        }
      }
    ]
  }
}

/**
 * 提示工具配置
 */
export function getTooltip(options = {}) {
  return {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: function(params) {
      if (options.dataset) {
        let relVal = params[0].name
        for (let i = 0, l = params.length; i < l; i++) {
          relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value[params[i].seriesName] + `' (${options.unit || 'h'})'`
        }
        return relVal
      } else {
        let relVal = ''
        params.forEach(item => {
          if (item.value) {
            relVal += `${item.marker}${item.seriesName}: ${item.value} ${options.unit || '(h)'}` + '<br/>'
          } else {
            relVal += `${item.marker}${item.seriesName}: 暂无数据 <br/>`
          }
        })

        return relVal
      }
    },
    show: true
  }
}

/**
 * 工具栏配置
 */
export function getToolBox(options = {}) {
  return {
    show: options.showToolBox,
    orient: 'horizontal', // 工具栏icon的布局朝向
    itemSize: 16, // 工具栏icon的大小
    itemGap: 18, // item之间的间距
    right: 45, // toolbox的定位位置
    top: 0,
    iconStyle: {
      color: '#fff',
      borderColor: '#000'
    },
    emphasis: {
      iconStyle: {
        borderColor: echart.$fontColor || echart.fontColor// 注意: mac 中无法获取 $变量, mac中直接通过变量名获取
      }
    },
    feature: { // 控制工具栏
      saveAsImage: { show: true, title: '导出图片' } // 导出图片
      // dataView: { show: true, readOnly: false },
      // dataZoom: { show: true, title: { zoom: '区域缩放', back: '区域还原' }}, // 数据区域缩放
      // restore: { show: true, title: '重置' } // 重置
    }
  }
}
/**
 *X轴、Y轴的文字调节显示
 */
export const axisLabel = {
  interval: '0',
  rotate: '0',
  fontSize: 14,
  textStyle: {
    color: '#222222',
    margin: 10
  },
  formatter: function(params) {
    let ytext = params
    if (ytext.length > 14) {
      ytext = ytext.substring(0, 12) + '...'
    }
    return ytext
  }
}
/**
 * Y轴的调节显示
 */
export const yAxis = {
  splitLine: { // 去掉网格线
    lineStyle: {
      type: 'dashed',
      color: '#E8E8E8'
    }
  },
  axisLabel,
  axisLine: {
    show: false
  }
}
export const xAxisFormatter = function(params) {
  let newParamsName = ''// 最终拼接成的字符串
  const paramsNameNumber = params.length// 实际标签的个数
  const provideNumber = 6// 每行能显示的字的个数
  const rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
  /**
   * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
   */
  // 条件等同于rowNumber>1
  if (paramsNameNumber > provideNumber) {
    /** 循环每一行,p表示行 */
    for (let p = 0; p < rowNumber; p++) {
      let tempStr = ''// 表示每一次截取的字符串
      const start = p * provideNumber// 开始截取的位置
      const end = start + provideNumber// 结束截取的位置
      // 此处特殊处理最后一行的索引值
      if (p === rowNumber - 1) {
        // 最后一次不换行
        tempStr = params.substring(start, paramsNameNumber)
      } else {
        // 每一次拼接字符串并换行
        tempStr = params.substring(start, end) + '\n'
      }
      newParamsName += tempStr// 最终拼成的字符串
    }
  } else {
    // 将旧标签的值赋给新标签
    newParamsName = params
  }
  // 将最终的字符串返回
  return newParamsName
}

