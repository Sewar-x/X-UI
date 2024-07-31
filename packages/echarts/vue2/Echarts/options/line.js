import { recursionObject } from '../utils'
import echart from '../theme/theme.scss'
import {
  getMarkLine,
  getTooltip,
  getToolBox,
  yAxis,
  axisLabel
} from './common.js'

function getSeriesConfig({ seriesItem, options, params }) {
  return {
    type: 'line',
    areaStyle: {
      opacity: seriesItem?.areaStyle?.opacity || (params.areaStyleOpacity === 0 ? '0' : params.areaStyleOpacity) || 0.2
    },
    emphasis: {
      focus: 'series'
    },
    markLine: getMarkLine()
  }
}
/**
 * 获取默认配置参数
 * @param { Object } lineParams 实例配置参数：
 * {
 *      position: 'top', // 柱状图数字提示位置
 *      isCross: false, // 柱状图是否为横向,
 *      stackIndex: [1, 2], // 堆叠图形下标值
 *      dataset: false, //源数据是否为 dataset 格式
 *      showAverage: true // 是否显示平均线
 * }
 */
class defaultOpt {
  constructor(lineParams) {
    this.options = {
      toolbox: getToolBox(lineParams),
      tooltip: getTooltip(lineParams),
      title: {
        // 标题
        text: '',
        left: 'center',
        textStyle: {
          color: echart.$fontColor || echart.fontColor // 注意: mac 中无法获取 $变量, mac中直接通过变量名获取
        }
      },
      legend: {
        textStyle: {
          color: echart.$fontColor || echart.fontColor, // 注意: mac 中无法获取 $变量, mac中直接通过变量名获取
          fontSize: 16
        },
        show: true
      },

      grid: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
      },
      xAxis: {
        type: 'category',
        splitLine: {
          show: lineParams?.xAxis?.splitLine // 去掉网格线
        },
        data: [],
        axisLabel
      },
      yAxis: {
        type: 'value',
        ...yAxis
      },
      series: []
    }
  }
}

export function lineOptions(vue) {
  const { data } = vue._props
  /* eslint-disable */
  const getDefaultOpt = new defaultOpt(vue._props.params).options;
  const opt = recursionObject({}, getDefaultOpt, vue._props.options);
  //使用数据集处理
  if (vue._props.params.dataset && data.length > 1) {
    const dataset = {
      source: data,
      dimensions: Object.keys(data[0])
    };
    opt.dataset = dataset;
    opt.legend.data = Object.keys(data[0]);
  } else {
    //非数据集处理
    opt.xAxis.data = (data && data.xAxis) || [];
    if (data && data.series) {
      opt.series =
        data.series.map(item =>
          Object.assign(
            {},
            item,
            getSeriesConfig({
              series: item,
              options: opt,
              params: vue._props.params
            })
          )
        ) || [];
    }
  }
  return opt;
}
