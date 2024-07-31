<template>
  <div class="guage-container" :style="{ height: height+'px', width: width+'px' }">
    <div v-if="title" class="title">{{ title }}</div>
    <div :id="id" :style="{ height: height+'px', width: width+'px' }" />
    <slot name="content" />
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  TitleComponent,
  PolarComponent
} from 'echarts/components'
import { GaugeChart, BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { getDefaultOptions } from './options/guage.js'
import common from './mixins/common'
export default {
  name: 'Guage',
  mixins: [common],
  props: {
    id: {
      type: String,
      default: 'GuageChart',
      require: true
    },
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 88
    },
    height: {
      type: Number,
      default: 88
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: function() {
        return null
      }
    },
    color: {
      type: String,
      default: '#409EFF'
    },
    status: {
      type: String,
      default: '良好'
    },
    rate: {
      type: Number,
      default: null
    },
    dataFormat: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      resizeHandler: null,
      dataStas: [0, 0]
    }
  },
  computed: {
    charRate() {
      return this.rate
    },
    defaultOptions() {
      return this.options || getDefaultOptions({
        width: this.width,
        color: this.color,
        dataFormat: this.dataFormat,
        dataStas: this.dataStas,
        charRate: this.charRate,
        status: this.status,
        showToolbox: this.params?.showToolbox // 通过 mixin 进入的变量
      })
    }
  },
  watch: {
    data(newValue) {
      if (!newValue) return
      this.dataStas = newValue
      this.setOption()
    },
    loading(status) {
      if (!this.chart) return
      status ? this.chart.showLoading() : this.chart.hideLoading()
    }
  },
  beforeCreate() {
    echarts.use([
      TooltipComponent,
      TitleComponent,
      PolarComponent,
      GaugeChart,
      BarChart,
      CanvasRenderer
    ])
  },
  mounted() {
    this.chart = echarts.init(document.getElementById(this.id))
    this.setOption()
  },

  methods: {
    setOption() {
      if (!this.chart) return
      this.chart.clear()
      this.defaultOptions && this.chart.setOption(this.defaultOptions)
    }
  }
}
</script>
<style lang="scss" scoped>
.guage-container {
  margin: 0 auto;
  position: relative;
  .title {
    font-size: 12px;
    text-align: center;
    color: #909399;
    margin: 5px 0;
  }
  &::v-deep canvas{
    cursor: pointer;
  }
}
</style>
