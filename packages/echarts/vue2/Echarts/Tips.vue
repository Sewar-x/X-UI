<template>
  <div class="container">
    <el-popover
      v-bind="$attrs"
      placement="top-start"
      trigger="hover"
      :title="$attrs.title || '计算公式'"
      v-on="$listeners"
    >
      <i slot="reference" class="el-icon-s-opportunity" />
      <div class="content-container">
        <el-divider class="divider" />
        <div class="content">{{ tips }}</div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  props: {
    tips: {
      type: String,
      default: null
    }
  },
  computed: {},
  created() {}
}
</script>

<style lang="scss" scoped>
.container {
  .el-icon-s-opportunity {
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: $warning;
    }
  }
}

.content-container {
  padding: 0 10px 10px 10px;
  .divider {
    margin: 5px 0;
  }
  .content {
    white-space: pre-wrap;
    text-overflow: ellipsis;
  }
}
</style>
