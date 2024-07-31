<template>
  <div class="container">
    <Tips v-if="showTips && tips" class="tips" :tips="tips" />
    <Checkbox v-if="showCheckbox" class="checkbox" :initChecked="checked" @setShowLabel="setShowLabel" />
    <div :id="id" :style="{ height: height, width: width }" />
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { barOptions } from './options/bar.js'
import Tips from './Tips.vue'
import Checkbox from './Checkbox.vue'
import { setShowLabel } from "@/components/Echarts/options/utils"

import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import common from './mixins/common'

export default {
  name: 'Bar',
  components: {
    Tips,
    Checkbox
  },
  mixins: [common],
  props: {
    id: {
      type: String,
      default: 'BarChart',
      require: true
    }
  },
  data() {
    return {
      checked: true
    }
  },
  computed: {
    charOptions() {
      return barOptions(this)
    }
  },
  methods: {
    setShowLabel(checked) {
      this.checked = checked
      setShowLabel(this.charOptions, this.checked)
      this.setOption()
    }
  },
  created() {
    // 注册必须的组件
    echarts.use([
      BarChart,
      ToolboxComponent,
      TooltipComponent,
      GridComponent,
      LegendComponent,
      MarkLineComponent,
      MarkPointComponent,
      LineChart
    ])
  },

}
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .tips {
    z-index: 1000000000;
    position: absolute;
    right: 9px;
    top: 0;
  }

  .checkbox {
    z-index: 1000000000;
    position: absolute;
    right: -5px;
    top: 0;
  }
}
</style>
