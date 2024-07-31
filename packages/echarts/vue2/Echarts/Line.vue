<template>
  <div class="container">
    <Tips v-if="showTips && tips" class="tips" :tips="tips" />
    <Checkbox v-if="showCheckbox" class="checkbox" :initChecked="checked" @setShowLabel="setShowLabel" />
    <div :id="id" :class="className" :style="{ height: height, width: width }" />
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import common from './mixins/common'
import { lineOptions } from './options/line'
import Tips from './Tips.vue'
import Checkbox from './Checkbox.vue'
import { setShowLabel } from "@/components/Echarts/options/utils"

import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent
} from 'echarts/components'
export default {
  components: {
    Tips,
    Checkbox
  },
  mixins: [common],
  props: {
    id: {
      type: String,
      default: 'lineChart',
      require: true
    }
  },
  data() {
    return {
      checked: true
    }
  },
  methods: {
    setShowLabel(checked) {
      this.checked = checked
      setShowLabel(this.charOptions,this.checked)
      this.setOption()
    }
  },
  computed: {
    charOptions() {
      return lineOptions(this)
    }
  },
  beforeCreate() {
    echarts.use([
      TitleComponent,
      ToolboxComponent,
      TooltipComponent,
      GridComponent,
      LegendComponent,
      MarkPointComponent,
      MarkLineComponent,
      LineChart
    ])
  }
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
