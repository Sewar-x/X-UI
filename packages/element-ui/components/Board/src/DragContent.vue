<!-- 子元素信息 -->
<template>
  <div>
    <!-------------------------上面------------------------->
    <el-checkbox
      v-model="element.check"
      @change="$emit('changeCheck', element)"
      class="checkbox-class"
    ></el-checkbox>
    <div class="top-wrap">
      <div @click="$emit('toShowContent', element)" class="left-content-area">
        <slot name="DragContentMsg" />
      </div>
      <!---------------------- 右侧图片区域---------------------->
      <div class="image-area" v-if="element.attachment.length !== 0">
        <div v-for="(item, index) in element.attachment" :key="index" class="items-img">
          <el-image
            v-if="item.url && item.type !== 'file'"
            class="image"
            :src="item.url"
            :preview-src-list="element.srcList"
          />
        </div>
      </div>
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
  width: 3%;
}
.top-wrap {
  width: 97%;
  display: flex;
  margin-top: 10px;
}
.left-content-area {
  width: 100%;
}
.image-area {
  overflow: hidden;
  max-width: 90px;
  height: 80px;
}
.items-img {
  display: flex;
}
.image {
  height: 80px;
  width: 100px;
}
</style>
