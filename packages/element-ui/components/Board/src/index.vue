<!-- 看板组件 -->
<template>
  <div class="app-container">
    <div class="components-container board">
      <DragContentColumn
        ref="DragContentColumn"
        v-for="(item, index) in columnItems" 
        :key="index"
        :column-key="index"
        :group="group"
        :list="columnData[item.props]"
        class="DragContentColumn todo"
        :header-text="item.headerText"
        :headerWidth="item.headerWidth"
        :bgColor="item.bgColor"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-slot:DragContentItems="props">
          <slot name="DragContentMsgTop" :element="props.element"/>
        </template>
        <template v-slot:DragContentDialogMsg="props">
          <slot name="DragContentDialogMsg" :element="props.element"/>
        </template>
      </DragContentColumn>

      <!-- 看板视图新增弹框 -->
      <DragContentAdd v-bind="$attrs" v-on="$listeners">
        <template slot="DragContentAddItems">
          <slot name="DragContentDialogAdd"/>
        </template>
      </DragContentAdd>
    </div>
  </div>
</template>
<script>
import DragContentColumn from './DragContentColumn.vue'
import DragContentAdd from './DragContentAdd.vue'

export default {
  name: 'Board',
  components: {
    DragContentColumn,
    DragContentAdd
  },
  data() {
    return {
      group: 'mission',
    }
  },
  props: {
    // 状态列表配置
    columnItems: {
      type: Array,
      default: () => []
    },
    // 状态列表总体数据
    columnData: {
      type: Object,
      default: () => {}
    },
  },
  mounted() {
  },
  methods: {

  }

}
</script>
<style lang="scss">
.board {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.DragContentColumn {
  margin-right: 5px;
}
</style>

