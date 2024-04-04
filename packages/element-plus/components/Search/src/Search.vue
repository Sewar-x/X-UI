<template>
  <el-card v-if="options">
    <XForm
      class="search-form-container"
      :options="options"
      @changeAfter="formChangeHandler"
    />
    <div class="search-item-container">
      <el-input placeholder="请输入关键字" v-model="keyword" clearable @change="search">
        <template #append>
          <el-button type="primary" icon="search" @click="search" />
        </template>
      </el-input>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { XForm } from "../../Form";
import type { FormType } from "../../Form/type";
const emit = defineEmits(["search"]);
const props = defineProps<{
  // 表单数据
  options: FormType;
}>();
const keyword = ref("");
/**
 * 模糊搜索
 * @param params
 */
const search = function (params: any) {
  formChangeHandler({
    prop: "keyword",
    value: params,
  });
};

/**
 * form 数据统一修改事件
 */
const formChangeHandler = function (params: any) {
  const formData = props.options?.mode.value;
  formData[params.prop] = params.value;
  emit("search", formData);
};
</script>

<style scoped lang="less">
.search-form-container {
  :deep(.el-form-item__label) {
    justify-content: center;
  }
}
.search-item-container {
  display: flex;
  justify-content: flex-start;
}
</style>
