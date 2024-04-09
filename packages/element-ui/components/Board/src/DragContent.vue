<!-- 子元素信息 -->
<template>
  <div>
    <!-------------------------上面------------------------->
    <el-checkbox
      v-model="element.check"
      @change="$emit('changeCheck', element)"
      class="checkbox-class"
    ></el-checkbox>
    <div @click="$emit('toShowContent', element)">
      <slot name="DragContentMsg" />
    </div>
    <!-------------------------下面------------------------->
    <BottomContent :messages="element" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import TopContent from "./components/card/TopContent.vue";
import BottomContent from "./components/card/BottomContent.vue";

export default {
  name: "DragContent",
  components: {
    BottomContent,
    TopContent,
  },
  props: {
    // 元素信息
    element: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    // 更改元素的勾选状态
    changeCheck(element) {
      this.$emit("changeCheck", element);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox-class {
  display: flex;
  float: inline-start;
  margin-top: 5px;
}
</style>
