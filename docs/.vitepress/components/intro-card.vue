<template>
  <el-row class="intro-card-container">
    <el-col :span="12" v-for="item in lists" :key="item">
      <el-card class="card-container" shadow="hover" @click="viewComponent(item.link)">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
            <el-tag v-if="item.tag" :type="item.tagType || 'primary'">
              {{ item.tag }}
            </el-tag>
          </div>
        </template>
        <div class="card-footer">
          <el-button
            :type="item.link ? 'primary' : 'info'"
            round
            :disabled="!item.link"
            @click="viewComponent(item.link)"
            >查看</el-button
          >
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
const props = defineProps({
  lists: {
    // 组件库名称
    type: Array,
    default: null,
  },
});

const viewComponent = (link) => {
  if (!link) {
    return false;
  }
  window && window.open(link);
};
</script>
<script>
export default {
  name: "IntroCard",
};
</script>

<style scoped lang="less">
.intro-card-container {
  display: flex;
  justify-content: flex-start;
  .card-container {
    margin: 5px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
