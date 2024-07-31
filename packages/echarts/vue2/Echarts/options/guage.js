
/**
 * 获取默认 Options 配置选项
 * @param {*} param0
 * @returns
 */
export function getDefaultOptions({
  width = 88,
  color = null,
  dataFormat = null,
  dataStas = [],
  charRate = 0,
  status = null,
  showToolbox = false
}) {
  return {
    toolbox: {
      show: showToolbox,
      orient: 'horizontal', // 工具栏icon的布局朝向
      itemSize: 16, // 工具栏icon的大小
      itemGap: 18, // item之间的间距
      right: 15, // toolbox的定位位置
      top: 0,
      iconStyle: {
        color: '#fff',
        borderColor: '#000'
      },

      feature: { // 控制工具栏
        saveAsImage: { show: true, title: '导出图片' }, // 导出图片
        dataView: { show: true, readOnly: false }
        // dataZoom: { show: true, title: { zoom: '区域缩放', back: '区域还原' }}, // 数据区域缩放
        // restore: { show: true, title: '重置' } // 重置
      }
    },
    title: [
      {
        text: status,
        bottom: '5',
        x: 'center',
        borderColor: color,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: [width / 20, width / 7.5],
        textStyle: {
          fontWeight: 'normal',
          fontSize: width / 10,
          color: color
        }
      }
    ],
    angleAxis: {
      show: false,
      max: (100 * 360) / 270, // -45度到225度，二者偏移值是270度除360度
      type: 'value',
      startAngle: 225, // 极坐标初始角度
      splitLine: {
        show: false
      }
    },
    barMaxWidth: 6, // 圆环宽度
    radiusAxis: {
      show: false,
      type: 'category'
    },
    // 圆环位置和大小
    polar: {
      center: ['50%', '50%'],
      radius: width * 0.8
    },
    series: [
      {
        type: 'bar',
        smooth: true,
        animationDelay: 500,
        animationDuration: 1500,
        data: [
          {
            // 上层圆环，显示数据
            value: charRate || (dataStas[0] / dataStas[1]) * 100,
            itemStyle: {
              color: color
            }
          }
        ],
        barGap: '-100%', // 柱间距离,上下两层圆环重合
        coordinateSystem: 'polar',
        roundCap: true, // 顶端圆角
        z: 2 // 圆环层级，同zindex
      },
      {
        // 下层圆环，显示最大值
        type: 'bar',
        smooth: true,
        animationDelay: 500,
        animationDuration: 1500,
        data: [
          {
            value: 100,
            itemStyle: {
              color: '#E0E3EA'
            }
          }
        ],
        barGap: '-100%',
        coordinateSystem: 'polar',
        roundCap: true,
        z: 1
      },
      // 仪表盘
      {
        name: status,
        smooth: true,
        animationDelay: 500,
        animationDuration: 1500,
        type: 'gauge',
        startAngle: 225, // 起始角度，同极坐标
        endAngle: -45, // 终止角度，同极坐标
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        title: {
          offsetCenter: [0, '-20%']
        },
        detail: {
          valueAnimation: true,
          color: color
        },
        data: dataFormat
          ? dataFormat(dataStas)
          : [
            {
              value: dataStas[0],
              detail: {
                offsetCenter: (() => {
                  const len = dataStas[0].toString().length - 1
                  const lenMap = [
                    -width / 10,
                    -width / 7.5,
                    -width / 6.6,
                    -width / 5.5,
                    -width / 5
                  ]
                  return [lenMap[len], 0]
                })(),
                fontWeight: 400,
                fontSize:
                    dataStas[0].toString().length - 1 < 3
                      ? width / 4
                      : width / 8
              }
            },
            {
              value: dataStas[1],
              detail: {
                offsetCenter: (() => {
                  const len = dataStas[0].toString().length - 1
                  const lenMap = [
                    width / 12,
                    width / 6,
                    width / 4.8,
                    width / 5.5,
                    width / 6
                  ]
                  return [lenMap[len], 8]
                })(),
                fontWeight: 350,
                fontSize:
                    dataStas[0].toString().length - 1 < 3
                      ? width / 7
                      : width / 8,
                formatter: function(value) {
                  return `/${value}`
                }
              }
            }
          ]
      }
    ]
  }
}
