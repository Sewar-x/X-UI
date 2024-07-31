/**
 * 所有 Echart 图表公共方法、属性
 */

import * as echarts from 'echarts/core'
// 引入echart 主题问题件
// import macarons from '../theme/macarons' //原来主题
// 调色后主题
import macarons from '../theme/trical'
import {
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  MarkLineComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { debounce } from '../utils'
import { setShowLabel } from "../options/utils"
export default {
  props: {
    // 所有 echart 共有属性

    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    data: {
      type: [Array, Object],
      default: function() {
        return null
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {}
    },
    // show tips icons
    showTips: {
      type: Boolean,
      default: true
    },

    // show checkbox
    showCheckbox: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      $_sidebarElm: null, // 侧边栏
      $_resizeHandler: null,
      chart: null, // echart 实例
      tips: null, // 图标计算公式提示
      checked: true
    }
  },
  watch: {
    data: {
      handler(value) {
        setShowLabel(value,this.checked)
        this.setOption()
        this.setTips(value && value.msg)
      },
      deep: true
    },
    loading(status) {
      if (!this.chart) return
      status
        ? this.chart.showLoading({
          text: '正在加载...',
          maskColor: 'rgba(0, 0, 0,0)',
          color: 'rgb(255,255,255)',
          textColor: '#fff'
        })
        : this.chart.hideLoading()
    }
  },
  beforeCreate() {
    echarts.use([
      // 注册所有图表公共组件
      TitleComponent,
      TooltipComponent,
      CanvasRenderer,
      DatasetComponent,
      LabelLayout,
      TransformComponent,
      UniversalTransition,
      LegendComponent,
      MarkLineComponent,
      GridComponent,
      DataZoomComponent,
      ToolboxComponent
    ])
  },
  mounted() {
    this.initListener() // 初始化尺寸监听器
    this.initCharts() // 初始化 echart
    this.bindEvent()

  },
  activated() {
    if (!this.$_resizeHandler) {
      // avoid duplication init
      this.initListener()
    }

    // when keep-alive chart activated, auto resize
    this.resize()
  },
  beforeDestroy() {
    this.destroyListener() // 销毁尺寸监听器
    this.destroyChartInst() // 销毁 echart
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    // 初始化echart 注册 和设置主题颜色：macarons

    initCharts() {
      // 颜色主题
      echarts.registerTheme('macarons', macarons)
      this.chart = echarts.init(document.getElementById(this.id), 'macarons')
      this.charOptions && this.chart && this.chart.setOption && this.chart.setOption(this.charOptions)
    },
    bindEvent() {
      if (!this.chart) return
      const that = this
      const events = [
        'click',
        'dblclick',
        'mousedown',
        'mousemove',
        'mouseup',
        'mouseover',
        'mouseout',
        'globalout',
        'contextmenu',
        'legendselectchanged'
      ]
      events.forEach(eventName => {
        this.chart.on(eventName, function(params) {
          that.$emit(`chart-${eventName}`, params)
        })
      })
    },
    // 设置提示文案
    setTips(tips = null) {
      this.tips = tips
    },
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    // 初始化尺寸监听器
    initListener() {
      const that = this
      this.$_resizeHandler = debounce(() => {
        that.resize()
      }, 100)
      window.addEventListener('resize', this.$_resizeHandler)

      this.$_sidebarElm = document.getElementsByClassName(
        'sidebar-container'
      )[0]
      this.$_sidebarElm &&
        this.$_sidebarElm.addEventListener(
          'transitionend',
          this.$_sidebarResizeHandler
        )
    },
    // 销毁尺寸监听器
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null

      this.$_sidebarElm &&
        this.$_sidebarElm.removeEventListener(
          'transitionend',
          this.$_sidebarResizeHandler
        )
    },
    destroyChartInst() {
      if (!this.chart) {
        return
      }
      this.chart.clear()
      this.chart.dispose()
      this.chart = null
    },
    resize() {
      const { chart } = this
      chart && chart.resize()
    },
    setOption() {
      if (!this.chart) return
      this.chart.clear()
      this.charOptions && this.chart.setOption(this.charOptions)
    }
  }
}
