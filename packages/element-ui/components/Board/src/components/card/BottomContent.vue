<template>
  <div class="bottom-content-wrap">
    <!-- 左侧列表 -->
    <div v-for="(item, index) in statisticItems" :key="index">
      <span class="content-items">
        <i :class="item.icon">
          <span class="items-text">{{ messages[item.props] }} </span>
        </i>
      </span>
    </div>
    <!-- 右下角按钮 -->
    <div>
      <el-dropdown>
        <i class="el-icon-more"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(but, index) in statisticButtons" :key="index">
            <i :class="but.icon" @click="handleButClick(but.event, messages)">
              <span class="items-text">{{ but.title }}</span>
            </i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomContent",
  components: {},
  props: {
    // 统计项配置
    statisticItems: {
      type: Array,
      default: () => [],
    },
    // 左侧信息列表
    messages: {
      type: Object,
      default: () => {},
    },
    // 按钮对象
    statisticButtons: {
      type: Array,
      default: () => [{ icon: "", title: "", event: "" }],
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    // 点击调用的方法
    handleButClick(event, element) {
      this.$emit(event, element);
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-content-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 5px 5px 5px;
}
.content-items {
  margin-right: 20px;
  color: #878787;
}
.items-text {
  margin-left: 5px;
}
</style>
